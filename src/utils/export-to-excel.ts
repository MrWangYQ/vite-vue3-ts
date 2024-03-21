/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as XLSX from 'xlsx'

export const jsonToExcel = (options: {
  data: any[]
  header: Record<string, string>
  fileName: string
  bookType: XLSX.BookType
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
}) => {
  // 1、创建一个工作簿 workbook
  const wb = XLSX.utils.book_new()
  // 2、创建工作表 worksheet
  if (options.header) {
    options.data = options.data.map(item => {
      const obj: Record<string, any> = {}
      for (const key in item) {
        // 如果 没有表头的设置，就用默认的 key
        if (options.header[key]) {
          obj[options.header[key]] = item[key]
        } else {
          obj[key] = item[key]
        }
      }
      return obj
    })
  }

  const ws = XLSX.utils.json_to_sheet(options.data)
  // 3、把工作表放到工作簿中
  XLSX.utils.book_append_sheet(wb, ws)
  // 4、生成数据保存
  XLSX.writeFile(wb, `${options.fileName}.${options.bookType}`, {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    bookType: options.bookType || 'xlsx'
  })
}
