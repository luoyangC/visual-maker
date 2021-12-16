import { charts } from '@/models/chart'
import type { Chart } from '@/models/chart'

type ChartKeys = keyof typeof charts

type InstantiableClass<T extends Chart> = {
  new (): T
}

type ChartModel = InstantiableClass<Chart>

class ChartHook {
  modelMap: Map<string, InstanceType<ChartModel>>
  dragTypeList: Array<{ type: string; icon?: string; label?: string }>

  constructor() {
    this.modelMap = new Map()
    this.dragTypeList = []
  }

  getChart(name: string) {
    return this.modelMap.get(name) as InstanceType<ChartModel>
  }

  getChartConfig(name: string) {
    return this.getChart(name).getConfig()
  }

  getChartTemplate(name: string, config: any) {
    return this.getChart(name).getTemplate(config)
  }

  getChartPreview(name: string, config: any) {
    return this.getChart(name).getPreview(config)
  }

  newChart(Model: ChartModel) {
    const el = new Model()

    this.modelMap.set(el.name, el)
    if (el.isDrag) {
      this.dragTypeList.push({
        type: el.name,
        icon: el.icon,
        label: el.label
      })
    }
    return el
  }

  getDragTypeList() {
    return this.dragTypeList
  }
}

export const chartHook = new ChartHook()

Object.keys(charts).forEach((key) => {
  chartHook.newChart(charts[key as ChartKeys])
})
