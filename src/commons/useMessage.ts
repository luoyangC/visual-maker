import { ElMessageBox, ElMessage } from 'element-plus'

interface MessageOption {
  mode: 'message' | 'alert' | 'confirm' | 'prompt'
  type: 'info' | 'success' | 'warning' | 'error'
  message: string
}

export const useMessage = (options: MessageOption) => {
  if (options.mode === 'message') {
    return ElMessage({
      type: options.type,
      message: options.message
    })
  }
  if (options.mode === 'alert') {
    return ElMessageBox.alert(options.message)
  }
  if (options.mode === 'confirm') {
    return ElMessageBox.confirm(options.message)
  }
  if (options.mode === 'prompt') {
    return ElMessageBox.prompt(options.message)
  }
}
