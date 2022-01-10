<template>
  <div class="auth-layout">
    <div class="row g-0">
      <div class="col">
        <div class="card border-0 shadow rounded p-3">
          <div class="card-body m-5">
            <div class="row">
              <div class="col text-center">
                <h1>Login</h1>
              </div>
            </div>
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
