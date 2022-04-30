import { api } from '.'

export const getDataModel = (dataApi: string, dataModel: string) => {
  return api.get(dataApi).then((res: any) => {
    return { [dataModel]: res[dataModel] }
  })
}
