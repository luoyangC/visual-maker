import { api } from '.'

export interface Example {
  id: number
  type: number
  icon: string
  option: any
}

export const getChartExampleList = () => {
  return api.get<Array<Example>>('exampleList.json').then((res) => {
    return res.data.filter((item) => item.type === 2)
  })
}

export const getExampleInfo = (id: string) => {
  return api.get<Array<Example>>('exampleList.json').then((res) => {
    return res.data.find((item) => item.id === Number(id))
  })
}
