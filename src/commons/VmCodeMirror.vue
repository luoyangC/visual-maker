<template>
  <div ref="codemirror" class="codemirror"></div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import CodeMirror from 'codemirror'
  // css
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/theme/idea.css'
  import 'codemirror/addon/lint/lint.css'
  // modes
  import 'codemirror/mode/javascript/javascript'
  // addon
  import 'codemirror/addon/lint/lint'
  import 'codemirror/addon/lint/json-lint'

  const props = defineProps<{
    modelValue: string
    readonly: boolean
    mode: string
  }>()
  const emits = defineEmits<{
    (e: 'update:modelValue', modelValue: string): void
    (e: 'change', value: string): void
  }>()

  const codemirror = ref()
  let editor: CodeMirror.Editor | null

  watch(
    () => props.modelValue,
    () => {
      if (null != editor && props.modelValue && props.modelValue !== editor.getValue()) {
        // 触发v-model的双向绑定
        editor.setValue(props.modelValue)
      }
    },
    { flush: 'post' }
  )

  const init = () => {
    const addonOptions = {
      // autoCloseBrackets: true,
      // autoCloseTags: true,
      // foldGutter: true,
      // gutters: ['CodeMirror-linenumbers']
    }
    editor = CodeMirror(codemirror.value!, {
      value: '',
      readOnly: props.readonly,
      tabSize: 2,
      theme: 'idea',
      lineWrapping: true,
      lineNumbers: true,
      mode: props.mode,
      ...addonOptions
    })
    editor?.setValue(props.modelValue)
    editor?.on('change', () => {
      emits('update:modelValue', (editor as CodeMirror.Editor).getValue())
      emits('change', (editor as CodeMirror.Editor).getValue())
    })
  }
  onMounted(() => {
    init()
  })
  onUnmounted(() => {
    editor = null
  })
</script>
