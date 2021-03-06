import { getTag, isObject } from './type'

const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const argsTag = '[object Arguments]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'
const funcTag = '[object Function]'

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag]

function forEach(array: any, iteratee: any) {
  let index = -1
  const length = array.length
  while (++index < length) {
    iteratee(array[index], index)
  }
  return array
}

function getInit(target: any) {
  const Ctor = target.constructor
  return new Ctor()
}

function cloneSymbol(targe: any) {
  return Object(Symbol.prototype.valueOf.call(targe))
}

function cloneReg(targe: any) {
  const reFlags = /\w*$/
  const result = new targe.constructor(targe.source, reFlags.exec(targe))
  result.lastIndex = targe.lastIndex
  return result
}

function cloneFunction(func: any) {
  return func
}

function cloneOtherType(targe: any, type: string) {
  const Ctor = targe.constructor
  switch (type) {
    case boolTag:
    case dateTag:
    case errorTag:
    case numberTag:
    case stringTag:
      return new Ctor(targe)
    case regexpTag:
      return cloneReg(targe)
    case symbolTag:
      return cloneSymbol(targe)
    case funcTag:
      return cloneFunction(targe)
    default:
      return null
  }
}

export function clone(target: any, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target
  }

  // 初始化
  const type = getTag(target)
  let cloneTarget: any
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target)
  } else {
    return cloneOtherType(target, type)
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)

  // 克隆set
  if (type === setTag) {
    target.forEach((value: any) => {
      cloneTarget.add(clone(value, map))
    })
    return cloneTarget
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value: any, key: any) => {
      cloneTarget.set(key, clone(value, map))
    })
    return cloneTarget
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target)
  forEach(keys || target, (value: any, key: any) => {
    if (keys) {
      key = value
    }
    cloneTarget[key] = clone(target[key], map)
  })

  return cloneTarget
}
