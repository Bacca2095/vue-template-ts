import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Button.vue';

describe('Button.vue', () => {
  it('Render button', () => {
    const variant = 'primary';
    const size = 'sm';
    const wrapper = shallowMount(Button, {
      props: { variant, size },
    });
    expect(wrapper.classes()).toContain('text-sm');
  });
});
