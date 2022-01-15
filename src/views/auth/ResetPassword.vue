<template>
  <form @submit.prevent="onSubmit" novalidate>
    <div class="row">
      <div class="col text-center">
        <h3>Recuperar contraseña</h3>
      </div>
    </div>
    <div class="row my-3">
      <div class="col text-center">
        <input
          :class="`form-control ${!v$.email.$invalid ? 'is-valid' : 'is-invalid'}`"
          placeholder="Correo"
          v-model="v$.email.$model"
          type="email"
        />
      </div>
    </div>
    <div class="row my-4">
      <div class="col text-center">
        <Button type="submit" variant="primary">Enviar correo</Button>
      </div>
    </div>
    <div class="row my-4">
      <div class="col text-center">
        <router-link :to="{ name: 'login' }">
          <Button variant="link" size="sm">Volver</Button>
        </router-link>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import * as Button from '@/components/Button.vue';
import { reactive, toRef } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import useLoad from '@/use/load';
import useFirebase from '@/use/firebase';
import { useRouter } from 'vue-router';

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
