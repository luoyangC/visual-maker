import type { App } from 'vue'
import VmButtonGroup from './VmButtonGroup.vue'
import VmCollapse from './VmCollapse.vue'
import VmColorPicker from './VmColorPicker.vue'
import VmForm from './VmForm.vue'
import VmFormItem from './VmFormItem.vue'
import VmFormLabel from './VmFormLabel.vue'
import VmIcon from './VmIcon.vue'
import VmInput from './VmInput.vue'
import VmInputNumber from './VmInputNumber.vue'
import VmInputArray from './VmInputArray.vue'
import VmInputUnit from './VmInputUnit.vue'
import VmSelect from './VmSelect.vue'
import VmSlider from './VmSlider.vue'
import VmChart from './VmChart.vue'
import VmCodeMirror from './VmCodeMirror.vue'

import VmSlot from '@/components/Editor/VmSlot.vue'
import VmShape from '@/components/Editor/VmShape.vue'
import VmWidget from '@/components/Editor/VmWidget.vue'
import VmDynamic from '@/components/Editor/VmDynamic.vue'

export default {
  install: (app: App) => {
    app.component('VmButtonGroup', VmButtonGroup)
    app.component('VmCollapse', VmCollapse)
    app.component('VmColorPicker', VmColorPicker)
    app.component('VmForm', VmForm)
    app.component('VmFormItem', VmFormItem)
    app.component('VmFormLabel', VmFormLabel)
    app.component('VmIcon', VmIcon)
    app.component('VmInput', VmInput)
    app.component('VmInputNumber', VmInputNumber)
    app.component('VmInputArray', VmInputArray)
    app.component('VmInputUnit', VmInputUnit)
    app.component('VmSelect', VmSelect)
    app.component('VmSlider', VmSlider)
    app.component('VmChart', VmChart)
    app.component('VmCodeMirror', VmCodeMirror)

    app.component('VmSlot', VmSlot)
    app.component('VmShape', VmShape)
    app.component('VmWidget', VmWidget)
    app.component('VmDynamic', VmDynamic)
  }
}
