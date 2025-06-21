// src/lib/admin-management.ts

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  collection, 
  getDocs,
  deleteDoc,
  Timestamp 
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { COLLECTIONS } from './firestore-types';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super-admin';
  createdAt: Date;
  createdBy: string;
  displayName?: string;
}

// Dodaj nowego administratora
export const createNewAdmin = async (
  email: string, 
  temporaryPassword: string,
  displayName?: string
): Promise<string> => {
  const currentUser = auth.currentUser;
  const currentUserEmail = currentUser?.email;
  
  if (!currentUser) {
    throw new Error('Musisz być zalogowany, aby dodać administratora');
  }

  try {
    // 1. Zapisz dane obecnego użytkownika
    const currentUserData = {
      uid: currentUser.uid,
      email: currentUser.email,
    };

    // 2. Utwórz nowego użytkownika (to automatycznie go zaloguje)
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      email, 
      temporaryPassword
    );
    
    const newUser = userCredential.user;
    
    // 3. Dodaj nowego użytkownika do kolekcji admins
    await setDoc(doc(db, COLLECTIONS.ADMINS, newUser.uid), {
      email: email,
      role: 'admin',
      createdAt: Timestamp.now(),
      createdBy: currentUserEmail || 'system',
      displayName: displayName || null,
    });
    
    // 4. Wyloguj nowego użytkownika
    await firebaseSignOut(auth);
    
    // 5. Zaloguj z powrotem oryginalnego użytkownika
    if (currentUserData.email) {
      // Tu nie możemy zalogować z powrotem automatycznie, bo nie mamy hasła
      // Zamiast tego przekierujemy na stronę logowania z informacją
      throw new Error('RELOGIN_REQUIRED');
    }
    
    return newUser.uid;
  } catch (error: any) {
    console.error('Error creating new admin:', error);
    
    if (error.message === 'RELOGIN_REQUIRED') {
      throw new Error('Administrator został utworzony pomyślnie. Zostaniesz przekierowany na stronę logowania.');
    }
    
    throw new Error(`Nie udało się utworzyć administratora: ${error.message}`);
  }
};

// Pobierz listę wszystkich adminów
export const getAllAdmins = async (): Promise<AdminUser[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.ADMINS));
    const admins: AdminUser[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      admins.push({
        id: doc.id,
        email: data.email,
        role: data.role,
        createdAt: data.createdAt.toDate(),
        createdBy: data.createdBy,
        displayName: data.displayName,
      });
    });
    
    return admins.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error: any) {
    console.error('Error fetching admins:', error);
    throw new Error('Nie udało się pobrać listy administratorów');
  }
};

// Usuń administratora
export const removeAdmin = async (adminId: string): Promise<void> => {
  try {
    // Sprawdź czy to nie ostatni admin
    const admins = await getAllAdmins();
    if (admins.length <= 1) {
      throw new Error('Nie można usunąć ostatniego administratora');
    }
    
    // Sprawdź czy admin nie próbuje usunąć siebie
    if (auth.currentUser?.uid === adminId) {
      throw new Error('Nie możesz usunąć własnego konta');
    }
    
    // Usuń z kolekcji admins
    await deleteDoc(doc(db, COLLECTIONS.ADMINS, adminId));
    
    // Uwaga: Usunięcie z Authentication wymaga Admin SDK (backend)
    // W przypadku frontend-only możemy tylko usunąć z Firestore
    console.log('Admin removed from Firestore. Authentication account still exists.');
    
  } catch (error: any) {
    console.error('Error removing admin:', error);
    throw new Error(`Nie udało się usunąć administratora: ${error.message}`);
  }
};

// Sprawdź czy użytkownik może zarządzać adminami (tylko super-admin lub główny admin)
export const canManageAdmins = async (userId: string): Promise<boolean> => {
  try {
    // Tu możesz dodać logikę sprawdzania uprawnień
    // Na razie każdy admin może dodawać innych adminów
    return true;
  } catch (error) {
    return false;
  }
};