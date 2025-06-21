import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query, 
  orderBy, 
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { COLLECTIONS, FirestoreContactMessage, convertFirestoreContactMessage } from './firestore-types';
import { ContactForm } from '@/types';

// Wyślij wiadomość kontaktową
export const submitContactForm = async (formData: ContactForm): Promise<void> => {
  try {
    await addDoc(collection(db, COLLECTIONS.CONTACT_MESSAGES), {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      message: formData.message,
      productId: formData.productId || '',
      productName: formData.productName || '',
      createdAt: Timestamp.now(),
      isRead: false,
      isReplied: false,
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw new Error('Nie udało się wysłać wiadomości');
  }
};

// Pobierz wszystkie wiadomości kontaktowe
export const getContactMessages = async (): Promise<FirestoreContactMessage[]> => {
  try {
    const q = query(
      collection(db, COLLECTIONS.CONTACT_MESSAGES),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const messages: FirestoreContactMessage[] = [];
    
    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data()
      } as FirestoreContactMessage);
    });
    
    return messages;
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    throw new Error('Nie udało się pobrać wiadomości');
  }
};

// Pobierz nieprzeczytane wiadomości
export const getUnreadContactMessages = async (): Promise<FirestoreContactMessage[]> => {
  try {
    const q = query(
      collection(db, COLLECTIONS.CONTACT_MESSAGES),
      where('isRead', '==', false),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const messages: FirestoreContactMessage[] = [];
    
    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data()
      } as FirestoreContactMessage);
    });
    
    return messages;
  } catch (error) {
    console.error('Error fetching unread messages:', error);
    throw new Error('Nie udało się pobrać nieprzeczytanych wiadomości');
  }
};

// Oznacz wiadomość jako przeczytaną
export const markMessageAsRead = async (messageId: string): Promise<void> => {
  try {
    const messageRef = doc(db, COLLECTIONS.CONTACT_MESSAGES, messageId);
    await updateDoc(messageRef, {
      isRead: true
    });
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw new Error('Nie udało się oznaczyć wiadomości jako przeczytanej');
  }
};

// Oznacz wiadomość jako nieprzeczytaną
export const markMessageAsUnread = async (messageId: string): Promise<void> => {
  try {
    const messageRef = doc(db, COLLECTIONS.CONTACT_MESSAGES, messageId);
    await updateDoc(messageRef, {
      isRead: false
    });
  } catch (error) {
    console.error('Error marking message as unread:', error);
    throw new Error('Nie udało się oznaczyć wiadomości jako nieprzeczytanej');
  }
};

// Oznacz wiadomość jako odpowiedzianą
export const markMessageAsReplied = async (messageId: string): Promise<void> => {
  try {
    const messageRef = doc(db, COLLECTIONS.CONTACT_MESSAGES, messageId);
    await updateDoc(messageRef, {
      isReplied: true
    });
  } catch (error) {
    console.error('Error marking message as replied:', error);
    throw new Error('Nie udało się oznaczyć wiadomości jako odpowiedzianej');
  }
};

// Usuń wiadomość
export const deleteContactMessage = async (messageId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.CONTACT_MESSAGES, messageId));
  } catch (error) {
    console.error('Error deleting contact message:', error);
    throw new Error('Nie udało się usunąć wiadomości');
  }
};

// Pobierz statystyki wiadomości
export const getContactMessagesStats = async () => {
  try {
    const messages = await getContactMessages();
    const unreadMessages = messages.filter(msg => !msg.isRead);
    const repliedMessages = messages.filter(msg => msg.isReplied);
    
    return {
      total: messages.length,
      unread: unreadMessages.length,
      replied: repliedMessages.length,
      pending: messages.filter(msg => !msg.isReplied).length
    };
  } catch (error) {
    console.error('Error getting contact messages stats:', error);
    throw new Error('Nie udało się pobrać statystyk wiadomości');
  }
};