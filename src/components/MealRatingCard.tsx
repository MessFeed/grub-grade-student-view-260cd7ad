
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import StarRating from './StarRating';
import { toast } from '@/hooks/use-toast';
import { Send, Clock } from 'lucide-react';

interface MealRatingCardProps {
  mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner';
  isAvailable: boolean;
  availableTime: string;
  onSubmit: (rating: number, comment: string, mealType: string) => void;
  isAlreadyRated: boolean;
}

const MealRatingCard: React.FC<MealRatingCardProps> = ({
  mealType,
  isAvailable,
  availableTime,
  onSubmit,
  isAlreadyRated
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mealIcons = {
    breakfast: '🌅',
    lunch: '☀️',
    snacks: '🍪',
    dinner: '🌙'
  };

  const mealTitles = {
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    snacks: 'Snacks',
    dinner: 'Dinner'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      onSubmit(rating, comment, mealType);
      setRating(0);
      setComment('');
      setIsSubmitting(false);
    }, 1000);
  };

  const getRatingMessage = (rating: number) => {
    switch (rating) {
      case 1: return "Poor - Needs significant improvement";
      case 2: return "Fair - Below expectations";
      case 3: return "Good - Meets basic expectations";
      case 4: return "Very Good - Above expectations";
      case 5: return "Excellent - Outstanding quality";
      default: return "Select a rating";
    }
  };

  if (isAlreadyRated) {
    return (
      <Card className="opacity-75">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{mealIcons[mealType]}</span>
            <CardTitle className="text-lg">{mealTitles[mealType]}</CardTitle>
          </div>
          <CardDescription className="text-green-600 font-medium">
            ✅ Already rated today
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!isAvailable) {
    return (
      <Card className="opacity-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{mealIcons[mealType]}</span>
            <CardTitle className="text-lg">{mealTitles[mealType]}</CardTitle>
          </div>
          <CardDescription className="flex items-center gap-1 text-gray-500">
            <Clock className="w-4 h-4" />
            Available after {availableTime}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{mealIcons[mealType]}</span>
          <CardTitle className="text-lg">{mealTitles[mealType]}</CardTitle>
        </div>
        <CardDescription>Rate today's {mealType}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How would you rate today's {mealType}?
            </label>
            <div className="flex justify-center mb-2">
              <StarRating 
                rating={rating} 
                onRatingChange={setRating}
                size="md"
              />
            </div>
            <p className="text-xs text-gray-600">
              {getRatingMessage(rating)}
            </p>
          </div>

          <div>
            <Textarea
              placeholder={`Comments about ${mealType}...`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
              className="resize-none text-sm"
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting || rating === 0}
            className="w-full text-sm"
            size="sm"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-3 h-3 mr-2" />
                Submit Rating
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MealRatingCard;
