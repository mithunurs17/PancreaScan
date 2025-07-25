import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { db } from '../utils/database';
import type { User, Analysis, Activity as ActivityType } from '../types';

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user.id]);

  const loadDashboardData = async () => {
    try {
      const [userAnalyses, userActivities] = await Promise.all([
        db.getUserAnalyses(user.id),
        db.getUserActivities(user.id, 10)
      ]);
      
      setAnalyses(userAnalyses);
      setActivities(userActivities);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'review_required':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-50';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.firstName}
        </h1>
        <p className="text-gray-600 mt-2">
          Here's an overview of your medical analysis activity and health insights.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Analyses</p>
              <p className="text-3xl font-bold text-gray-900">{analyses.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed This Month</p>
              <p className="text-3xl font-bold text-gray-900">
                {analyses.filter(a => new Date(a.createdAt).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Confidence</p>
              <p className="text-3xl font-bold text-gray-900">
                {analyses.length > 0 
                  ? `${Math.round(analyses.reduce((sum, a) => sum + a.confidence, 0) / analyses.length * 100)}%`
                  : '0%'
                }
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Analyses */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Analyses</h2>
          
          {analyses.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No analyses yet. Start by uploading an image for analysis.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {analyses.slice(0, 5).map((analysis) => (
                <div key={analysis.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(analysis.status)}
                    <div>
                      <p className="font-medium text-gray-900 capitalize">
                        {analysis.cancerType.replace('_', ' ')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(analysis.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConfidenceColor(analysis.confidence)}`}>
                      {Math.round(analysis.confidence * 100)}% confidence
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          
          {activities.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No recent activity to display.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Health Insights */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Health Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">Regular Monitoring</div>
            <p className="text-sm text-gray-600">Stay proactive with consistent health checkups</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">Early Detection</div>
            <p className="text-sm text-gray-600">AI-powered analysis for timely intervention</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">Lifestyle Support</div>
            <p className="text-sm text-gray-600">Personalized recommendations for better health</p>
          </div>
        </div>
      </div>
    </div>
  );
}