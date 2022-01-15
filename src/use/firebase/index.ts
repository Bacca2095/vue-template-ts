import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import store from '@/store/index';

export interface UseFirebase {
  loginOnFirebase: (email: string, password: string) => void;
  registerOnFirebase: (email: string, password: string) => void;
  resetPasswordOnFirebase: (email: string) => void;
}

export default function useFirebase(): UseFirebase {
  const loginOnFirebase = async (email: string, password: string): Promise<void> => {
    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      store.dispatch('setName', user.displayName);
      store.dispatch('setPhotoUrl', user.photoURL);
      store.dispatch('setEmail', user.email);
    } catch (error) {
      console.log(error);
    }
  };

  const registerOnFirebase = async (email: string, password: string): Promise<void> => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const resetPasswordOnFirebase = async (email: string): Promise<void> => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log(error);
    }
  };

  return { loginOnFirebase, registerOnFirebase, resetPasswordOnFirebase };
}
