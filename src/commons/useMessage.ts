import { getCurrentInstance } from 'vue'

export const useMessage = () => {
  const vm = getCurrentInstance()

  const alert = vm?.appContext.config.globalProperties.$alert
  const prompt = vm?.appContext.config.globalProperties.$prompt
  const confirm = vm?.appContext.config.globalProperties.$confirm

  return {
    alert,
    prompt,
    confirm
  }
}
