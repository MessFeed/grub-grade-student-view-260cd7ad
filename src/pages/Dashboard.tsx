import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import Navigation from '../components/Navigation';
import { toast } from '@/hooks/use-toast';
import { Clock, Coffee, Sun, Cookie, Moon, CheckCircle2, Lock, Star, Send, MessageSquare } from 'lucide-react';

// Integrated MealRatingCard Component
interface MealRatingCardProps {
  mealType: string;
  disabled: boolean;
  onSubmit: (rating: number, comment: string) => void;
}

const MealRatingCard: React.FC<MealRatingCardProps> = ({ mealType, disabled, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating before submitting!');
      return;
    }

    setIsSubmitting(true);
    try {
      onSubmit(rating, comment);
      // Reset form after successful submission
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Rate this meal';
    }
  };

  const getRatingColor = (stars: number) => {
    switch (stars) {
      case 1: return 'text-red-500';
      case 2: return 'text-orange-500';
      case 3: return 'text-yellow-500';
      case 4: return 'text-blue-500';
      case 5: return 'text-green-500';
      default: return 'text-gray-400';
    }
  };

  if (disabled) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200 opacity-60">
        <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
          <Lock className="w-5 h-5" />
          <span className="font-medium">
            {mealType === 'breakfast' && 'Available after 7:00 AM'}
            {mealType === 'lunch' && 'Available after 12:00 PM'}
            {mealType === 'snacks' && 'Available after 5:00 PM'}
            {mealType === 'dinner' && 'Available after 7:00 PM'}
          </span>
        </div>
        <div className="flex justify-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-8 h-8 text-gray-300 cursor-not-allowed"
              fill="currentColor"
            />
          ))}
        </div>
        <div className="bg-gray-100 rounded-lg p-3 text-center text-gray-500">
          Rating will be available at the appropriate time
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      {/* Rating Section */}
      <div className="mb-6">
        <div className="text-center mb-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            How was your {mealType}?
          </h4>
          <p className={`text-sm font-medium ${getRatingColor(hoverRating || rating)}`}>
            {getRatingText(hoverRating || rating)}
          </p>
        </div>

        {/* Star Rating */}
        <div className="flex justify-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1 transition-transform duration-150 hover:scale-110"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              disabled={isSubmitting}
            >
              <Star
                className={`w-8 h-8 transition-colors duration-150 ${
                  star <= (hoverRating || rating)
                    ? 'text-yellow-400 hover:text-yellow-500'
                    : 'text-gray-300 hover:text-gray-400'
                }`}
                fill={star <= (hoverRating || rating) ? 'currentColor' : 'none'}
              />
            </button>
          ))}
        </div>

        {/* Rating Summary */}
        {rating > 0 && (
          <div className="text-center">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              rating >= 4 ? 'bg-green-100 text-green-700' :
              rating >= 3 ? 'bg-yellow-100 text-yellow-700' :
              rating >= 2 ? 'bg-orange-100 text-orange-700' :
              'bg-red-100 text-red-700'
            }`}>
              {rating} out of 5 stars
            </span>
          </div>
        )}
      </div>

      {/* Comment Section */}
      <div className="mb-6">
        <label htmlFor={`comment-${mealType}`} className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <MessageSquare className="w-4 h-4" />
          Share your feedback (optional)
        </label>
        <textarea
          id={`comment-${mealType}`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={`Tell us about your ${mealType} experience...`}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors duration-150"
          rows={3}
          disabled={isSubmitting}
          maxLength={500}
        />
        <div className="text-right text-xs text-gray-500 mt-1">
          {comment.length}/500 characters
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={rating === 0 || isSubmitting}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
          rating === 0 || isSubmitting
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Feedback
          </>
        )}
      </button>

      {/* Quick Tips */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          💡 <strong>Quick tip:</strong> Your honest feedback helps improve meal quality for everyone!
        </p>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const { student, addFeedback, getTodaysFeedback } = useAuth();
  const todaysFeedback = getTodaysFeedback();

  const getCurrentTime = () => {
    const now = new Date();
    return {
      hour: now.getHours(),
      minute: now.getMinutes(),
      time: now.toLocaleTimeString()
    };
  };

  const isMealAvailable = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner') => {
    const { hour } = getCurrentTime();
    switch (mealType) {
      case 'breakfast': return hour >= 7;
      case 'lunch': return hour >= 12;
      case 'snacks': return hour >= 17; // 5 PM
      case 'dinner': return hour >= 19; // 7 PM
      default: return false;
    }
  };

  // Debug information (you can remove this later)
  const currentTime = getCurrentTime();
  console.log('Current time:', currentTime.time, 'Hour:', currentTime.hour);

  const isMealAlreadyRated = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner') => {
    return todaysFeedback.some(fb => fb.mealType === mealType);
  };

  const getMealIcon = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner') => {
    switch (mealType) {
      case 'breakfast': return Coffee;
      case 'lunch': return Sun;
      case 'snacks': return Cookie;
      case 'dinner': return Moon;
    }
  };

  const getMealTime = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner') => {
    switch (mealType) {
      case 'breakfast': return '7:00 AM onwards';
      case 'lunch': return '12:00 PM onwards';
      case 'snacks': return '5:00 PM onwards';
      case 'dinner': return '7:00 PM onwards';
    }
  };

  const getMealStatus = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner') => {
    if (isMealAlreadyRated(mealType)) {
      return { status: 'completed', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
    } else if (isMealAvailable(mealType)) {
      return { status: 'available', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' };
    } else {
      return { status: 'locked', color: 'text-gray-400', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' };
    }
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
      title: "Feedback Submitted! 🎉",
      description: `Thanks for rating your ${mealType}!`,
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const meals: Array<'breakfast' | 'lunch' | 'snacks' | 'dinner'> = ['breakfast', 'lunch', 'snacks', 'dinner'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {student?.name || 'Student'}! 👋
          </h1>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            {getCurrentDate()} • {currentTime.time}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Feedback</p>
                <p className="text-2xl font-bold text-gray-800">{todaysFeedback.length}/4</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Coffee className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Mess Type</p>
                <p className="text-lg font-semibold text-gray-800 capitalize">{student?.messType || 'N/A'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Sun className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Caterer</p>
                <p className="text-lg font-semibold text-gray-800">{student?.caterer || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Meal Cards */}
        <div className="space-y-6">
          {meals.map(meal => {
            const Icon = getMealIcon(meal);
            const status = getMealStatus(meal);
            
            return (
              <div 
                key={meal} 
                className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${status.borderColor} ${status.bgColor}`}
              >
                {/* Status Indicator */}
                <div className="absolute top-4 right-4 z-10">
                  {status.status === 'completed' && (
                    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      Completed
                    </div>
                  )}
                  {status.status === 'locked' && (
                    <div className="flex items-center gap-2 bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm font-medium">
                      <Lock className="w-4 h-4" />
                      Locked
                    </div>
                  )}
                  {status.status === 'available' && (
                    <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      Available Now
                    </div>
                  )}
                </div>

                {/* Meal Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`p-3 rounded-xl ${status.color === 'text-gray-400' ? 'bg-gray-100' : 'bg-white'} shadow-sm`}>
                      <Icon className={`w-6 h-6 ${status.color}`} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold capitalize ${status.color === 'text-gray-400' ? 'text-gray-400' : 'text-gray-800'}`}>
                        {meal}
                      </h3>
                      <p className={`text-sm ${status.color === 'text-gray-400' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Available {getMealTime(meal)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Meal Rating Card */}
                <div className="px-6 pb-6">
                  <MealRatingCard
                    mealType={meal}
                    disabled={!isMealAvailable(meal) || isMealAlreadyRated(meal)}
                    onSubmit={(rating, comment) => handleMealFeedback(rating, comment, meal)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Message */}
        {todaysFeedback.length === 4 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full font-medium">
              <CheckCircle2 className="w-5 h-5" />
              Great job! You've completed all feedback for today! 🎉
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;