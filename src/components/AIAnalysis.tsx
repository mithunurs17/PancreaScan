import React, { useState } from 'react';
import { Upload, Brain, FileImage, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { mlService } from '../utils/ml-service';
import { db } from '../utils/database';
import type { User, Analysis } from '../types';

interface AIAnalysisProps {
  user: User;
}

export default function AIAnalysis({ user }: AIAnalysisProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTraining, setShowTraining] = useState(false);
  const [trainingMetrics, setTrainingMetrics] = useState<any>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setError('');
      } else {
        setError('Please select a valid image file');
      }
    }
  };

  const handleAnalysis = async () => {
    if (!selectedFile) {
      setError('Please select an image file first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await mlService.analyzeImage(selectedFile);
      setAnalysisResult(result);

      // Save analysis to database
      await db.createAnalysis({
        userId: user.id,
        imageUrl: URL.createObjectURL(selectedFile),
        cancerType: result.cancerType,
        confidence: result.confidence,
        findings: result.findings,
        recommendations: result.recommendations,
        status: result.confidence > 0.8 ? 'completed' : 'review_required'
      });

      // Log activity
      await db.logActivity({
        userId: user.id,
        type: 'analysis',
        description: `AI analysis completed for ${result.cancerType} detection`,
        timestamp: new Date().toISOString()
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleTraining = async () => {
    setShowTraining(true);
    try {
      const metrics = await mlService.simulateTraining(1000);
      setTrainingMetrics(metrics);
    } catch (err) {
      setError('Training simulation failed');
    }
  };

  const getCancerTypeInfo = (type: string) => {
    const info = {
      adenocarcinoma: {
        name: 'Ductal Adenocarcinoma',
        description: 'The most common type of pancreatic cancer, accounting for about 90% of cases.',
        characteristics: ['Originates in ductal cells', 'Aggressive growth pattern', 'Often diagnosed at advanced stages']
      },
      neuroendocrine: {
        name: 'Neuroendocrine Tumor',
        description: 'A less common but often slower-growing type of pancreatic cancer.',
        characteristics: ['Originates in hormone-producing cells', 'May cause specific symptoms', 'Better prognosis when caught early']
      },
      cystic: {
        name: 'Cystic Lesion',
        description: 'Fluid-filled spaces that may have malignant potential.',
        characteristics: ['May be benign or malignant', 'Requires careful monitoring', 'Treatment depends on size and characteristics']
      }
    };
    return info[type as keyof typeof info] || info.adenocarcinoma;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI-Powered Cancer Detection</h1>
        <p className="text-gray-600 mt-2">
          Upload medical images for advanced analysis using our trained neural network model.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Image Upload & Analysis</h2>
          
          <div className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Select Medical Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supports PNG, JPG, JPEG formats
                  </p>
                </label>
              </div>
            </div>

            {/* Selected Image Preview */}
            {selectedFile && (
              <div className="border rounded-lg overflow-hidden">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected medical image"
                  className="w-full h-48 object-cover"
                />
                <div className="p-3 bg-gray-50">
                  <p className="text-sm text-gray-600">
                    File: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Analysis Button */}
            <button
              onClick={handleAnalysis}
              disabled={!selectedFile || loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5" />
                  <span>Analyze Image</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Analysis Results</h2>
          
          {!analysisResult ? (
            <div className="text-center py-12">
              <FileImage className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Upload an image to see analysis results</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cancer Type Detection */}
              <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-green-800">Detection Complete</h3>
                </div>
                
                {(() => {
                  const typeInfo = getCancerTypeInfo(analysisResult.cancerType);
                  return (
                    <div>
                      <p className="text-green-700 font-medium mb-2">{typeInfo.name}</p>
                      <p className="text-green-600 text-sm mb-3">{typeInfo.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-600">Confidence Level:</span>
                        <span className="font-bold text-green-700">
                          {Math.round(analysisResult.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Medical Findings */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Medical Findings</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{analysisResult.findings}</p>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Recommendations</h3>
                <div className="space-y-2">
                  {analysisResult.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-yellow-800 font-medium">Important Medical Notice</p>
                    <p className="text-yellow-700 text-sm mt-1">
                      This AI analysis is a diagnostic aid and should not replace professional medical consultation. 
                      Please consult with qualified healthcare providers for proper diagnosis and treatment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Model Training Section */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Model Training & Validation</h2>
            <p className="text-gray-600 mt-1">
              Train and validate the neural network model with your dataset
            </p>
          </div>
          <button
            onClick={handleTraining}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 flex items-center space-x-2"
          >
            <Brain className="h-4 w-4" />
            <span>Simulate Training</span>
          </button>
        </div>

        {showTraining && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-gray-900 mb-4">Training Progress</h3>
              {trainingMetrics ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900">Final Training Accuracy</h4>
                      <p className="text-2xl font-bold text-blue-600">
                        {trainingMetrics.accuracy[trainingMetrics.accuracy.length - 1].toFixed(1)}%
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-medium text-green-900">Final Validation Accuracy</h4>
                      <p className="text-2xl font-bold text-green-600">
                        {trainingMetrics.valAccuracy[trainingMetrics.valAccuracy.length - 1].toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Training Summary</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Dataset Size: 1,000 medical images</p>
                      <p>• Training Epochs: 10</p>
                      <p>• Model Architecture: Convolutional Neural Network</p>
                      <p>• Cancer Types: Adenocarcinoma, Neuroendocrine, Cystic</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <Loader className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">Training in progress...</span>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Model Information</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-medium text-gray-900">Architecture</h4>
                  <p className="text-gray-600">Deep Convolutional Neural Network with transfer learning</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-medium text-gray-900">Input Size</h4>
                  <p className="text-gray-600">224x224x3 RGB images</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-medium text-gray-900">Output Classes</h4>
                  <p className="text-gray-600">3 cancer types with confidence scores</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}