import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "./StarRating";

type MealRatingCardProps = {
  mealType: "Breakfast" | "Lunch" | "Snacks" | "Dinner";
};

export default function MealRatingCard({ mealType }: MealRatingCardProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <div className="border border-border rounded-2xl p-8 w-full max-w-2xl mx-auto flex flex-col items-center space-y-8 min-h-[500px] justify-center">
        <h2 className="text-6xl font-serif">{mealType}</h2>
        
        <div className="text-center">
            {/* Changed font to Courier using font-mono */}
            <p className="text-xl font-light text-muted-foreground mb-3 tracking-widest font-mono">rate your meal</p>
            <StarRating rating={rating} onRatingChange={setRating} starSize={48} />
        </div>
        
        <div className="text-center w-full max-w-md">
            {/* Changed font to Courier using font-mono */}
            <p className="text-xl font-light text-muted-foreground mb-3 tracking-widest font-mono">feedback</p>
            <Textarea
              placeholder="Tell us about your experience"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-transparent border-border rounded-lg text-center h-28 text-base"
            />
        </div>
    </div>
  );
}