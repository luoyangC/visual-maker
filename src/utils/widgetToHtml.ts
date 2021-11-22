import type { WidgetHtml } from '@/models/widget'
import { isArray, isObject, isString, styleToString } from '.'

const randomSet = new Set<string>()

const commonStyleMap: any = {
  '*': 'margin: 0; padding: 0; box-sizing: border-box;',
  '.v-body':
    'display: flex; justify-content: center; align-items: center;; height: 100vh; width: 100vw;',
  '.g-pos--a': 'position: absolute;',
  '.g-pos--r': 'position: relative;',
  '.v-root': 'position: relative;',
  '.v-slot': 'position: relative;',
  '.v-link': 'display: inline-flex; text-decoration: none; cursor: pointer;',
  '.v-button':
    'display: inline-block; cursor: pointer; background-color: #ffffff; border: 1px solid #dcdfe6; margin: 0; padding: 12px 20px; border-radius: 4px;',
  '.v-text': 'display: table-cell;',
  '.v-ul': 'display: flex; justify-content: space-evenly; align-items: center;',
  '.v-table': 'display: flex;',
  '.v-table .v-slot:first-child .v-table-column': 'border-left: 1px solid #ccc;',
  '.v-table-column':
    'border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; border-right: 1px solid #ccc;',
  '.v-table-head': 'font-weight: bold;',
  '.v-table-cell': 'border-top: 1px solid #ccc;'
}

const computedStyleMap = new Map<string, string>()

function randomString(e = 8) {
  let n = ''
  const t = 'abcdefghijklmnopqrstuvwxyz1234567890'
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * t.length))
  if (randomSet.has(n)) {
    n = randomString()
  } else {
    randomSet.add(n)
  }
  return n
}

export function widgetToHtml(widget: WidgetHtml) {
  const { tag, type, props } = widget

  let localClass = ''
  let localAttrs = ''
  let localDefault = ''

  if (props) {
    localClass = props.class || ''
    const styleStr = styleToString(props.style || {})
    const styleClass = computedStyleMap.get(styleStr)
    if (styleStr && !styleClass) {
      const classKey = `v-data-${randomString()}`
      computedStyleMap.set(styleStr, classKey)
      localClass += ` ${classKey}`
    } else if (styleStr && styleClass) {
      localClass += ` ${styleClass}`
    }
  }
  for (const key in props) {
    if (key !== 'class' && key !== 'style') {
      localAttrs += ` ${key.replace(/([A-Z])/g, '-$1').toLowerCase()}="${props[key]}"`
    }
  }

  if (isString(widget.default)) {
    localDefault = widget.default as string
  } else if (isArray(widget.default)) {
    localDefault = (widget.default as Array<WidgetHtml>).map((item) => widgetToHtml(item)).join('')
  } else if (isObject(widget.default)) {
    localDefault = widgetToHtml(widget.default as WidgetHtml)
  }

  const html = `<${tag} class="${localClass}" ${localAttrs}>${localDefault}</${tag}>`

  if (type === 'root') {
    let style = ''
    for (const key in commonStyleMap) {
      style += `${key}{${commonStyleMap[key]}}`
    }
    for (const key of computedStyleMap.keys()) {
      style += `.${computedStyleMap.get(key)}{${key}}`
    }
    return `<!DOCTYPE html><html lang="en"><head><style type="text/css">${style}</style></head><body class="v-body">${html}</body></html>`
  }
  return html
}
