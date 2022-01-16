<template>
  <div class="auth-layout">
    <div class="flex flex-wrap">
      <div class="w-full align-self-center">
        <div class="border-0 rounded-xl shadow-xl p-3">
          <div class="m-5">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.auth-layout {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
}
</style>
