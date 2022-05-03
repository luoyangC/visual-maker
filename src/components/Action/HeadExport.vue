<template>
  <el-dropdown :hide-on-click="false" class="head-export">
    <vm-icon name="export" text="导出" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="exportJson">导出 JSON</el-dropdown-item>
        <el-dropdown-item @click="exportCustom">导出 Custom</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
  import { useWidgetStore } from '@/store/widget'
  import { widgetHook } from '@/hooks/widget'

  const widgetStore = useWidgetStore()

  const exportData = (data: any, fileName: string) => {
    const blobParts = [JSON.stringify(data, null, 2)]
    const blobs = new Blob(blobParts, { type: 'data:application/json;charset=utf-8' })
    const link = document.createElement('a')

    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.href = URL.createObjectURL(blobs)
    link.download = fileName
    link.click()
    document.body.removeChild(link)
  }

  const exportJson = () => {
    const rootWidget = widgetStore.root
    const widgetData = widgetHook.widgetToJson(rootWidget)

    exportData(widgetData, 'config.json')
  }

  const exportCustom = () => {
    const curWidget = widgetStore.current
    const widgetData = widgetHook.widgetToJson(curWidget)
    const height = curWidget.style.height
    const width = curWidget.style.width

    const option = {
      type: 'custom',
      lock: false,
      style: {
        width,
        height,
        minWidth: width,
        minHeight: height,
        opacity: 1,
        rotate: 0,
        top: 0,
        left: 0
      },
      attrs: {},
      props: {},
      children: [{ ...widgetData, style: { ...widgetData.style, top: 0, left: 0 }, fixed: true }]
    }
    exportData(option, 'custom.json')
  }
</script>

<style lang="scss">
  .head-export {
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
