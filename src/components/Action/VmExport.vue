<template>
  <el-dropdown :hide-on-click="false" class="vm-export">
    <vm-icon name="export" text="导出" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="exportHtml">导出 HTML</el-dropdown-item>
        <el-dropdown-item @click="exportJson">导出 JSON</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
  import { useStore } from '@/store'
  import { widgetToJson } from '@/utils'
  import { widgetHook } from '@/hooks/widget'

  const store = useStore()

  const exportHtml = () => {
    const rootWidget = store.getters['widget/root']
    const widgetHtml = widgetHook.getWidgetHtml('root', rootWidget)
    const commonStyleMap: any = {
      'v-root': 'position: absolute;',
      'v-text': 'position: absolute;',
      'v-image': 'position: absolute;'
    }

    let style = ''
    for (const key in commonStyleMap) {
      style += `.${key}{${commonStyleMap[key]}}`
    }
    const str = `<!DOCTYPE html><html lang="en"><mate><style>${style}</style></mate><body>${widgetHtml}</body></html>`
    console.log(str)
  }
  const exportJson = () => {
    const rootWidget = store.getters['widget/root']
    const widgetData = widgetToJson(rootWidget)

    const blobs = new Blob([JSON.stringify(widgetData, null, 2)], {
      type: 'data:application/json;charset=utf-8'
    })
    const link = document.createElement('a')

    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.href = URL.createObjectURL(blobs)
    link.download = 'config.json'
    link.click()
    document.body.removeChild(link)
  }
</script>

<style lang="scss">
  .vm-export {
    font-size: 18px !important;
    .vm-icon {
      height: 50px;
      width: 50px;
      padding: 5px;
      margin-right: 8px;
      border-radius: 4px;
    }
  }
</style>
