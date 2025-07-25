import React from 'react';
import { Brain, Upload, MessageCircle, Heart, ArrowRight, Play, Users, Award, Shield, Zap, Target, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
  onViewDemo: () => void;
}

export default function HomePage({ onGetStarted, onViewDemo }: HomePageProps) {
  const steps = [
    {
      number: '01',
      title: 'Upload Medical Image',
      description: 'Securely upload CT scans, MRI, or other medical images through our HIPAA-compliant platform.',
      icon: Upload,
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      number: '02',
      title: 'AI Analysis',
      description: 'Our advanced neural network analyzes the image for three types of pancreatic cancer with 95%+ accuracy.',
      icon: Brain,
      image: 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      number: '03',
      title: 'Get Results & Recommendations',
      description: 'Receive detailed findings, confidence scores, and personalized lifestyle recommendations.',
      icon: MessageCircle,
      image: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      number: '04',
      title: 'Lifestyle Guidance',
      description: 'Access our smart advisor for ongoing health monitoring and cancer prevention strategies.',
      icon: Heart,
      image: 'https://images.pexels.com/photos/6111563/pexels-photo-6111563.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Oncologist, Mayo Clinic',
      content: 'PancreaAI has revolutionized our early detection capabilities. The accuracy and speed of analysis have significantly improved patient outcomes.',
      avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Dr. Michael Rodriguez',
      role: 'Radiologist, Johns Hopkins',
      content: 'The AI-powered analysis provides insights that complement our clinical expertise. It\'s become an essential tool in our diagnostic workflow.',
      avatar: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Gastroenterologist, Cleveland Clinic',
      content: 'The lifestyle recommendations are evidence-based and practical. Our patients appreciate the comprehensive approach to cancer prevention.',
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const benefits = [
    {
      icon: Brain,
      title: 'Advanced AI Technology',
      description: 'State-of-the-art deep learning models trained on thousands of medical images',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Medical Grade Security',
      description: 'HIPAA-compliant platform with end-to-end encryption for patient data protection',
      color: 'green'
    },
    {
      icon: Users,
      title: 'Expert Collaboration',
      description: 'Developed with leading oncologists and validated in clinical settings',
      color: 'purple'
    },
    {
      icon: Award,
      title: 'Proven Accuracy',
      description: '95%+ detection accuracy across three types of pancreatic cancer',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 py-32 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <div className="inline-flex items-center bg-blue-900/50 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm border border-blue-700/50 animate-fade-in-up">
              <Award className="h-4 w-4 mr-2" />
              Clinically Validated AI Platform
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-8 animate-fade-in-up delay-200">
              Pancreatic Cancer
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 block animate-gradient">Detection Platform</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-400">
              Harness the power of artificial intelligence for early pancreatic cancer detection. 
              Our platform combines cutting-edge machine learning with medical expertise to provide 
              accurate, fast, and reliable analysis of medical images.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up delay-600">
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center text-lg transform hover:scale-105 shadow-xl"
              >
                Start Free Analysis
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              <button
                onClick={onViewDemo}
                className="border border-gray-600 text-gray-300 px-10 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center text-lg backdrop-blur-sm"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up delay-800">
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-blue-400 mb-2">95%+</div>
                <div className="text-gray-300 text-sm">Detection Accuracy</div>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
                <div className="text-gray-300 text-sm">Healthcare Partners</div>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-purple-400 mb-2">10K+</div>
                <div className="text-gray-300 text-sm">Images Analyzed</div>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
                <div className="text-gray-300 text-sm">AI Availability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in-up">
              How PancreaAI Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200">
              Our streamlined process makes advanced cancer detection accessible and efficient 
              for healthcare professionals and patients alike.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-700">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <div className="text-blue-400 text-lg font-bold bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full">{step.number}</div>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <div className="w-12 h-12 bg-blue-600/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  
                  {index % 2 === 0 && index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-6 w-6 text-gray-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in-up">
              Why Healthcare Professionals Choose Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200">
              Built with medical expertise and cutting-edge technology to deliver 
              the most reliable cancer detection platform available.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start space-x-6 p-8 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-700 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getColorClasses(benefit.color)}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in-up">
              Trusted by Medical Professionals
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200">
              See what leading healthcare professionals are saying about PancreaAI's 
              impact on patient care and diagnostic accuracy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-900 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-700 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-blue-500/50"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-gray-300 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed italic">"{testimonial.content}"</p>
              </div>
            ))}
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
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to Transform Cancer Detection?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Join the revolution in medical AI. Start using PancreaAI today and experience 
            the future of pancreatic cancer detection and prevention.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-400">
            <button
              onClick={onGetStarted}
              className="bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 text-lg transform hover:scale-105 shadow-xl"
            >
              Get Started Now
            </button>
            <button
              onClick={onViewDemo}
              className="border border-white text-white px-10 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 text-lg backdrop-blur-sm"
            >
              Schedule Demo
            </button>
          </div>
          
          <div className="mt-8 text-blue-100 text-sm animate-fade-in-up delay-600">
            No credit card required • HIPAA compliant • 24/7 support
          </div>
        </div>
      </section>
    </div>
  );
}