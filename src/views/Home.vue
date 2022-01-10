<template>
  <div class="home">
   <b-button @click="l" variant="primary" size="sm" >Texto</b-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BButton from '@/components/Button.vue';

export default defineComponent({
  components: {
    BButton,
  },
  setup() {
    const l = () => {
      console.log('a');
    };

    return { l };
  },
});
</script>
