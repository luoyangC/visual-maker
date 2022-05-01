/**
 * 存储localStorage
 */
export const setLocalStore = (name: string, content: any) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getLocalStore = (name: string): string => {
  if (!name) return ''
  return window.localStorage.getItem(name) || ''
}

/**
 * 删除localStorage
 */
export const removeLocalStore = (name: string) => {
  if (!name) return
  window.localStorage.removeItem(name)
}
