
import React from 'react';
import { useAuth } from './AuthContext';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, History, Settings, LogOut } from 'lucide-react';

const Navigation: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/change-mess', icon: Settings, label: 'Mess Settings' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-primary">MessRate</h1>
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? 'default' : 'ghost'}
                size="sm"
                onClick={() => navigate(item.path)}
                className="flex items-center gap-2"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
        
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-around mt-3 pt-3 border-t border-gray-200">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={location.pathname === item.path ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1 px-2 py-1 h-auto"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
