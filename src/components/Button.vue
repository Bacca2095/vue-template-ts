<template>
  <button v-bind="$attrs" :class="`btn ${currentVariant} ${currentSize}`" ><slot/></button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'b-button',
  props: {
    text: String,
    variant: String,
    size: String,
  },
  setup(props) {
    const currentVariant = ref<string>(`btn-${props.variant}`);
    const currentSize = ref<string>(`btn-${props.size}`);
    return { currentVariant, currentSize };
  },
});
</script>
