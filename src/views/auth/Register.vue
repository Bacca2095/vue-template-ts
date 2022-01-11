<template>
  <form @submit.prevent="onSubmit" novalidate>
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
        <b-button type="submit" variant="primary">Registrarse</b-button>
      </div>
    </div>
    <div class="row my-4">
      <div class="col text-center">
        <router-link :to="{ name: 'login' }">
          <b-button variant="link" size="sm">Volver</b-button>
        </router-link>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Button from '@/components/Button.vue';

import { defineComponent, reactive, toRef } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    'b-button': Button,
  },

  setup() {
    const router = useRouter();
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
          const auth = getAuth();
          const { user } = await createUserWithEmailAndPassword(
            auth,
            form.email,
            form.password
          );
          if (user) router.push({ name: 'login' });
        } catch (error) {
          console.log(error);
        }
      }
    };

    return { v$, onSubmit };
  },
});
</script>
