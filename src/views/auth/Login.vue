<template>
  <form @submit.prevent="onSubmit" novalidate>
    <div class="row">
      <div class="col text-center">
        <h3>Inicio de sesión</h3>
      </div>
    </div>
    <div class="row my-3">
      <div class="col text-center">
        <input
          :class="`form-control ${
            v$.userEmail.$dirty
              ? !v$.userEmail.$invalid
                ? 'is-valid'
                : 'is-invalid'
              : ''
          }`"
          data-testid="login-email"
          placeholder="Correo"
          v-model="v$.userEmail.$model"
          type="email"
          autocomplete="off"
        />
      </div>
    </div>
    <div class="row my-3">
      <div class="col text-center">
        <input
          :class="`form-control ${
            v$.userPassword.$dirty
              ? !v$.userPassword.$invalid
                ? 'is-valid'
                : 'is-invalid'
              : ''
          }`"
          placeholder="Contraseña"
          data-testid="login-userPassword"
          v-model="v$.userPassword.$model"
          type="password"
          autocomplete="off"
        />
      </div>
    </div>
    <div class="row my-4">
      <div class="col text-center">
        <Button type="submit" data-testid="login-submit" variant="primary"
          >Iniciar sesión</Button
        >
      </div>
    </div>
    <div class="row my-2">
      <div class="col text-center">
        <router-link :to="{ name: 'register' }">
          <Button type="submit" data-testid="login-register" variant="link" size="sm"
            >Registrarse</Button
          >
        </router-link>
      </div>
    </div>
    <div class="row my-2">
      <div class="col text-center">
        <router-link :to="{ name: 'reset-password' }">
          <Button
            type="submit"
            data-testid="login-reset-password"
            variant="link"
            size="sm"
            >Recuperar contraseña</Button
          >
        </router-link>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, toRef } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import useLoad from '@/use/load';
import useFirebase from '@/use/firebase/index';
import { useRouter } from 'vue-router';

const Button = defineAsyncComponent(() => import('@/components/Button.vue'));

useLoad();
const router = useRouter();
const { loginOnFirebase } = useFirebase();

const form = reactive({
  userEmail: '',
  userPassword: '',
});

const rules = {
  userEmail: { required, email },
  userPassword: { required },
};
const v$ = useVuelidate(rules, {
  userEmail: toRef(form, 'userEmail'),
  userPassword: toRef(form, 'userPassword'),
});

const onSubmit = async () => {
  const result = await v$.value.$validate();

  if (result) {
    try {
      loginOnFirebase(form.userEmail, form.userPassword);
      router.push({ name: 'home' });
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
