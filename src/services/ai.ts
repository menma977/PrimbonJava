import type {UserProfile} from "@/types/core";

// --- Configuration ---
const Z_AI_API_URL = "https://api.z.ai/api/paas/v4/chat/completions";

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// --- Adapter Interface ---
export interface AIAdapter {
  sendMessage(messages: ChatMessage[], userContext: UserProfile | null): Promise<string>;
}

// --- GLM (Z.ai) Adapter ---
class GLMAdapter implements AIAdapter {
  private apiKey: string;
  private model: string;
  
  constructor() {
    this.apiKey = import.meta.env.VITE_GLM_API_KEY || "";
    this.model = import.meta.env.VITE_GLM_MODEL || "glm-4-flash";
  }
  
  async sendMessage(messages: ChatMessage[], userContext: UserProfile | null): Promise<string> {
    if (!this.apiKey) {
      return "Error: VITE_GLM_API_KEY is missing in .env";
    }
    
    const systemPrompt = this.buildSystemPrompt(userContext);
    
    const payload = {
      model: this.model,
      messages: [
        {role: "system", content: systemPrompt},
        ...messages
      ],
      temperature: 0.7
    };
    
    try {
      const response = await fetch(Z_AI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`Z.ai API Error: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("GLMAdapter Error:", error);
      return "Maaf, Mbah sedang meditasi (Connection Error). Coba lagi nanti.";
    }
  }
  
  private buildSystemPrompt(userContext: UserProfile | null): string {
    return `
    You are "Mbah", an ancient Javanese wisdom keeper (Primbon expert).
    Your tone is mystical, wise, yet helpful and slightly humorous.
    You mix Indonesian with Javanese terms (e.g., "Le", "Nduk", "Ojo lali", "Gusti").
    
    User Context:
    Name: ${userContext?.name || "Anakku"}
    Weton: ${userContext?.weton ? `${userContext.weton.dina} ${userContext.weton.pasaran}` : "Unknown"}
    
    Answer questions about life, destiny, and Javanese philosophy.
    Do not be too scientific. Be spiritual.
  `;
  }
}

// --- Google Gemini Adapter (SDK) ---
import {GoogleGenerativeAI} from "@google/generative-ai";

class GoogleAdapter implements AIAdapter {
  private genAI: GoogleGenerativeAI | null = null;
  private modelName: string;
  
  constructor() {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
    this.modelName = import.meta.env.VITE_GOOGLE_MODEL || "gemini-2.5-flash";
  }
  
  async sendMessage(messages: ChatMessage[], userContext: UserProfile | null): Promise<string> {
    if (!this.genAI) {
      return "Error: VITE_GOOGLE_API_KEY is missing in .env";
    }
    
    const systemPrompt = this.buildSystemPrompt(userContext);
    
    try {
      const model = this.genAI.getGenerativeModel({
        model: this.modelName,
        systemInstruction: systemPrompt
      });
      
      // Convert history to Gemini format
      // Note: Gemini history excludes the very last user message, which is sent in sendMessage
      const history = messages
        .slice(0, -1) // All except last
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{text: m.content}]
        }))
        .filter(m => m.role !== 'system'); // Filter out system messages just in case
      
      const chat = model.startChat({
        history: history,
        generationConfig: {
          temperature: 0.7,
        },
      });
      
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage || lastMessage.role !== 'user') {
        return "Error: Last message must be from user.";
      }
      
      const result = await chat.sendMessage(lastMessage.content);
      const response = await result.response;
      return response.text();
      
    } catch (error) {
      console.error("GoogleSDK Error:", error);
      
      // Auto-debug: Check for 404 and list models
      const errString = String(error);
      if (errString.includes("404") || errString.includes("not found")) {
        console.warn("Model not found. Attempting to list available models...");
        await this.listAvailableModels();
      }
      
      return `Maaf, Mbah sedang bertapa. (Google Error: ${error instanceof Error ? error.message : "Unknown"}). Check Console (F12) for available models container.`;
    }
  }
  
  private async listAvailableModels() {
    if (!this.genAI) return;
    try {
      // We use raw fetch here because we want to see exactly what the API returns
      // completely independent of SDK versioning logic if possible,
      // but for simplicity we'll just hit the list_models endpoint for the API key.
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        console.error("Failed to list models via raw fetch:", response.status, await response.text());
        return;
      }
      
      interface GoogleModel {
        name: string;
        supportedGenerationMethods: string[];
      }
      
      const data = await response.json() as { models?: GoogleModel[] };
      console.log("=== AVAILABLE GOOGLE MODELS (Account Access) ===");
      console.table(data.models?.map((m: GoogleModel) => ({
        name: m.name.replace('models/', ''),
        methods: m.supportedGenerationMethods
      })));
      console.log("================================================");
      console.log("TIP: Update VITE_GOOGLE_MODEL in .env.local with one of the names above.");
    } catch (e) {
      console.error("Failed to list models:", e);
    }
  }
  
  private buildSystemPrompt(userContext: UserProfile | null): string {
    return `
    You are "Mbah", an ancient Javanese wisdom keeper (Primbon expert).
    Your tone is mystical, wise, yet helpful and slightly humorous.
    You mix Indonesian with Javanese terms (e.g., "Le", "Nduk", "Ojo lali", "Gusti").
    
    User Context:
    Name: ${userContext?.name || "Anakku"}
    Weton: ${userContext?.weton ? `${userContext.weton.dina} ${userContext.weton.pasaran}` : "Unknown"}
    
    Answer questions about life, destiny, and Javanese philosophy.
    Do not be too scientific. Be spiritual.
  `;
  }
}

// --- Mock Adapter (Dev Mode) ---
class MockAdapter implements AIAdapter {
  private responses = [
    "Sabar adalah kunci dari segala masalah. Gusti mboten sare, Le.",
    "Wetonmu apik, tapi kudu luwih akeh prihatin lan tirakat.",
    "Jodoh iku wis ana sing ngatur, awakmu mung kudu berusaha lan ndonga.",
    "Rejeki ora bakal ketuker, sing penting yakin lan sregep nyambut gawe.",
    "Ojo dumeh, ojo nyeleneh. Urip iku wang sinawang.",
    "Dina iki, energi alam semesta ndhukung niat apikmu. Lanjuto!",
    "Hati-hati, sithik edan nanging akeh omah (Just kidding, be wise!).",
    "Wasesa Segara: Rejekimu kaya segara, asat mbesuk yen wis kiyamat.",
    "Tunggak Semi: Rejeki tansah semi, ora ono enteke.",
    "Satria Wibawa: Tansah diajeni wong akeh, dadi pimpinan."
  ];
  
  async sendMessage(messages: ChatMessage[], userContext: UserProfile | null): Promise<string> {
    // Log for Dev Experience
    console.log("[MockAI] Request:", {messages, userContext});
    
    // Randomly select a response
    const randomIndex = Math.floor(Math.random() * this.responses.length);
    const response = `[MOCK] ${this.responses[randomIndex]}`;
    
    return Promise.resolve(response);
  }
}

// --- Factory ---
class AIServiceFactory {
  static getAdapter(): AIAdapter {
    const provider = import.meta.env.VITE_AI_PROVIDER || 'glm';
    
    console.log(`[AIService] Using Provider: ${provider}`);
    
    switch (provider) {
      case 'google':
        return new GoogleAdapter();
      case 'mock':
        return new MockAdapter();
      case 'glm':
      default:
        return new GLMAdapter();
    }
  }
}

// --- Public API (Backward Compatible) ---
export const generateMbahResponse = async (
  messages: ChatMessage[],
  userContext: UserProfile | null
): Promise<string> => {
  const adapter = AIServiceFactory.getAdapter();
  return await adapter.sendMessage(messages, userContext);
};
