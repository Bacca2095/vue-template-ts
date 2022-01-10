import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Button.vue';

describe('Button.vue', () => {
  it('Render button', () => {
    const text = 'Text';
    const variant = 'primary';
    const size = 'sm';
    const wrapper = shallowMount(Button, {
      props: { text, variant, size },
    });
    expect(wrapper.classes()).toEqual(['btn', 'btn-primary', 'btn-sm']);
  });
});
