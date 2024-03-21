import { type FormItemRule } from 'element-plus'

export interface ISelectoptions {
  label: string
  value: number
}
export interface IFormRule {
  title: string
  field: string
  props?: Record<string, any>
  type: string
  validate?: FormItemRule[]
  value: string
  options?: ISelectoptions[]
}
export interface IFormData {
  action: string
  info: string
  method: string
  status: boolean
  title: string
  rules: IFormRule[]
}
