import type { LooseOptions, WidgetConfig } from '@/models/widget'
import { defineStore } from 'pinia'
import { widgetHook } from '@/hooks/widget'
import { isDef } from '@/utils'

const rootWidget = widgetHook.getWidgetConfig('root')

export const useWidgetStore = defineStore({
  id: 'widget',
  state: () => ({
    action: false,
    root: rootWidget,
    current: rootWidget
  }),
  getters: {
    isAction: (state) => state.action,
    iaActive: (state) => state.root.props?.schema === '2',
    isSettled: (state) => Boolean(state.current.settled)
  },
  actions: {
    lock() {
      this.current.lock = !this.current.lock
    },
    push({ current, parent }: { current: WidgetConfig; parent: WidgetConfig }) {
      parent.children?.push(current)
    },
    delete() {
      const index = this.current.parent?.children?.findIndex((item) => item === this.current)
      if (isDef(index) && index !== -1) {
        const parentWidget = this.current.parent?.parent || this.root
        this.current.parent?.children?.splice(index as number, 1)
        this.current = parentWidget
      }
    },
    setCurrent(current: WidgetConfig) {
      if (this.current === current) return
      if (this.current.virtual) {
        this.delete()
      }
      this.current = current
    },
    setAction(action: boolean) {
      this.action = action
    },
    setStyle(styles: LooseOptions) {
      const relativeY = styles.top - this.current.style.top
      const relativeX = styles.left - this.current.style.left
      const relativeR = styles.rotate - this.current.style.rotate
      this.updateStyle({ styles })

      if (this.current.virtual) {
        this.current.children?.forEach((item) => {
          const top = item.style.top + relativeY
          const left = item.style.left + relativeX
          const rotate = item.style.rotate + relativeR
          this.updateStyle({ widget: item, styles: { top, left, rotate } })
        })
      }
    },
    updateStyle({ widget, styles }: { widget?: WidgetConfig; styles: LooseOptions }) {
      const curWidget = widget || this.current
      for (const key in styles) {
        styles[key] && (curWidget.style[key] = styles[key])
      }
    }
  }
})
