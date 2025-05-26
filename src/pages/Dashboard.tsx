
import React from 'react';
import { useAuth } from '../components/AuthContext';
import Navigation from '../components/Navigation';
import MealRatingCard from '../components/MealRatingCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { UtensilsCrossed } from 'lucide-react';

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
      case 'breakfast':
        return hour >= 7;
      case 'lunch':
        return hour >= 12;
      case 'snacks':
        return hour >= 17; // 5 PM
      case 'dinner':
        return hour >= 19; // 7 PM
      default:
        return false;
    }
  };

  const getMealAvailableTime = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner') => {
    switch (mealType) {
      case 'breakfast':
        return '7:00 AM';
      case 'lunch':
        return '12:00 PM';
      case 'snacks':
        return '5:00 PM';
      case 'dinner':
        return '7:00 PM';
      default:
        return '';
    }
  };

  const isMealAlreadyRated = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner') => {
    return todaysFeedback.some(feedback => feedback.mealType === mealType);
  };

  const handleMealFeedback = (rating: number, comment: string, mealType: string) => {
    addFeedback({
      rating,
      comment,
      messType: student!.messType,
      caterer: student!.caterer,
      mealType: mealType as 'breakfast' | 'lunch' | 'snacks' | 'dinner',
    });

    toast({
      title: "Feedback Submitted!",
      description: `Thank you for rating today's ${mealType}. It helps improve our mess service.`,
    });
  };

  const meals: Array<'breakfast' | 'lunch' | 'snacks' | 'dinner'> = ['breakfast', 'lunch', 'snacks', 'dinner'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">
              Welcome back, {student?.name}!
            </CardTitle>
            <CardDescription className="text-blue-100">
              Current Mess: {student?.messType} • Caterer: {student?.caterer}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Meal Ratings Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-6 h-6 text-primary" />
              <CardTitle>Rate Today's Meals</CardTitle>
            </div>
            <CardDescription>
              Rate each meal from your {student?.messType} mess by {student?.caterer}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {meals.map((mealType) => (
                <MealRatingCard
                  key={mealType}
                  mealType={mealType}
                  isAvailable={isMealAvailable(mealType)}
                  availableTime={getMealAvailableTime(mealType)}
                  onSubmit={handleMealFeedback}
                  isAlreadyRated={isMealAlreadyRated(mealType)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">
                {student?.yearOfStudy}
              </div>
              <p className="text-sm text-gray-600">Year of Study</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">
                {student?.messType}
              </div>
              <p className="text-sm text-gray-600">Mess Type</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {todaysFeedback.length}/4
              </div>
              <p className="text-sm text-gray-600">Meals Rated Today</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
