import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ChefHat } from 'lucide-react';

const caterers = [
  'Aramark',
  'Sodexo',
  'Compass Group',
  'Chartwells',
  'Campus Dining',
  'Local Caterer A',
  'Local Caterer B'
];

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    registrationNumber: '',
    yearOfStudy: '',
    messType: '',
    caterer: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateRegistrationNumber = (regNo: string): boolean => {
    const pattern = /^\d{2}[A-Z]{3}\d{4}$/;
    return pattern.test(regNo);
  };

  const validateEmail = (email: string): boolean => {
    const pattern = /^[a-zA-Z]+\.[a-zA-Z]+\d{4}@vitstudent\.ac\.in$/;
    return pattern.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid VIT student email (firstname.lastname2023@vitstudent.ac.in)';
    }

    if (!validateRegistrationNumber(formData.registrationNumber)) {
      newErrors.registrationNumber = 'Registration number must be in format: 12ABC3456';
    }

    if (!formData.yearOfStudy) {
      newErrors.yearOfStudy = 'Year of study is required';
    }

    if (!formData.messType) {
      newErrors.messType = 'Mess type is required';
    }

    if (!formData.caterer) {
      newErrors.caterer = 'Caterer selection is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      login(formData);
      toast({
        title: "Welcome!",
        description: `Successfully logged in as ${formData.name}`,
      });
      navigate('/dashboard');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-fade-in shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">MessRate</CardTitle>
          <CardDescription className="text-gray-600">
            Rate your hostel mess food experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="email">VIT Student Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="firstname.lastname2023@vitstudent.ac.in"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                type="text"
                placeholder="12ABC3456"
                value={formData.registrationNumber}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value.toUpperCase())}
                className={errors.registrationNumber ? 'border-red-500' : ''}
              />
              {errors.registrationNumber && <p className="text-red-500 text-sm mt-1">{errors.registrationNumber}</p>}
            </div>

            <div>
              <Label htmlFor="yearOfStudy">Year of Study</Label>
              <Select onValueChange={(value) => handleInputChange('yearOfStudy', value)}>
                <SelectTrigger className={errors.yearOfStudy ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st Year">1st Year</SelectItem>
                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                  <SelectItem value="3rd Year">3rd Year</SelectItem>
                  <SelectItem value="4th Year">4th Year</SelectItem>
                  <SelectItem value="5th Year">5th Year</SelectItem>
                </SelectContent>
              </Select>
              {errors.yearOfStudy && <p className="text-red-500 text-sm mt-1">{errors.yearOfStudy}</p>}
            </div>

            <div>
              <Label htmlFor="messType">Mess Type</Label>
              <Select onValueChange={(value) => handleInputChange('messType', value)}>
                <SelectTrigger className={errors.messType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select mess type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Veg">Vegetarian</SelectItem>
                  <SelectItem value="Non-Veg">Non-Vegetarian</SelectItem>
                  <SelectItem value="Special">Special Diet</SelectItem>
                </SelectContent>
              </Select>
              {errors.messType && <p className="text-red-500 text-sm mt-1">{errors.messType}</p>}
            </div>

            <div>
              <Label htmlFor="caterer">Current Caterer</Label>
              <Select onValueChange={(value) => handleInputChange('caterer', value)}>
                <SelectTrigger className={errors.caterer ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select caterer" />
                </SelectTrigger>
                <SelectContent>
                  {caterers.map((caterer) => (
                    <SelectItem key={caterer} value={caterer}>
                      {caterer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.caterer && <p className="text-red-500 text-sm mt-1">{errors.caterer}</p>}
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
