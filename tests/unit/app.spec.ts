import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import store from '@/store/index';
import router from '@/router/index';

describe('App.vue', () => {
  it('Render initial app', () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [store, router],
      },
    });
    expect(wrapper).toBeTruthy();
  });
});
