import { useState, useRef } from 'react';
import MealRatingCard from "@/components/MealRatingCard";
import { motion, AnimatePresence } from 'framer-motion';

// Added "Snacks" to the meals array
const meals: ("Breakfast" | "Lunch" | "Snacks" | "Dinner")[] = ["Breakfast", "Lunch", "Snacks", "Dinner"];

export function Dashboard() {
  const [mealIndex, setMealIndex] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  const variants = {
    enter: { opacity: 0, scale: 0.95 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  };

  const handleWheelScroll = (e: React.WheelEvent) => {
    if (scrollTimeoutRef.current) {
      return;
    }

    if (e.deltaY > 0) {
      setMealIndex((prev) => (prev + 1) % meals.length);
    } else if (e.deltaY < 0) {
      setMealIndex((prev) => (prev - 1 + meals.length) % meals.length);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      scrollTimeoutRef.current = null;
    }, 600);
  };


  return (
    // Changed pt-16 to pt-8 to move the card higher
    <div 
      className="flex flex-col items-center justify-start pt-8 h-full"
      onWheel={handleWheelScroll}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={mealIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <MealRatingCard mealType={meals[mealIndex]} />
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-center space-x-3 mt-8">
        {meals.map((_, index) => (
          <button
            key={index}
            onClick={() => setMealIndex(index)}
            className={`transition-all duration-300 ease-in-out rounded-full ${
              mealIndex === index ? 'w-3 h-3 bg-white' : 'w-2 h-2 bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}