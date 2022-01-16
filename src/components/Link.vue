<template>
  <a v-bind="$attrs" class="rounded px-2 p-1" :class="[...Object.values(classes)]">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'lg',
  },
  variant: {
    type: String,
    default: 'blue',
  },
});

const classes = {
  buttonStyle: `text-${props.variant}-500 hover:text-${props.variant}-600 hover:bg-gray-200`,
  buttonSize: `text-${props.size}`,
};
</script>
