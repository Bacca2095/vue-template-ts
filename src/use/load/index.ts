import { onMounted, onUnmounted } from 'vue';
import store from '@/store/index';

export default function useLoad(): void {
  onMounted(() => {
    store.dispatch('setLoading', false);
  });

  onUnmounted(() => {
    store.dispatch('setLoading', true);
  });
}
