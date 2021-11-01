import type { App } from 'vue'
import {
  ElIcon,
  ElButton,
  ElColorPicker,
  ElTooltip,
  ElSelect,
  ElOption,
  ElSlider,
  ElContainer,
  ElHeader,
  ElMain,
  ElFooter,
  ElTabs,
  ElTabPane,
  ElDivider,
  ElInput,
  ElInputNumber,
  ElDialog,
  ElDropdown,
  ElDropdownMenu
} from 'element-plus'

export default function elementPlugin(app: App) {
  app.config.globalProperties.$ELEMENT = {
    size: 'small',
    zIndex: 3000
  }
  app.use(ElIcon)
  app.use(ElButton)
  app.use(ElColorPicker)
  app.use(ElTooltip)
  app.use(ElSelect)
  app.use(ElOption)
  app.use(ElSlider)
  app.use(ElContainer)
  app.use(ElHeader)
  app.use(ElMain)
  app.use(ElFooter)
  app.use(ElTabs)
  app.use(ElTabPane)
  app.use(ElDivider)
  app.use(ElInput)
  app.use(ElInputNumber)
  app.use(ElDialog)
  app.use(ElDropdown)
  app.use(ElDropdownMenu)
}
