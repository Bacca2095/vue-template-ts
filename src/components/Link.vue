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
  linkStyle: ` hover:text-${props.variant}-600 hover:bg-gray-200`,
  linkPadding: 'px-2 p-1',
  linkTransition:
    'transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110',
  linkText: `text-${props.variant}-500 text-${props.size}`,
  linkRounded: 'rounded',
};
</script>
