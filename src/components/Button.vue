<template>
  <button v-bind="$attrs" :class="`btn btn-${variant} btn-${size}`">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sizes from './enums/sizes.enum';
import Variants from './enums/variants.enum';

export default defineComponent({
  name: 'b-button',
  props: {
    text: String,
    variant: {
      type: String,
      validator: (variant: Variants) => Object.values(Variants).includes(variant),
    },
    size: {
      type: String,
      validator: (size: Sizes) => Object.values(Sizes).includes(size),
    },
  },
});
</script>
