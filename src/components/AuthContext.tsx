
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Student {
  name: string;
  email: string;
  registrationNumber: string;
  yearOfStudy: string;
  messType: string;
  caterer: string;
}

interface Feedback {
  id: string;
  rating: number;
  comment: string;
  messType: string;
  caterer: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner';
}

interface AuthContextType {
  student: Student | null;
  feedbacks: Feedback[];
  login: (student: Student) => void;
  logout: () => void;
  addFeedback: (feedback: Omit<Feedback, 'id' | 'date'>) => void;
  updateMessInfo: (messType: string, caterer: string) => void;
  getTodaysFeedback: () => Feedback[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const savedStudent = localStorage.getItem('student');
    const savedFeedbacks = localStorage.getItem('feedbacks');
    
    if (savedStudent) {
      setStudent(JSON.parse(savedStudent));
    }
    if (savedFeedbacks) {
      setFeedbacks(JSON.parse(savedFeedbacks));
    }
  }, []);

  const login = (studentData: Student) => {
    setStudent(studentData);
    localStorage.setItem('student', JSON.stringify(studentData));
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem('student');
  };

  const addFeedback = (feedback: Omit<Feedback, 'id' | 'date'>) => {
    const newFeedback: Feedback = {
      ...feedback,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    
    const updatedFeedbacks = [newFeedback, ...feedbacks];
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
  };

  const updateMessInfo = (messType: string, caterer: string) => {
    if (student) {
      const updatedStudent = { ...student, messType, caterer };
      setStudent(updatedStudent);
      localStorage.setItem('student', JSON.stringify(updatedStudent));
    }
  };

  const getTodaysFeedback = () => {
    const today = new Date().toDateString();
    return feedbacks.filter(feedback => 
      new Date(feedback.date).toDateString() === today
    );
  };

  return (
    <AuthContext.Provider value={{
      student,
      feedbacks,
      login,
      logout,
      addFeedback,
      updateMessInfo,
      getTodaysFeedback,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
