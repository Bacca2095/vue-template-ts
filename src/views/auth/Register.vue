<template>
  <form @submit.prevent="onSubmit" novalidate autocomplete="off">
    <div class="flex my-6">
      <div class="w-full text-center">
        <h3 class="text-2xl font-bold">Registrarse</h3>
      </div>
    </div>
    <div class="flex my-3">
      <div class="w-full text-center">
        <Input
          placeholder="Correo"
          :invalid="v$.email.$invalid"
          v-model="v$.email.$model"
          type="email"
        />
      </div>
    </div>
    <div class="flex my-3">
      <div class="w-full text-center">
        <Input
          placeholder="Contraseña"
          v-model="v$.password.$model"
          :invalid="v$.password.$invalid"
          type="password"
          autocomplete="off"
        />
      </div>
    </div>
    <div class="flex my-4">
      <div class="w-full text-center">
        <Button type="submit">Registrarse</Button>
      </div>
    </div>
    <div class="flex my-4">
      <div class="w-full text-center">
        <router-link :to="{ name: 'login' }">
          <Link size="sm">Volver</Link>
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
import useFirebase from '@/use/firebase';
import { useRouter } from 'vue-router';

const Button = defineAsyncComponent(() => import('@/components/Button.vue'));
const Link = defineAsyncComponent(() => import('@/components/Link.vue'));
const Input = defineAsyncComponent(() => import('@/components/Input.vue'));

useLoad();
const router = useRouter();
const { registerOnFirebase } = useFirebase();
const form = reactive({
  email: '',
  password: '',
});
const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, {
  email: toRef(form, 'email'),
  password: toRef(form, 'password'),
});

const onSubmit = async () => {
  const result = await v$.value.$validate();

  if (result) {
    try {
      registerOnFirebase(form.email, form.password);
      router.push({ name: 'login' });
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
