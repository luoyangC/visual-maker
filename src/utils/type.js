export function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return Object.prototype.toString.call(value);
}

export function isObjectLike(value) {
  return value !== null && typeof value === 'object';
}

export function isString(value) {
  return typeof value === 'string' || (isObjectLike(value) && getTag(value) === '[object String]');
}

export function isNumber(value) {
  return typeof value === 'number' || (isObjectLike(value) && getTag(value) === '[object Number]');
}

export function isBoolean(value) {
  return (
    typeof value === 'boolean' || (isObjectLike(value) && getTag(value) === '[object Boolean]')
  );
}

export function isNull(value) {
  return value === null;
}

export function isUndefined(value) {
  return value === void 0;
}

export function isSymbol(value) {
  return typeof value === 'symbol' || (isObjectLike(value) && getTag(value) === '[object Symbol]');
}

export function isBigInt(value) {
  return typeof value === 'bigint' || (isObjectLike(value) && getTag(value) === '[object BigInt]');
}

export function isObject(value) {
  return value !== null && (typeof value === 'object' || typeof value === 'function');
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isArguments(value) {
  return isObjectLike(value) && getTag(value) === '[object Arguments]';
}

export function isDate(value) {
  return isObjectLike(value) && getTag(value) === '[object Date]';
}

export function isMap(value) {
  return isObjectLike(value) && getTag(value) === '[object Map]';
}

export function isSet(value) {
  return isObjectLike(value) && getTag(value) === '[object Set]';
}

export function isRegExp(value) {
  return isObjectLike(value) && getTag(value) === '[object RegExp]';
}

export function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) !== '[object Object]') {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}

export function isElement(value) {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

export function isError(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  const tag = getTag(value);
  return (
    tag === '[object Error]' ||
    tag === '[object DOMException]' ||
    (typeof value.message === 'string' && typeof value.name === 'string' && !isPlainObject(value))
  );
}
