import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ isCompression: false });

export default createStore({
  state: {
    name: null,
    photoUrl: null,
    email: null,
  },
  mutations: {
    setName(state, name) {
      state.name = name;
    },
    setPhotoUrl(state, photoUrl) {
      state.photoUrl = photoUrl;
    },
    setEmail(state, email) {
      state.email = email;
    },
  },
  actions: {
    setName(context, name) {
      context.commit('setName', name);
    },
    setPhotoUrl(context, photoUrl) {
      context.commit('setPhotoUrl', photoUrl);
    },
    setEmail(context, email) {
      context.commit('setEmail', email);
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      key: 'vue-template-ts',
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
