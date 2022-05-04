import { dynamics } from '@/models/dynamic'
import type { Dynamic } from '@/models/dynamic'

type DynamicKeys = keyof typeof dynamics
type DynamicModel = typeof Dynamic

class DynamicHook {
  modelMap: Map<string, InstanceType<DynamicModel>>

  constructor() {
    this.modelMap = new Map()
  }

  getDynamic(name: string) {
    return this.modelMap.get(name) as InstanceType<DynamicModel>
  }

  newDynamic(Model: DynamicModel) {
    const el = new Model()
    this.modelMap.set(el.name, el)
  }
}

export const dynamicHook = new DynamicHook()

Object.keys(dynamics).forEach((key) => {
  dynamicHook.newDynamic(dynamics[key as DynamicKeys])
})
