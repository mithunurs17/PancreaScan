export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  phone?: string;
  medicalHistory?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Analysis {
  id: string;
  userId: string;
  imageUrl: string;
  cancerType: 'adenocarcinoma' | 'neuroendocrine' | 'cystic';
  confidence: number;
  findings: string;
  recommendations: string[];
  createdAt: string;
  status: 'pending' | 'completed' | 'review_required';
}

export interface Activity {
  id: string;
  userId: string;
  type: 'analysis' | 'login' | 'profile_update' | 'lifestyle_check';
  description: string;
  timestamp: string;
}

export interface LifestyleRecommendation {
  id: string;
  category: 'diet' | 'exercise' | 'monitoring' | 'stress';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  completed?: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  message: string;
  response: string;
  timestamp: string;
}