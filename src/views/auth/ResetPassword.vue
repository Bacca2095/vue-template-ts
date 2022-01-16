<template>
  <form @submit.prevent="onSubmit" novalidate>
    <div class="flex">
      <div class="w-full text-center">
        <h3 class="text-2xl font-bold">Recuperar contraseña</h3>
      </div>
    </div>
    <div class="flex my-3">
      <div class="w-full text-center">
        <Input
          placeholder="Correo"
          v-model="v$.email.$model"
          :invalid="v$.email.$dirty ? v$.email.$invalid : null"
          type="email"
        />
      </div>
    </div>
    <div class="flex my-4">
      <div class="w-full text-center">
        <Button type="submit">Enviar correo</Button>
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
const { resetPasswordOnFirebase } = useFirebase();
const form = reactive({
  email: '',
});
const rules = {
  email: { required, email },
};

const v$ = useVuelidate(rules, {
  email: toRef(form, 'email'),
});

const onSubmit = async () => {
  const result = await v$.value.$validate();

  if (result) {
    try {
      resetPasswordOnFirebase(form.email);
      router.push({ name: 'login' });
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
