import { defineStore } from 'pinia'

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    top: 0,
    left: 0,
    offsetX: 0,
    offsetY: 0,
    display: false
  }),
  actions: {
    show({
      top,
      left,
      offsetX,
      offsetY
    }: {
      top: number
      left: number
      offsetX: number
      offsetY: number
    }) {
      this.top = top
      this.left = left
      this.offsetX = offsetX
      this.offsetY = offsetY
      this.display = true
    },
    hidden() {
      this.display = false
    }
  }
})
