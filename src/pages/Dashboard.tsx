import React from 'react';
import { useAuth } from '../components/AuthContext';
import Navigation from '../components/Navigation';
import MealRatingCard from '../components/MealRatingCard';
import { toast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const { student, addFeedback, getTodaysFeedback } = useAuth();
  const todaysFeedback = getTodaysFeedback();

  const getCurrentTime = () => {
    const now = new Date();
    return {
      hour: now.getHours(),
      minute: now.getMinutes()
    };
  };

  const isMealAvailable = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner') => {
    const { hour } = getCurrentTime();
    switch (mealType) {
      case 'breakfast': return hour >= 7;
      case 'lunch': return hour >= 12;
      case 'snacks': return hour >= 17;
      case 'dinner': return hour >= 19;
      default: return false;
    }
  };

  const isMealAlreadyRated = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner') => {
    return todaysFeedback.some(fb => fb.mealType === mealType);
  };

  const handleMealFeedback = (rating: number, comment: string, mealType: string) => {
    if (!student) return;
    addFeedback({
      rating,
      comment,
      messType: student.messType,
      caterer: student.caterer,
      mealType: mealType as 'breakfast' | 'lunch' | 'snacks' | 'dinner',
    });
    toast({
      title: "Feedback Submitted!",
      description: `Thanks for rating your ${mealType}!`,
    });
  };

  const meals: Array<'breakfast' | 'lunch' | 'snacks' | 'dinner'> = ['breakfast', 'lunch', 'snacks', 'dinner'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {meals.map(meal => (
          <MealRatingCard
            key={meal}
            mealType={meal}
            disabled={!isMealAvailable(meal) || isMealAlreadyRated(meal)}
            onSubmit={(rating, comment) => handleMealFeedback(rating, comment, meal)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
