<template>
  <div class="auth-layout">
    <div class="row g-0 align-items-center">
      <div class="col align-self-center">
        <div class="card border-0 shadow rounded p-3">
          <div class="card-body m-5">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss" scoped>
.auth-layout {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
}
</style>
