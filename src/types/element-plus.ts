import type { ElForm, ElDialog, ElInput, FormItemRule } from 'element-plus'

export type IElForm = InstanceType<typeof ElForm>
export type IElDialog = InstanceType<typeof ElDialog>
export type IElInput = InstanceType<typeof ElInput>

export type IFormRule = Record<string, FormItemRule[]>
