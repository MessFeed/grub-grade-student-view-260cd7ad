import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { directLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    regno: "",
    year: "",
    messType: "",
    caterer: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation - check required fields
    const { name, email, regno, year, messType, caterer } = formData;
    if (!name || !email || !regno || !year || !messType || !caterer) {
      toast({
        title: "Error",
        description: "Please fill all fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate email domain
    if (!email.endsWith("@vitstudent.ac.in")) {
      toast({
        title: "Error",
        description: "Email must end with @vitstudent.ac.in",
        variant: "destructive",
      });
      return;
    }

    // Call directLogin with student data (no password)
    directLogin(formData);

    toast({
      title: "Success",
      description: "Logged in successfully.",
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Student Details Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email (e.g., student@vitstudent.ac.in)"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="regno" className="block text-sm font-medium text-gray-700">
                Registration Number:
              </label>
              <input
                id="regno"
                name="regno"
                type="text"
                required
                className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your registration number"
                value={formData.regno}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700">
                Year:
              </label>
              <select
                id="year"
                name="year"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.yearOfStudy}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="messType" className="block text-sm font-medium text-gray-700">
                Mess Type:
              </label>
              <select
                id="messType"
                name="messType"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.messType}
                onChange={handleChange}
              >
                <option value="">Select Mess Type</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Special">Special</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="caterer" className="block text-sm font-medium text-gray-700">
                Caterer:
              </label>
              <select
                id="caterer"
                name="caterer"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.caterer}
                onChange={handleChange}
              >
                <option value="">Select Caterer</option>
                <option value="Aramark India">Aramark India</option>
                <option value="Sodexo">Sodexo</option>
                <option value="Compass Group">Compass Group</option>
                <option value="Hotel Saravana Bhavan">Hotel Saravana Bhavan</option>
                <option value="A2B - Adyar Ananda Bhavan">A2B - Adyar Ananda Bhavan</option>
                <option value="Cafe Coffee Day">Cafe Coffee Day</option>
                <option value="Domino's Pizza">Domino's Pizza</option>
                <option value="Subway">Subway</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;