import { createRouter, createWebHistory } from 'vue-router';
import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import store from '@/store/index';
import Home from '@/views/Home.vue';

describe('App.vue', () => {
  it('Render initial app', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: Home }],
    });

    const wrapper = shallowMount(App, {
      global: {
        plugins: [store, router],
      },
    });
    await router.isReady();
    expect(wrapper).toBeTruthy();
  });
});
