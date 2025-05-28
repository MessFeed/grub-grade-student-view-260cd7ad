import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    where,
    query
  } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// 🔥 Replace this with your actual Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// ---------------------
// 🔷 Type Definitions
// ---------------------
export type Student = {
  id?: string;
  name: string;
  email: string;
  course: string;
};

export type Feedback = {
  id?: string;
  userId: string;
  message: string;
  date: string;
};

// --------------------------
// 📘 Student Service
// --------------------------
export const studentService = {
  async addStudent(student: Student) {
    const docRef = await addDoc(collection(db, 'students'), student);
    return { id: docRef.id, ...student };
  },

  async getAllStudents(): Promise<Student[]> {
    const snapshot = await getDocs(collection(db, 'students'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student));
  },

  async getStudentById(id: string): Promise<Student | null> {
    const docRef = doc(db, 'students', id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as Student;
  },

  // **NEW** method to get student by email
  async getStudentByEmail(email: string): Promise<Student | null> {
    try {
      const studentsRef = collection(db, 'students');
      const q = query(studentsRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as Student;
      }
      return null;
    } catch (error) {
      console.error('Error getting student by email:', error);
      throw error;
    }
  },

  async updateStudent(id: string, data: Partial<Student>) {
    const docRef = doc(db, 'students', id);
    await updateDoc(docRef, data);
  },

  async deleteStudent(id: string) {
    const docRef = doc(db, 'students', id);
    await deleteDoc(docRef);
  },
};

// --------------------------
// 💬 Feedback Service
// --------------------------
export const feedbackService = {
  async addFeedback(feedback: Feedback) {
    const docRef = await addDoc(collection(db, 'feedbacks'), feedback);
    return { id: docRef.id, ...feedback };
  },

  async getAllFeedback(): Promise<Feedback[]> {
    const snapshot = await getDocs(collection(db, 'feedbacks'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Feedback));
  },

  // **NEW** method to get all feedback by a specific userId (student email)
  async getAllFeedbackByStudent(userId: string): Promise<Feedback[]> {
    try {
      const feedbacksRef = collection(db, 'feedbacks');
      const q = query(feedbacksRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as Feedback));
    } catch (error) {
      console.error('Error getting feedback by student:', error);
      throw error;
    }
  }
};

// --------------------------
// ⚙️ Utility Functions
// --------------------------
export const utils = {
    getCurrentUserId(): string | null {
      return auth.currentUser?.uid || null;
    },
  
    getTodayDate(): string {
      const today = new Date();
      return today.toISOString().split('T')[0]; // Returns date in YYYY-MM-DD format
    }
  };
