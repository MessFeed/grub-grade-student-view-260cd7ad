import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectSeparator } from "@/components/ui/select";

const movieRestaurants = [
  "Gusteau's",
  "Pizza Planet",
  "The Leaky Cauldron",
  "Los Pollos Hermanos",
  "Jack Rabbit Slim's",
];

export function ChangeMessPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-8">
        <h2 className="text-3xl text-muted-foreground font-mono tracking-widest">change mess information</h2>
        <div className="w-full max-w-sm space-y-4">
          <div>
            <Label htmlFor="mess-type" className="text-muted-foreground font-light">Mess Type</Label>
            <Select>
              <SelectTrigger className="bg-transparent border-gray-600">
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
            <Label htmlFor="caterer" className="text-muted-foreground font-light">Caterer Name</Label>
            <Select>
              <SelectTrigger className="bg-transparent border-gray-600">
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
          <Button className="w-full bg-white text-black hover:bg-gray-200">Change</Button>
        </div>
      </div>
    </div>
  );
}