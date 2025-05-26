
import React from 'react';
import { useAuth } from '../components/AuthContext';
import Navigation from '../components/Navigation';
import StarRating from '../components/StarRating';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageCircle } from 'lucide-react';

const FeedbackHistory: React.FC = () => {
  const { feedbacks } = useAuth();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'bg-green-100 text-green-800';
    if (rating >= 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback History</h1>
          <p className="text-gray-600">
            View all your previous ratings and comments
          </p>
        </div>

        {feedbacks.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback yet</h3>
              <p className="text-gray-600">
                Start rating your mess food to see your feedback history here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <Card key={feedback.id} className="animate-fade-in hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <CardDescription>
                        {formatDate(feedback.date)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {feedback.messType}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {feedback.caterer}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <StarRating rating={feedback.rating} readonly size="sm" />
                      <Badge className={`text-xs ${getRatingColor(feedback.rating)}`}>
                        {feedback.rating}/5
                      </Badge>
                    </div>
                  </div>
                  
                  {feedback.comment && (
                    <div className="bg-gray-50 rounded-lg p-3 mt-3">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        "{feedback.comment}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {feedbacks.length > 0 && (
          <div className="mt-8 text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Total Feedback: {feedbacks.length}
              </h3>
              <p className="text-gray-600">
                Average Rating: {(feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1)}/5
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackHistory;
