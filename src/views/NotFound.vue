<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const { dispatch } = useStore();
    onMounted(() => {
      dispatch('setLoading', false);
    });

    onUnmounted(() => {
      dispatch('setLoading', true);
    });
  },
});
</script>
