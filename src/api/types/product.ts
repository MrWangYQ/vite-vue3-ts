export interface ProductAttrTpl {
  attr_name: string
  attr_value: string
  id: number
  rule_name: string
  rule_value: AttrRuleValue[]
}

export interface AttrRuleValue {
  detail: string[]
  value: string
}
export interface AttrTableHeader {
  align: string
  key: string
  minWidth: number
  title: string
  slot: string
}

export interface IExpressTemplate {
  id: number
  name: string
}

export type ProductAttr = Record<string, any> & {
  'bar_code': string
  'brokerage': number
  'brokerage_two': number
  'cost': number
  'ot_price': number
  'pic': string
  'price': number
  'stock': number
  'vip_price': number
  'volume': number
  'weight': number
}
// id  attr_name  rule_name  attr_value  rule_alue
