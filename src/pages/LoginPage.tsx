import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectSeparator } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const movieRestaurants = [
  "Gusteau's",
  "Pizza Planet",
  "The Leaky Cauldron",
  "Los Pollos Hermanos",
  "Jack Rabbit Slim's",
];

export function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleFinalSubmit = () => {
    navigate("/dashboard");
  };

  const formVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 relative overflow-hidden">
      <div className="absolute top-16 left-24">
        <h1 className="text-8xl font-bold">GrubGrade</h1>
        <p className="text-4xl text-muted-foreground mt-2">rate your plate.</p>
      </div>

      <div className="absolute top-16 right-24">
        <Button className="bg-white text-black hover:bg-gray-200 text-base py-2 px-4 h-auto" asChild>
          <Link to="/signin">Sign In</Link>
        </Button>
      </div>

      <div className="absolute bottom-16 right-24 w-full max-w-md">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={formVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <Label htmlFor="name" className="text-lg">Name</Label>
                <Input id="name" placeholder="John Doe" className="bg-transparent border-gray-600 h-12 text-lg mt-2" />
              </div>
              <div>
                <Label htmlFor="email" className="text-lg">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" className="bg-transparent border-gray-600 h-12 text-lg mt-2" />
              </div>
              <div>
                <Label htmlFor="password" className="text-lg">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" className="bg-transparent border-gray-600 h-12 text-lg mt-2" />
              </div>
              <Button onClick={() => setStep(2)} className="w-full bg-white text-black hover:bg-gray-200 mt-4 h-12 text-lg">Get Started</Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={formVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <Label htmlFor="reg-no" className="text-lg">Registration Number</Label>
                <Input id="reg-no" placeholder="23BAI1291" className="bg-transparent border-gray-600 h-12 text-lg mt-2" />
              </div>
              <div>
                <Label htmlFor="mess-type" className="text-lg">Mess Type</Label>
                <Select>
                  <SelectTrigger className="bg-transparent border-gray-600 h-12 text-lg mt-2">
                    <SelectValue placeholder="Select Mess Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border border-border">
                    <SelectItem value="veg">Vegetarian</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="special">Special</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="caterer" className="text-lg">Caterer Name</Label>
                <Select>
                  <SelectTrigger className="bg-transparent border-gray-600 h-12 text-lg mt-2">
                    <SelectValue placeholder="Select Caterer" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border border-border">
                    {movieRestaurants.map((name, index) => (
                      <React.Fragment key={name}>
                        <SelectItem value={name.toLowerCase().replace(/[' ]/g, '-')}>{name}</SelectItem>
                        {index < movieRestaurants.length - 1 && <SelectSeparator />}
                      </React.Fragment>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleFinalSubmit} className="w-full bg-white text-black hover:bg-gray-200 mt-4 h-12 text-lg">Create Account</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 