<template>
  <button v-bind="$attrs" :class="[...Object.values(classes)]">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  link: {
    type: Boolean,
    default: false,
  },
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
  buttonStyle: ` bg-${props.variant}-500 hover:bg-${props.variant}-600`,
  buttonPadding: 'px-2 p-1',
  buttonTransition: 'transition ease-in-out delay-150 duration-300',
  buttonText: `text-white text-${props.size}`,
  buttonRounded: 'rounded',
};
</script>
