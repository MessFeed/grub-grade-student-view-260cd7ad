import { StarRating } from "@/components/StarRating";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chunk } from 'lodash';

const feedback = [
    { date: "13.06.25", meal: "Dinner", rating: 3, comment: "The curry was a bit too oily, but the naan was perfect." },
    { date: "13.06.25", meal: "Lunch", rating: 5, comment: "Absolutely loved the biryani! Best I've had in a while." },
    { date: "13.06.25", meal: "Breakfast", rating: 4, comment: "Poha was great, but the juice felt a little watered down." },
    { date: "12.06.25", meal: "Dinner", rating: 2, comment: "The pasta was overcooked and the sauce was bland." },
    { date: "12.06.25", meal: "Lunch", rating: 4, comment: "Good thali, everything was fresh and tasty." },
    { date: "12.06.25", meal: "Breakfast", rating: 5, comment: "Fluffy idlis and perfectly spiced sambar. Excellent!" },
    { date: "11.06.25", meal: "Snacks", rating: 4, comment: "Samosas were hot and crispy." },
    { date: "11.06.25", meal: "Dinner", rating: 3, comment: "It was okay, nothing special. Just a regular meal." },
    { date: "11.06.25", meal: "Lunch", rating: 1, comment: "The rice was hard and the dal was cold. Very disappointing." },
    { date: "10.06.25", meal: "Dinner", rating: 4, comment: "Really enjoyed the chili paneer." },
    { date: "10.06.25", meal: "Lunch", rating: 3, comment: "The sandwiches were decent." },
];

const feedbackPages = chunk(feedback, 4);

export function FeedbackHistory() {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const variants = {
    enter: { opacity: 0, y: 50 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const handleWheelScroll = (e: React.WheelEvent) => {
    if (scrollTimeoutRef.current) {
      return;
    }
    if (e.deltaY > 0) {
      setCurrentPage((prev) => Math.min(prev + 1, feedbackPages.length - 1));
    } else if (e.deltaY < 0) {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
    scrollTimeoutRef.current = setTimeout(() => {
      scrollTimeoutRef.current = null;
    }, 500);
  };


  return (
    // Reverted to 'items-center' to vertically center the content block
    <div className="relative h-full flex items-center">
        <div
            className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center space-y-4 cursor-pointer"
            onWheel={handleWheelScroll}
        >
            {feedbackPages.map((_, index) => (
            <button
                key={`dot-${index}`}
                onClick={() => setCurrentPage(index)}
                className={`transition-all duration-300 ease-in-out ${
                currentPage === index
                    ? 'h-4 w-4 bg-white rounded-full shadow-[0_0_25px_rgba(255,255,255,0.5)]'
                    : 'h-2 w-2 bg-muted rounded-full hover:bg-gray-400'
                }`}
            />
            ))}
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {feedbackPages[currentPage].map((item, index) => (
              <div
                key={index}
                className="border border-border rounded-2xl p-6 flex items-center justify-between transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(255,255,255,0.15)] hover:border-gray-600"
              >
                <div>
                  <div className="flex items-baseline space-x-4">
                    <h2 className="text-4xl font-serif">{item.meal}</h2>
                    <p className="text-lg text-muted-foreground font-mono">{item.date}</p>
                  </div>
                  <p className="text-md text-muted-foreground font-light mt-1">{item.comment}</p>
                </div>
                <StarRating rating={item.rating} starSize={28} readonly />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}