import { User, LogOut, Activity, Brain, MessageCircle, Heart } from 'lucide-react';
import { authService } from '../utils/auth';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  user: any;
}

export default function Navigation({ currentView, onViewChange, user }: NavigationProps) {
  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'analysis', label: 'AI Analysis', icon: Brain },
    { id: 'lifestyle', label: 'Lifestyle Advisor', icon: Heart },
    { id: 'chat', label: 'Medical Chat', icon: MessageCircle },
  ];

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Brain className="h-8 w-8 text-blue-400 mr-3 animate-pulse" />
              <span className="text-xl font-bold text-white">PancreaScan</span>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentView === item.id
                      ? 'text-blue-400 bg-blue-900/50'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-300">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-red-400 hover:bg-red-900/50 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}