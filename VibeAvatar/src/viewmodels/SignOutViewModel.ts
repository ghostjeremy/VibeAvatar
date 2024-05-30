import { useRouter } from 'vue-router';
import { useProfile } from '../stores/profileStore';
 // Navigation function for Sign Out process, assuming to login page
export function signOut() {
 
    const router = useRouter();
    const profileStore = useProfile();

    function signOut() {
      profileStore.resetProfile();
      localStorage.clear();
      router.push('/login');
    }
  
    return signOut;
  
}
