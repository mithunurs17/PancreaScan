import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Bot, User, Loader } from 'lucide-react';
import { chatbotService } from '../utils/chatbot';
import type { User as UserType } from '../types';

interface ChatBotProps {
  user: UserType;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatBot({ user }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello ${user.firstName}! I'm your medical AI assistant. I'm here to help answer questions about pancreatic cancer, symptoms, lifestyle recommendations, and how to use our analysis platform. How can I help you today?`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatbotService.sendMessage(inputMessage.trim(), user.id);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "What are the symptoms of pancreatic cancer?",
    "How accurate is your AI analysis?",
    "What lifestyle changes can reduce cancer risk?",
    "How do I interpret my analysis results?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Medical AI Assistant</h1>
        <p className="text-gray-600 mt-2">
          Get instant answers to your questions about pancreatic cancer detection and health.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold">PancreaAI Assistant</h2>
              <p className="text-blue-100 text-sm">Medical information and guidance</p>
            </div>
            <div className="ml-auto">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="px-6 py-4 bg-gray-50 border-b">
            <p className="text-sm font-medium text-gray-700 mb-3">Quick questions to get started:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-sm bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-700 border border-gray-200 hover:border-blue-200 rounded-full px-3 py-1 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!message.isUser && (
                <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
              )}
              
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-900 rounded-bl-none'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.isUser ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>

              {message.isUser && (
                <div className="flex-shrink-0 p-2 bg-gray-100 rounded-full">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                <Bot className="h-4 w-4 text-blue-600" />
              </div>
              <div className="bg-gray-100 rounded-lg rounded-bl-none px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Loader className="h-4 w-4 animate-spin text-gray-500" />
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="border-t bg-gray-50 px-6 py-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about pancreatic cancer..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
          
          <div className="mt-2 flex items-center justify-center">
            <p className="text-xs text-gray-500">
              This AI assistant provides general information and should not replace professional medical advice.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">24/7 Availability</h3>
          <p className="text-gray-600 text-sm">Get medical information and support anytime you need it.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Bot className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
          <p className="text-gray-600 text-sm">Advanced natural language processing for accurate responses.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <User className="h-8 w-8 text-purple-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Personalized</h3>
          <p className="text-gray-600 text-sm">Tailored advice based on your health profile and history.</p>
        </div>
      </div>
    </div>
  );
}