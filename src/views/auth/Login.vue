<template>
  <form @submit.prevent="onSubmit" novalidate>
    <div class="flex my-6">
      <div class="w-full text-center">
        <h3 class="text-2xl font-bold">Inicio de sesión</h3>
      </div>
    </div>
    <div class="flex my-3">
      <div class="w-full text-center">
        <Input
          v-model="v$.userEmail.$model"
          data-testid="login-email"
          placeholder="Correo"
          type="email"
          :invalid="v$.userEmail.$invalid"
        ></Input>
      </div>
    </div>
    <div class="flex my-3">
      <div class="w-full text-center">
        <Input
          placeholder="Contraseña"
          data-testid="login-userPassword"
          v-model="v$.userPassword.$model"
          :invalid="v$.userPassword.$invalid"
          type="password"
        ></Input>
      </div>
    </div>
    <div class="flex my-4">
      <div class="w-full text-center">
        <Button type="submit" data-testid="login-submit">Iniciar sesión</Button>
      </div>
    </div>
    <div class="flex my-2">
      <div class="w-full text-center">
        <router-link :to="{ name: 'register' }">
          <Link size="sm" data-testid="login-register">Registrarse</Link>
        </router-link>
      </div>
    </div>
    <div class="flex my-2">
      <div class="w-full text-center">
        <router-link :to="{ name: 'reset-password' }">
          <Link size="sm" data-testid="login-reset-password">Recuperar contraseña</Link>
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
const Link = defineAsyncComponent(() => import('@/components/Link.vue'));
const Input = defineAsyncComponent(() => import('@/components/Input.vue'));

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
