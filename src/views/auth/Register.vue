<template>
  <form @submit.prevent="onSubmit" novalidate autocomplete="off">
    <div class="row">
      <div class="col text-center">
        <h3>Registrarse</h3>
      </div>
    </div>
    <div class="row my-3">
      <div class="col text-center">
        <input
          :class="`form-control ${
            v$.email.$dirty ? (!v$.email.$invalid ? 'is-valid' : 'is-invalid') : ''
          }`"
          placeholder="Correo"
          v-model="v$.email.$model"
          type="email"
        />
      </div>
    </div>
    <div class="row my-3">
      <div class="col text-center">
        <input
          :class="`form-control ${
            v$.password.$dirty ? (!v$.password.$invalid ? 'is-valid' : 'is-invalid') : ''
          }`"
          placeholder="Contraseña"
          v-model="v$.password.$model"
          type="password"
          autocomplete="off"
        />
      </div>
    </div>
    <div class="row my-4">
      <div class="col text-center">
        <Button type="submit" variant="primary">Registrarse</Button>
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
