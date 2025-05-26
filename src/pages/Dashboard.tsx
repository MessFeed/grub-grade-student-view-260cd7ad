
import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import Navigation from '../components/Navigation';
import StarRating from '../components/StarRating';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { UtensilsCrossed, Send } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { student, addFeedback } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
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
      addFeedback({
        rating,
        comment,
        messType: student!.messType,
        caterer: student!.caterer,
      });

      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your feedback. It helps improve our mess service.",
      });

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

        {/* Feedback Form */}
        <Card className="animate-slide-up">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-6 h-6 text-primary" />
              <CardTitle>Rate Today's Food</CardTitle>
            </div>
            <CardDescription>
              Share your experience with the {student?.messType} mess food from {student?.caterer}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitFeedback} className="space-y-6">
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How would you rate today's food?
                </label>
                <div className="flex justify-center mb-2">
                  <StarRating 
                    rating={rating} 
                    onRatingChange={setRating}
                    size="lg"
                  />
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {getRatingMessage(rating)}
                </p>
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments (Optional)
                </label>
                <Textarea
                  id="comment"
                  placeholder="Share your thoughts about the food quality, taste, variety, service, etc..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting || rating === 0}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </form>
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
                Active
              </div>
              <p className="text-sm text-gray-600">Status</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
