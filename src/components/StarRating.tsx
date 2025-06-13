import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  starSize?: number;
}

export function StarRating({ 
  rating, 
  onRatingChange, 
  readonly = false,
  starSize = 24
}: StarRatingProps) {

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onRatingChange && onRatingChange(star)}
          className={`transition-all duration-200 ${
            readonly ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          <Star
            size={starSize}
            className={`transition-colors duration-200 ${
              star <= rating
                ? 'text-white'
                : 'text-muted-foreground'
            }`}
            fill="transparent" // Always transparent for an outlined look
            strokeWidth={1}
          />
        </button>
      ))}
    </div>
  );
}