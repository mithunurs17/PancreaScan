import React from 'react';
import { Brain, Shield, Users, Award, ArrowRight, CheckCircle, Star, Activity, Zap, Target } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

export default function LandingPage({ onGetStarted, onLearnMore }: LandingPageProps) {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms trained on thousands of medical images for accurate cancer detection.',
      image: 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Shield,
      title: 'Medical Grade Security',
      description: 'HIPAA-compliant platform ensuring your medical data remains private and secure at all times.',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Users,
      title: 'Expert Collaboration',
      description: 'Developed in partnership with leading oncologists and medical imaging specialists worldwide.',
      image: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Award,
      title: 'Clinically Validated',
      description: 'Rigorously tested and validated in clinical settings with proven accuracy rates above 95%.',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    }
  ];

  const stats = [
    { number: '95%', label: 'Detection Accuracy' },
    { number: '10,000+', label: 'Images Analyzed' },
    { number: '500+', label: 'Healthcare Partners' },
    { number: '24/7', label: 'AI Availability' }
  ];

  const cancerTypes = [
    {
      name: 'Ductal Adenocarcinoma',
      description: 'The most common form, accounting for 90% of pancreatic cancers',
      accuracy: '96%'
    },
    {
      name: 'Neuroendocrine Tumors',
      description: 'Slower-growing tumors with better treatment outcomes',
      accuracy: '94%'
    },
    {
      name: 'Cystic Lesions',
      description: 'Fluid-filled spaces requiring careful monitoring',
      accuracy: '92%'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-gray-800 fixed w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-400 mr-3 animate-pulse" />
              <span className="text-2xl font-bold text-white">PancreaAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={onLearnMore}
                className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200"
              >
                How it Works
              </button>
              <button className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200">
                Research
              </button>
              <button className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200">
                About
              </button>
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 py-32 pt-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center bg-blue-900/50 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-blue-700/50">
                <Star className="h-4 w-4 mr-2" />
                Trusted by 500+ Healthcare Institutions
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Early Detection
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 block animate-gradient">Saves Lives</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Revolutionary AI-powered platform for pancreatic cancer detection. 
                Get accurate, fast results with our clinically validated machine learning technology.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-xl"
                >
                  Start Free Analysis
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
                <button
                  onClick={onLearnMore}
                  className="border border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 backdrop-blur-sm"
                >
                  Learn More
                </button>
              </div>
              
              <div className="mt-8 flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  HIPAA Compliant
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  FDA Cleared
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  24/7 Available
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in-up delay-300">
              {/* Medical professional image */}
              <div className="relative mb-8">
                <img
                  src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="Medical professional using AI technology"
                  className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-2xl"></div>
              </div>
              
              <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">AI Analysis Dashboard</h3>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-4 animate-slide-in-right">
                    <div className="flex items-center justify-between">
                      <span className="text-green-300 font-medium">Detection Complete</span>
                      <span className="text-green-400 text-sm">96% Confidence</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {stats.slice(0, 3).map((stat, index) => (
                      <div key={index} className="text-center p-3 bg-gray-700/50 rounded-lg animate-fade-in delay-500">
                        <div className="text-lg font-bold text-blue-400">{stat.number}</div>
                        <div className="text-xs text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-900/30 rounded-lg p-4 animate-slide-in-left delay-700">
                    <div className="text-sm text-blue-300 font-medium mb-2">Lifestyle Recommendations</div>
                    <div className="space-y-1">
                      <div className="text-xs text-blue-400">✓ Anti-inflammatory diet plan</div>
                      <div className="text-xs text-blue-400">✓ Regular exercise routine</div>
                      <div className="text-xs text-blue-400">✓ Stress management techniques</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cancer Types Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in-up">
              Comprehensive Cancer Detection
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200">
              Our AI system can accurately identify and classify three main types of pancreatic cancer, 
              providing detailed analysis and recommendations for each.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cancerTypes.map((type, index) => (
              <div key={index} className="bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-700 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-700/50">
                    <Activity className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{type.name}</h3>
                  <p className="text-gray-300 text-sm">{type.description}</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center bg-green-900/50 text-green-300 px-4 py-2 rounded-full border border-green-700/50">
                    <span className="text-sm font-medium">{type.accuracy} Accuracy</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in-up">
              Why Choose PancreaAI?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200">
              Built with cutting-edge technology and medical expertise to provide 
              the most accurate and reliable cancer detection platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-700 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-blue-600/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in-up">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Join thousands of healthcare professionals using PancreaAI for early cancer detection. 
            Start your free analysis today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
            <button
              onClick={onGetStarted}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Start Free Trial
            </button>
            <button
              onClick={onLearnMore}
              className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Brain className="h-6 w-6 text-blue-400 mr-2 animate-pulse" />
                <span className="text-lg font-bold">PancreaAI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Advanced AI-powered pancreatic cancer detection platform trusted by healthcare professionals worldwide.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors duration-200">AI Analysis</button></li>
                <li><button className="hover:text-white transition-colors duration-200">Lifestyle Advisor</button></li>
                <li><button className="hover:text-white transition-colors duration-200">Medical Chat</button></li>
                <li><button className="hover:text-white transition-colors duration-200">Dashboard</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors duration-200">Documentation</button></li>
                <li><button className="hover:text-white transition-colors duration-200">Research Papers</button></li>
                <li><button className="hover:text-white transition-colors duration-200">Case Studies</button></li>
                <li><button className="hover:text-white transition-colors duration-200">Support</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors duration-200">About Us</button></li>
                <li><button className="hover:text-white transition-colors duration-200">Privacy Policy</button></li>
                <li><button className="hover:text-white transition-colors duration-200">Terms of Service</button></li>
                <li><button className="hover:text-white transition-colors duration-200">Contact</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 PancreaAI. All rights reserved. This platform is for medical professional use only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}