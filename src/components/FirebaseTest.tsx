'use client';

import { useState } from 'react';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';

export default function FirebaseTest() {
  const [status, setStatus] = useState<string>('Gotowy do testowania...');
  const [isLoading, setIsLoading] = useState(false);

  const testFirestore = async () => {
    setIsLoading(true);
    setStatus('Testowanie Firestore...');
    
    try {
      // Test zapisu
      const testDoc = await addDoc(collection(db, 'test'), {
        message: 'Hello from Voyager!',
        timestamp: Timestamp.now()
      });
      
      setStatus(`✅ Firestore połączony! Test doc ID: ${testDoc.id}`);
      
      // Test odczytu
      const snapshot = await getDocs(collection(db, 'test'));
      setStatus(prev => prev + `\n📖 Znaleziono ${snapshot.size} dokumentów testowych`);
      
    } catch (error: any) {
      setStatus(`❌ Błąd Firestore: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const createFirstAdmin = async () => {
    setIsLoading(true);
    setStatus('Tworzenie pierwszego administratora...');
    
    try {
      const adminEmail = 'admin@voyager.pl';
      const adminPassword = 'VoyagerAdmin2024!'; // Zmień na bezpieczne hasło
      
      // Utwórz użytkownika
      const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
      
      setStatus(`✅ Administrator utworzony! UID: ${userCredential.user.uid}\nEmail: ${adminEmail}\nHasło: ${adminPassword}`);
      
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setStatus('⚠️ Administrator już istnieje!');
      } else {
        setStatus(`❌ Błąd tworzenia administratora: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const testAuth = async () => {
    setIsLoading(true);
    setStatus('Testowanie logowania...');
    
    try {
      const email = 'admin@voyager.pl';
      const password = 'VoyagerAdmin2024!';
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setStatus(`✅ Logowanie działa! User: ${userCredential.user.email}`);
      
      // Wyloguj
      await signOut(auth);
      setStatus(prev => prev + '\n🚪 Wylogowano pomyślnie');
      
    } catch (error: any) {
      setStatus(`❌ Błąd logowania: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white border border-gray-200 max-w-lg mx-auto mt-8">
      <h3 className="text-lg font-medium mb-4">Test połączenia Firebase</h3>
      
      <div className="space-y-3">
        <button
          onClick={testFirestore}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Test Firestore
        </button>
        
        <button
          onClick={createFirstAdmin}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          Utwórz pierwszego administratora
        </button>
        
        <button
          onClick={testAuth}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        >
          Test logowania
        </button>
      </div>
      
      {status && (
        <pre className="mt-4 p-4 bg-gray-100 text-sm whitespace-pre-wrap rounded border text-left">
          {status}
        </pre>
      )}
      
      {isLoading && (
        <div className="mt-4 text-center">
          <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        </div>
      )}
    </div>
  );
}