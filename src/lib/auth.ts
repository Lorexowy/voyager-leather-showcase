import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { COLLECTIONS } from './firestore-types';

export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
}

// Logowanie administratora
export const signInAdmin = async (email: string, password: string): Promise<AdminUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Sprawdź czy użytkownik jest w kolekcji adminów
    const adminDoc = await getDoc(doc(db, COLLECTIONS.ADMINS, user.uid));
    
    if (!adminDoc.exists()) {
      // Jeśli to pierwszy login administratora, utwórz rekord
      if (user.email === process.env.ADMIN_EMAIL || user.email === 'admin@voyager.pl') {
        await setDoc(doc(db, COLLECTIONS.ADMINS, user.uid), {
          id: user.uid,
          email: user.email,
          displayName: 'Administrator',
          createdAt: Timestamp.now(),
          lastLogin: Timestamp.now(),
        });
      } else {
        throw new Error('Unauthorized: Not an admin user');
      }
    } else {
      // Aktualizuj czas ostatniego logowania
      await setDoc(doc(db, COLLECTIONS.ADMINS, user.uid), {
        lastLogin: Timestamp.now(),
      }, { merge: true });
    }

    return {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || 'Administrator'
    };
  } catch (error: any) {
    throw new Error(error.message || 'Błąd logowania');
  }
};

// Wylogowanie
export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

// Hook do monitorowania stanu autentyfikacji
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Sprawdź czy użytkownik jest administratorem
export const isUserAdmin = async (user: User): Promise<boolean> => {
  try {
    const adminDoc = await getDoc(doc(db, COLLECTIONS.ADMINS, user.uid));
    return adminDoc.exists();
  } catch (error) {
    return false;
  }
};