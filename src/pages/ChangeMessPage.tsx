
import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Settings, Save, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const caterers = [
  'Aramark',
  'Sodexo',
  'Compass Group',
  'Chartwells',
  'Campus Dining',
  'Local Caterer A',
  'Local Caterer B'
];

const ChangeMessPage: React.FC = () => {
  const { student, updateMessInfo } = useAuth();
  const [messType, setMessType] = useState(student?.messType || '');
  const [caterer, setCaterer] = useState(student?.caterer || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messType || !caterer) {
      toast({
        title: "Missing Information",
        description: "Please select both mess type and caterer.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      updateMessInfo(messType, caterer);
      
      toast({
        title: "Settings Updated!",
        description: "Your mess preferences have been updated successfully.",
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  const hasChanges = messType !== student?.messType || caterer !== student?.caterer;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mess Settings</h1>
          <p className="text-gray-600">
            Update your mess type and caterer preferences
          </p>
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-primary" />
              <CardTitle>Current Mess Information</CardTitle>
            </div>
            <CardDescription>
              Change your mess type and caterer. This will affect future feedback submissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  After updating your mess settings, you'll only be able to provide feedback for the new mess type and caterer.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="messType">Mess Type</Label>
                  <Select value={messType} onValueChange={setMessType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mess type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Veg">Vegetarian</SelectItem>
                      <SelectItem value="Non-Veg">Non-Vegetarian</SelectItem>
                      <SelectItem value="Special">Special Diet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="caterer">Caterer</Label>
                  <Select value={caterer} onValueChange={setCaterer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select caterer" />
                    </SelectTrigger>
                    <SelectContent>
                      {caterers.map((catererOption) => (
                        <SelectItem key={catererOption} value={catererOption}>
                          {catererOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Current vs New Comparison */}
              {hasChanges && (
                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                  <h4 className="font-medium text-blue-900">Changes Preview:</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mess Type:</span>
                      <span>
                        <span className="line-through text-gray-400">{student?.messType}</span>
                        {' → '}
                        <span className="text-blue-600 font-medium">{messType}</span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Caterer:</span>
                      <span>
                        <span className="line-through text-gray-400">{student?.caterer}</span>
                        {' → '}
                        <span className="text-blue-600 font-medium">{caterer}</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isSubmitting || !hasChanges}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {hasChanges ? 'Save Changes' : 'No Changes to Save'}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-orange-900 mb-1">Important Note</h4>
                <p className="text-sm text-orange-800">
                  Changing your mess settings will only affect future feedback submissions. 
                  Your previous feedback history will remain unchanged and associated with 
                  your previous mess configuration.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChangeMessPage;
