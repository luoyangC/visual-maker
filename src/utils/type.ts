export function getTag(val: unknown) {
  if (val === null) {
    return val === undefined ? '[object Undefined]' : '[object Null]'
  }
  return Object.prototype.toString.call(val)
}

export function isNull(val: unknown) {
  return val === null
}

export function isUndefined(val: unknown) {
  // eslint-disable-next-line no-void
  return val === void 0
}

export function isDef(val: unknown) {
  return !isUndefined(val)
}

export function isArray(val: unknown) {
  return Array.isArray(val)
}

export function isFunction(val: unknown) {
  return typeof val === 'function'
}

export function isObjectLike(val: unknown) {
  return val !== null && typeof val === 'object'
}

export function isObject(val: unknown) {
  return val !== null && (typeof val === 'object' || typeof val === 'function')
}

export function isString(val: unknown) {
  return typeof val === 'string' || (isObjectLike(val) && getTag(val) === '[object String]')
}

export function isNumber(val: unknown) {
  return typeof val === 'number' || (isObjectLike(val) && getTag(val) === '[object Number]')
}

export function isBoolean(val: unknown) {
  return typeof val === 'boolean' || (isObjectLike(val) && getTag(val) === '[object Boolean]')
}

export function isSymbol(val: unknown) {
  return typeof val === 'symbol' || (isObjectLike(val) && getTag(val) === '[object Symbol]')
}

export function isBigInt(val: unknown) {
  return typeof val === 'bigint' || (isObjectLike(val) && getTag(val) === '[object BigInt]')
}

export function isDate(val: unknown) {
  return isObjectLike(val) && getTag(val) === '[object Date]'
}

export function isMap(val: unknown) {
  return isObjectLike(val) && getTag(val) === '[object Map]'
}

export function isSet(val: unknown) {
  return isObjectLike(val) && getTag(val) === '[object Set]'
}

export function isRegExp(val: unknown) {
  return isObjectLike(val) && getTag(val) === '[object RegExp]'
}

export function isArguments(val: unknown) {
  return isObjectLike(val) && getTag(val) === '[object Arguments]'
}

export function toTwoDecimals(val: number) {
  return Math.floor((val as number) * 100 + 0.01) / 100
}

export function toPxNum(val: unknown, parent?: unknown): number {
  let res = 0
  const strVal = String(val)

  if (!isNaN(Number(strVal))) {
    res = Number(strVal)
  }
  if (strVal.endsWith('px')) {
    const tempVal = strVal.replace('px', '')
    if (!isNaN(Number(tempVal))) {
      res = Number(tempVal)
    }
  }
  if (strVal.endsWith('%')) {
    const tempVal = strVal.replace('%', '')
    const parentVal = toPxNum(parent)
    if (!isNaN(Number(tempVal)) && !isNaN(Number(parentVal))) {
      res = (Number(parentVal) * Number(tempVal)) / 100
    }
  }

  return toTwoDecimals(res)
}
