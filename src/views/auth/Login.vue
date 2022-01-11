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
            v$.email.$dirty ? (!v$.email.$invalid ? 'is-valid' : 'is-invalid') : ''
          }`"
          placeholder="Correo"
          v-model="v$.email.$model"
          type="email"
          autocomplete="off"
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
        <b-button type="submit" variant="primary">Iniciar sesión</b-button>
      </div>
    </div>
    <div class="row my-2">
      <div class="col text-center">
        <router-link :to="{ name: 'register' }">
          <b-button type="submit" variant="link" size="sm">Registrarse</b-button>
        </router-link>
      </div>
    </div>
    <div class="row my-2">
      <div class="col text-center">
        <router-link :to="{ name: 'reset-password' }">
          <b-button type="submit" variant="link" size="sm">Recuperar contraseña</b-button>
        </router-link>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Button from '@/components/Button.vue';
// eslint-disable-next-line object-curly-newline
import { defineComponent, onMounted, onUnmounted, reactive, toRef } from 'vue';
import { useStore } from 'vuex';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useRouter } from 'vue-router';

export interface UserData {
  name: string | null;
  photo: string | null;
  email: string | null;
}

export default defineComponent({
  components: {
    'b-button': Button,
  },

  setup() {
    const router = useRouter();
    const { dispatch } = useStore();
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

    const saveUser = (data: UserData) => {
      dispatch('setName', data.name);
      dispatch('setPhotoUrl', data.photo);
      dispatch('setEmail', data.email);
    };

    const onSubmit = async () => {
      const result = await v$.value.$validate();

      if (result) {
        try {
          const auth = getAuth();
          const { user } = await signInWithEmailAndPassword(
            auth,
            form.email,
            form.password
          );

          saveUser({ name: user.displayName, photo: user.photoURL, email: user.email });

          onAuthStateChanged(auth, (userState) => {
            if (userState) {
              saveUser({
                name: userState.displayName,
                photo: userState.photoURL,
                email: userState.email,
              });
            } else {
              saveUser({
                name: null,
                photo: null,
                email: null,
              });
            }
          });

          router.push({ name: 'home' });
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

    return {
      v$,
      onSubmit,
      form,
    };
  },
});
</script>
