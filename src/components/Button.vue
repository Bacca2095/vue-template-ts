<template>
  <button v-bind="$attrs" :class="`btn btn-${variant} btn-${size}`">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import sizes from './enums/sizes.enum';
import variants from './enums/variants.enum';

defineProps({
  text: String,
  variant: {
    type: String,
    validator: (variant: variants) => Object.values(variants).includes(variant),
  },
  size: {
    type: String,
    validator: (size: sizes) => Object.values(sizes).includes(size),
  },
});
</script>
