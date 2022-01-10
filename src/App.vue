<template>
  <main class="container-fluid">
    <router-view v-slot="{ Component }">
      <component :is="route.meta.layout || 'div'">
        <component :is="Component" />
      </component>
    </router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    return { route };
  },
});
</script>

<style lang="scss">
@import './assets/scss/app.scss';
</style>
