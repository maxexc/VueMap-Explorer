<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: {
    default: 'text',
    type: String
  }
})

defineOptions({
  inheritAttrs: false
})

const emit = defineEmits(['update:modelValue'])
const baseStyles =
  'w-full text-sm rounded-[4px] border-borderInput border-[1px] py-2 px-3 appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-white'

const isTextarea = computed(() => {
  return props.type === 'textarea'
})
const inputStyles = computed(() => {
  return isTextarea.value ? baseStyles + ' resize-none' : baseStyles
})
const componentName = computed(() => {
  return isTextarea.value ? 'textarea' : 'input'
})
</script>

<template>
  <div class="w-full text-border">
    <label class="block">
      <span class="block text-xs px-3 mb-0.5 lg:mb-1">{{ props.label }} </span>
      <component
        :is="componentName"
        rows="3"
        :class="inputStyles"
        v-bind="{ ...$props, ...$attrs }"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
      />
    </label>
  </div>
</template>
