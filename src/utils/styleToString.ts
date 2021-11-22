import type { LooseOptions } from '@/models/widget'

export function styleToString(styles: LooseOptions): string {
  let styleStr = ''
  for (const key in styles) {
    if (styles[key] && key !== 'textStyles') {
      styleStr += `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}:${styles[key]};`
    }
  }
  return styleStr
}
