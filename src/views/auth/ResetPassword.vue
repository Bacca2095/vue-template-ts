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
        <b-button type="submit" variant="primary">Enviar correo</b-button>
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

// eslint-disable-next-line object-curly-newline
import { defineComponent, onMounted, onUnmounted, reactive, toRef } from 'vue';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    'b-button': Button,
  },

  setup() {
    const { dispatch } = useStore();
    const router = useRouter();
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
          const auth = getAuth();

          await sendPasswordResetEmail(auth, form.email);

          router.push({ name: 'login' });
        } catch (error) {
          console.log(error);
        }
      }
    };

    onMounted(() => {
      dispatch('setLoading', false);
    });

    onUnmounted(() => {
      dispatch('setLoading', true);
    });

    return { v$, onSubmit };
  },
});
</script>
