import { debounce, isFunction } from '@/utils'
import { onMounted, onUnmounted, ref } from 'vue'

export const useResize = (resize: unknown) => {
  const $_resizeHandler: any = ref(null)

  const initListener = () => {
    $_resizeHandler.value = debounce(() => {
      isFunction(resize) && (resize as Function)()
    }, 10)
    window.addEventListener('resize', $_resizeHandler.value)
  }

  const destroyListener = () => {
    window.removeEventListener('resize', $_resizeHandler.value)
    $_resizeHandler.value = null
  }

  onMounted(() => {
    initListener()
  })

  onUnmounted(() => {
    destroyListener()
  })
}
