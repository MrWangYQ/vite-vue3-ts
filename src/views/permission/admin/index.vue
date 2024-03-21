<template>
  <el-container direction="vertical">
    <app-card>
      <template #header>
        <div class="card-header">
          <span>数据筛选</span>
        </div>
      </template>
      <el-form
        :model="listParams"
        inline
        :disabled="tableLoading"
        @submit.prevent="handleQuery">
        <el-form-item label="状态">
          <el-select
            v-model="listParams.status"
            placeholder="请选择状态"
            clearable
            style="width: 200px">
            <el-option label="全部" value=""></el-option>
            <el-option label="显示" :value="1"></el-option>
            <el-option label="不显示" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员名称">
          <el-input v-model="listParams.status" placeholder="请输入身份昵称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit">查询</el-button>
        </el-form-item>
      </el-form>
    </app-card>
    <app-card>
      <template #header>
        <div class="card-header">
          <el-button type="primary" @click="handleUpdate(null)">添加管理员</el-button>
        </div>
      </template>
      <el-table
        ref="tableRef"
        row-key="date"
        v-loading="tableLoading"
        :data="list"
        :load="loadList" style="width: 100%;">
        <el-table-column label="count" prop="ID"  width="180"></el-table-column>
        <el-table-column label="姓名" prop="name" width="180"></el-table-column>
        <el-table-column label="账号" prop="name" width="180"></el-table-column>
        <el-table-column label="身份" prop="name" width="180">
          <template #default="scope">
            <el-space wrap>
              <el-tag
                v-for="item in scope.row.roles.split(',')"
                :key="item">
                {{ item }}
              </el-tag>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column label="最后一次登录的时间" prop="name" width="180"></el-table-column>
        <el-table-column label="最后一次登录的IP" prop="name" width="180"></el-table-column>
        <el-table-column label="状态" prop="status" width="180">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              class="ml-2"
              @change="handleStatusChange(scope.row)"
              :loading="scope.row.statusLoading"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="name" width="180">
          <template #default="scope">
            <el-popconfirm
              @confirm="handleDelConfirm(scope.row.id)"
              @cancel="handleDelCancel()"
              title="确认删除吗?">
              <template #reference>
                <el-button key="plain" value="" link>删除</el-button>
              </template>
            </el-popconfirm>
            <el-button @click="handleUpdate(scope.row.id)" key="plain" value="" link>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <AppPagination
        v-model:page="listParams.page"
        v-model:limit="listParams.limit"
        :list-count="1000"
        :load-list="loadList"
        :disabled="tableLoading"
      />
      <!-- <el-pagination
        v-model:current-page="listParams.page"
        v-model:page-size="listParams.limit"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :pageSizes="[10, 20, 30, 50, 100]"
        :total="10000"
        :hide-on-single-page="true"
        background
        layout="total,sizes,prev,pager,next,jumper"
        style="padding: 20px 0;"/> -->
    </app-card>
  </el-container>
  <admin-form
    v-model="formVisible"
    v-model:adminId="adminId"
    @success="handleFormSuccess"/>
</template>

<script setup lang="ts">
import { getAdmin, updateAdminStatus } from '@/api/admin'
import type { Admin, IListParams } from '@/api/types/admin'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, type TableInstance } from 'element-plus'
import AdminForm from './AdminForm.vue'

defineOptions({
  name: 'adminList'
})

const tableLoading = ref(true)
const formVisible = ref(false)
const adminId = ref<number | null>(null)
const tableRef = ref<TableInstance>()
const list = ref<Admin[]>([])// 列表数据
const listParams = reactive({ // 列表数据查询参数
  page: 1,
  limit: 10,
  name: '',
  roles: '',
  status: '' as IListParams['status']
})

onMounted(() => {
  loadList().catch(() => {})
})

const loadList = async (): Promise<void> => {
  const data = await getAdmin(listParams).finally(() => {
    tableLoading.value = false
  })
  list.value = data.list
}

const handleQuery = async (): Promise<void> => {
  console.log('handleQuery')
  loadList().catch(() => {})
}

const handleDelConfirm = (id: number): void => {
  console.log('handleDelConfirm', id)
  // 调用接口
  ElMessage.success('删除成功!')
  loadList().catch(() => {})
}

const handleDelCancel = (): void => {
  console.log('handleDelCancel')
  ElMessage.success('取消成功!')
}

const handleStatusChange = async (item: Admin): Promise <void> => {
  item.statusLoading = true
  await updateAdminStatus(item.id, item.status).finally(() => {
    item.statusLoading = false
  })
  ElMessage.success(`${item.status === 1 ? '启用' : '禁用'}成功`)
  console.log('xxx')
}

const handleUpdate = (id: number | null): void => {
  adminId.value = id
  formVisible.value = true
}

const handleFormSuccess = (): void => {
  tableLoading.value = false
  loadList().catch(() => {})
}

</script>

<style lang="scss" scoped>
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
