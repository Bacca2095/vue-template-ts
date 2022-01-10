<template>
  <form @submit.prevent="onSubmit" novalidate>
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
    <div class="row my-3">
      <div class="col text-center">
        <input
          :class="`form-control ${!v$.password.$invalid ? 'is-valid' : 'is-invalid'}`"
          placeholder="Contraseña"
          v-model="v$.password.$model"
          type="password"
        />
      </div>
    </div>
    <div class="row my-4">
      <div class="col text-center">
        <b-button type="submit" variant="primary">Iniciar sesión</b-button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Button from '@/components/Button.vue';

import { defineComponent, reactive, toRef } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

export default defineComponent({
  components: {
    'b-button': Button,
  },

  setup() {
    const state = reactive({
      email: '',
      password: '',
    });
    const rules = {
      email: { required, email },
      password: { required },
    };

    const v$ = useVuelidate(rules, {
      email: toRef(state, 'email'),
      password: toRef(state, 'password'),
    });

    const onSubmit = async () => {
      const result = await v$.value.$validate();

      if (result) {
        try {
          const auth = getAuth();
          const userCredential = await signInWithEmailAndPassword(
            auth,
            state.email,
            state.password
          );

          console.log(userCredential);
        } catch (error) {
          console.log(error);
        }
      }
    };

    return { v$, onSubmit };
  },
});
</script>
