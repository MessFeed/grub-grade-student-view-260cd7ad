import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";

export function SignInPage() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 relative overflow-hidden">
      <div className="absolute top-16 left-24">
        <h1 className="text-8xl font-bold">GrubGrade</h1>
        <p className="text-4xl text-muted-foreground mt-2">rate your plate.</p>
      </div>

      <div className="absolute top-16 right-24">
        <Button className="bg-white text-black hover:bg-gray-200 text-base py-2 px-4 h-auto" asChild>
          <Link to="/">Create Account</Link>
        </Button>
      </div>

      <div className="absolute bottom-16 right-24 w-full max-w-md">
        <div className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-lg">Email</Label>
            <Input id="email" type="email" placeholder="john.doe@example.com" className="bg-transparent border-gray-600 h-12 text-lg mt-2" />
          </div>
          <div>
            <Label htmlFor="password" className="text-lg">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" className="bg-transparent border-gray-600 h-12 text-lg mt-2" />
          </div>
          <Button onClick={handleSignIn} className="w-full bg-white text-black hover:bg-gray-200 mt-4 h-12 text-lg">Sign In</Button>
        </div>
      </div>
    </div>
  );
}