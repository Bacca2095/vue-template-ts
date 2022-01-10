import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ isCompression: false });

export default createStore({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, tokenValue) {
      state.token = tokenValue;
    },
  },
  actions: {
    setToken(context, value) {
      context.commit('setToken', value);
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
