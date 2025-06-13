import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage } from "./pages/LoginPage";
import { FeedbackHistory } from "./pages/FeedbackHistory";
import { ChangeMessPage } from "./pages/ChangeMessPage";
import  NotFound  from "./pages/NotFound";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { Sidebar } from "./components/ui/sidebar";
import { SignInPage } from "./pages/SignInPage";
import { Button } from "./components/ui/button";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="fixed top-0 left-0 w-full p-8 z-10 bg-background">
        <div className="flex items-center justify-between">
            <div className="flex items-baseline">
                <h1 className="text-6xl font-bold">John Doe</h1>
                <p className="text-2xl text-muted-foreground font-mono ml-6">23BAI1291</p>
            </div>
            {/* Changed Sign Out button to match the Sign In button style */}
            <Button onClick={handleSignOut} className="bg-white text-black hover:bg-gray-200 text-base py-2 px-4 h-auto">Sign Out</Button>
        </div>
        <div className="flex items-center space-x-3 mt-2">
          <span
            className="h-4 w-4 bg-green-500 rounded-full border-2 border-green-300"
            title="Vegetarian Mess"
          ></span>
          <p className="font-mono text-lg text-muted-foreground">Gusteaus's Mess</p>
        </div>
      </header>

      <Sidebar />

      <main className="ml-64 pt-48 px-8 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Removed the Framer Motion page transition wrappers (motion.div, AnimatePresence) 
          to allow component-level animations like the sidebar to work correctly.
        */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/history" element={<MainLayout><FeedbackHistory /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><ChangeMessPage /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;