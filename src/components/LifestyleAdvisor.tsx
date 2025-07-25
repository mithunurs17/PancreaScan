import React, { useState, useEffect } from 'react';
import { Heart, Activity, Utensils, Brain, CheckCircle, Star, Calendar } from 'lucide-react';
import type { User, LifestyleRecommendation } from '../types';

interface LifestyleAdvisorProps {
  user: User;
}

export default function LifestyleAdvisor({ user }: LifestyleAdvisorProps) {
  const [recommendations, setRecommendations] = useState<LifestyleRecommendation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [completedToday, setCompletedToday] = useState<string[]>([]);

  useEffect(() => {
    generatePersonalizedRecommendations();
  }, [user]);

  const generatePersonalizedRecommendations = () => {
    const baseRecommendations: LifestyleRecommendation[] = [
      // Diet recommendations
      {
        id: '1',
        category: 'diet',
        title: 'Anti-inflammatory Breakfast',
        description: 'Start your day with berries, nuts, and whole grains. Rich in antioxidants that may help reduce cancer risk.',
        priority: 'high'
      },
      {
        id: '2',
        category: 'diet',
        title: 'Limit Processed Foods',
        description: 'Reduce consumption of processed meats and refined sugars. Focus on fresh, whole foods.',
        priority: 'high'
      },
      {
        id: '3',
        category: 'diet',
        title: 'Increase Fiber Intake',
        description: 'Include vegetables, legumes, and fruits. Aim for 25-30g of fiber daily for digestive health.',
        priority: 'medium'
      },
      {
        id: '4',
        category: 'diet',
        title: 'Green Tea Benefits',
        description: 'Drink 2-3 cups of green tea daily. Contains catechins with potential anti-cancer properties.',
        priority: 'medium'
      },

      // Exercise recommendations
      {
        id: '5',
        category: 'exercise',
        title: 'Daily Walking',
        description: 'Take a 30-minute brisk walk daily. Regular exercise helps maintain healthy weight and reduces cancer risk.',
        priority: 'high'
      },
      {
        id: '6',
        category: 'exercise',
        title: 'Strength Training',
        description: 'Include resistance exercises 2-3 times per week to maintain muscle mass and bone density.',
        priority: 'medium'
      },
      {
        id: '7',
        category: 'exercise',
        title: 'Flexibility & Balance',
        description: 'Practice yoga or tai chi to improve flexibility, balance, and reduce stress levels.',
        priority: 'medium'
      },

      // Monitoring recommendations
      {
        id: '8',
        category: 'monitoring',
        title: 'Regular Check-ups',
        description: 'Schedule annual health screenings and maintain regular communication with your healthcare provider.',
        priority: 'high'
      },
      {
        id: '9',
        category: 'monitoring',
        title: 'Blood Sugar Monitoring',
        description: 'Monitor blood glucose levels if you have diabetes. High blood sugar may increase pancreatic cancer risk.',
        priority: 'high'
      },
      {
        id: '10',
        category: 'monitoring',
        title: 'Weight Management',
        description: 'Maintain a healthy BMI (18.5-24.9). Obesity is a risk factor for pancreatic cancer.',
        priority: 'medium'
      },

      // Stress management
      {
        id: '11',
        category: 'stress',
        title: 'Meditation Practice',
        description: 'Practice mindfulness meditation for 10-15 minutes daily to reduce stress and improve mental health.',
        priority: 'medium'
      },
      {
        id: '12',
        category: 'stress',
        title: 'Quality Sleep',
        description: 'Aim for 7-9 hours of quality sleep nightly. Poor sleep affects immune function and healing.',
        priority: 'high'
      },
      {
        id: '13',
        category: 'stress',
        title: 'Social Connections',
        description: 'Maintain strong social relationships and consider joining support groups for emotional wellbeing.',
        priority: 'medium'
      },
      {
        id: '14',
        category: 'stress',
        title: 'Limit Alcohol',
        description: 'Limit alcohol consumption to reduce pancreatic cancer risk. Consider elimination if possible.',
        priority: 'high'
      }
    ];

    setRecommendations(baseRecommendations);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'diet':
        return <Utensils className="h-5 w-5" />;
      case 'exercise':
        return <Activity className="h-5 w-5" />;
      case 'monitoring':
        return <Heart className="h-5 w-5" />;
      case 'stress':
        return <Brain className="h-5 w-5" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleCompletion = (id: string) => {
    setCompletedToday(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Recommendations', icon: Star },
    { id: 'diet', label: 'Nutrition', icon: Utensils },
    { id: 'exercise', label: 'Exercise', icon: Activity },
    { id: 'monitoring', label: 'Health Monitoring', icon: Heart },
    { id: 'stress', label: 'Stress Management', icon: Brain }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Smart Lifestyle Advisor</h1>
        <p className="text-gray-600 mt-2">
          Personalized recommendations to help maintain a healthy lifestyle and reduce cancer risk.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Today's Progress</h2>
            <p className="text-gray-600 mt-1">
              {completedToday.length} of {recommendations.length} recommendations completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">
              {Math.round((completedToday.length / recommendations.length) * 100)}%
            </div>
            <p className="text-sm text-gray-600">Completion rate</p>
          </div>
        </div>
        
        <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-full transition-all duration-500"
            style={{ width: `${(completedToday.length / recommendations.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecommendations.map((recommendation) => (
          <div key={recommendation.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  recommendation.category === 'diet' ? 'bg-orange-100 text-orange-600' :
                  recommendation.category === 'exercise' ? 'bg-blue-100 text-blue-600' :
                  recommendation.category === 'monitoring' ? 'bg-red-100 text-red-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {getCategoryIcon(recommendation.category)}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(recommendation.priority)}`}>
                  {recommendation.priority} priority
                </span>
              </div>
              
              <button
                onClick={() => toggleCompletion(recommendation.id)}
                className={`p-2 rounded-full transition-colors ${
                  completedToday.includes(recommendation.id)
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
                }`}
              >
                <CheckCircle className="h-5 w-5" />
              </button>
            </div>

            <h3 className="font-semibold text-gray-900 mb-3">{recommendation.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{recommendation.description}</p>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 capitalize">{recommendation.category}</span>
                {completedToday.includes(recommendation.id) && (
                  <span className="text-green-600 font-medium">✓ Completed</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Challenge */}
      <div className="mt-12 bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-6">
          <Calendar className="h-6 w-6 text-blue-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">This Week's Health Challenge</h2>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">7-Day Anti-Inflammatory Diet</h3>
          <p className="text-gray-700 mb-4">
            Focus on foods that reduce inflammation in your body. Include omega-3 rich fish, 
            colorful vegetables, nuts, and whole grains while avoiding processed foods and excess sugar.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">Day 3</div>
              <p className="text-sm text-gray-600">Current progress</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">85%</div>
              <p className="text-sm text-gray-600">Goal completion</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">4 days</div>
              <p className="text-sm text-gray-600">Remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}