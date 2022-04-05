import { defineStore } from 'pinia'

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    top: 0,
    left: 0,
    display: false
  }),
  actions: {
    show({ top, left }: { top: number; left: number }) {
      this.top = top
      this.left = left
      this.display = true
    },
    hidden() {
      this.display = false
    }
  }
})
