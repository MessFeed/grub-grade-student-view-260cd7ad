import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
}

interface Feedback {
  id: string;
  userId: string;
  message: string;
  rating: number;
  date: string;
}

interface AuthContextType {
  student: Student | null;
  isLoading: boolean;
  directLogin: (studentData: Omit<Student, 'id'>) => Promise<void>;
  logout: () => void;
  addFeedback: (feedbackData: Omit<Feedback, 'id' | 'date' | 'userId'>) => void;
  getTodaysFeedback: () => Feedback[];
  getAllFeedback: () => Feedback[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  // Mock login function
  const directLogin = async (studentData: Omit<Student, 'id'>) => {
    try {
      setIsLoading(true);
      // Create a mock student
      const mockStudent = {
        ...studentData,
        id: 'mock-user-123',
      };
      
      setStudent(mockStudent);
      
      // Initialize with some mock feedback
      setFeedbacks([
        {
          id: 'feedback-1',
          userId: mockStudent.email,
          message: 'Great food today!',
          rating: 5,
          date: new Date().toISOString().split('T')[0],
        },
      ]);
      
      toast({
        title: 'Login Successful',
        description: `Welcome ${studentData.name}!`,
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login Failed',
        description: 'There was an error logging you in.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setStudent(null);
    setFeedbacks([]);
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  const addFeedback = (feedbackData: Omit<Feedback, 'id' | 'date' | 'userId'>) => {
    if (!student) return;
    
    const newFeedback: Feedback = {
      ...feedbackData,
      id: `feedback-${Date.now()}`,
      userId: student.email,
      date: new Date().toISOString().split('T')[0],
    };
    
    setFeedbacks(prev => [newFeedback, ...prev]);
    
    toast({
      title: 'Feedback Submitted',
      description: 'Thank you for your feedback!',
    });
  };

  const getTodaysFeedback = (): Feedback[] => {
    if (!student) return [];
    const today = new Date().toISOString().split('T')[0];
    return feedbacks.filter(fb => fb.date === today && fb.userId === student.email);
  };

  const getAllFeedback = (): Feedback[] => {
    if (!student) return [];
    return feedbacks.filter(fb => fb.userId === student.email);
  };

  const value = {
    student,
    isLoading,
    directLogin,
    logout,
    addFeedback,
    getTodaysFeedback,
    getAllFeedback,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
