import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import store from '@/store/index';
import router from '@/router/index';

describe('App.vue', () => {
  it('Render initial app', async () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [store, router],
      },
    });
    await router.isReady();
    expect(wrapper).toBeTruthy();
  });
});

describe('App.vue', () => {
  it('Navigate to home', async () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [store, router],
      },
    });
    await router.isReady();

    expect(wrapper.html()).toContain('vld-parent');
  });
});
