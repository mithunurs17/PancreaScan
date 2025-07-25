export class ChatbotService {
  private apiUrl: string = '';
  private apiKey: string = '';
  private version: string = '';

  setConfig(apiUrl: string, apiKey: string, version: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
    this.version = version;
  }

  async sendMessage(message: string, userId: string): Promise<string> {
    try {
      if (!this.apiUrl) {
        // Fallback responses for medical queries
        return this.getMockResponse(message);
      }

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Version': this.version
        },
        body: JSON.stringify({
          message,
          userId,
          context: 'pancreatic_cancer_detection'
        })
      });

      if (!response.ok) {
        throw new Error('Chatbot service unavailable');
      }

      const data = await response.json();
      return data.response || 'I apologize, but I cannot provide a response right now.';
    } catch (error) {
      console.error('Chatbot error:', error);
      return this.getMockResponse(message);
    }
  }

  private getMockResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('pancreatic cancer') || lowerMessage.includes('pancreas')) {
      return "Pancreatic cancer is a serious condition that affects the pancreas. Early detection is crucial for better outcomes. Our AI system can help analyze medical images to identify potential signs of three main types: adenocarcinoma, neuroendocrine tumors, and cystic lesions. Would you like to know more about any specific type?";
    }
    
    if (lowerMessage.includes('symptoms')) {
      return "Common symptoms of pancreatic cancer may include abdominal pain, unexplained weight loss, jaundice (yellowing of skin/eyes), changes in stool, nausea, and new-onset diabetes. However, symptoms often appear in later stages. Regular screening and early detection through imaging is important for high-risk individuals.";
    }
    
    if (lowerMessage.includes('diet') || lowerMessage.includes('lifestyle')) {
      return "A healthy lifestyle can help reduce pancreatic cancer risk. Recommendations include: avoiding tobacco, limiting alcohol, maintaining a healthy weight, eating a balanced diet rich in fruits and vegetables, exercising regularly, and managing diabetes if present. Our lifestyle advisor can provide personalized recommendations.";
    }
    
    if (lowerMessage.includes('accuracy') || lowerMessage.includes('reliable')) {
      return "Our AI system uses advanced machine learning to analyze medical images with high accuracy. However, this tool is designed to assist healthcare professionals and should not replace professional medical diagnosis. All results should be reviewed by qualified medical practitioners.";
    }
    
    return "I'm here to help answer questions about pancreatic cancer detection, symptoms, lifestyle recommendations, and how to use our analysis platform. Please feel free to ask specific questions about any of these topics.";
  }
}

export const chatbotService = new ChatbotService();