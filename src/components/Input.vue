<template>
  <input
    v-bind="$attrs"
    :value="props.modelValue"
    @input="inputValue($event?.target?.value)"
    class="rounded-md placeholder-gray-400 px-2 p-1 border-2 focus:outline-none focus:ring-2"
    :class="[
      ...Object.values(classes),
      invalid === null
        ? ''
        : invalid
        ? 'border-red-300 focus:ring-red-200'
        : 'border-green-300 focus:ring-green-200',
    ]"
  />
</template>

<script setup lang="ts">
import { defineEmits, defineProps, toRefs } from 'vue';

const props = defineProps({
  modelValue: {
    validator: (prop) => typeof prop === 'string' || prop === 'unknown',
  },
  size: {
    type: String,
    default: 'lg',
  },
  invalid: {
    validator: (prop) => typeof prop === 'boolean' || prop === null,
  },
});

const { size, invalid } = toRefs(props);

const emit = defineEmits(['update:modelValue']);

const classes = {
  inputSize: `text-${size.value} bg-gray-100 focus:bg-white`,
};

const inputValue = (value: string): void => {
  emit('update:modelValue', value);
};
</script>
