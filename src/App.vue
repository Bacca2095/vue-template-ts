<template>
  <main class="container-fluid vld-parent">
    <loading
      v-model:active="loading"
      :can-cancel="false"
      :is-full-page="true"
      :opacity="0.7"
    >
      <div class="spinner"></div>
    </loading>
    <router-view v-slot="{ Component }">
      <component :is="route.meta.layout || 'div'">
        <component :is="Component" />
      </component>
    </router-view>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default defineComponent({
  components: { Loading },
  setup() {
    const route = useRoute();
    const { state } = useStore();

    return { route, loading: computed(() => state.loading) };
  },
});
</script>

<style lang="scss">
@import './assets/scss/app.scss';
</style>
