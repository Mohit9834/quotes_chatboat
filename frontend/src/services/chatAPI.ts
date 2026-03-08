import axios, { AxiosInstance } from 'axios'
import { ChatResponse, Message, Quote, Sentiment, APIError } from '@/types'

class ChatAPI {
  private api: AxiosInstance

  constructor() {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    })

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        const apiError: APIError = {
          detail: error.response?.data?.detail || error.message,
          status_code: error.response?.status || 500,
          timestamp: new Date().toISOString(),
        }
        throw apiError
      }
    )
  }

  // Chat endpoints
  async sendMessage(message: string, userId: string = 'default'): Promise<ChatResponse> {
    const response = await this.api.post<ChatResponse>('/chat/message', {
      message,
      user_id: userId,
    })
    return response.data
  }

  async getHistory(userId: string = 'default', limit: number = 50): Promise<Message[]> {
    try {
      const response = await this.api.get<any>('/chat/history', {
        params: { user_id: userId, limit },
      })

      // Handle both array and object responses
      if (Array.isArray(response.data)) {
        return response.data
      } else if (response.data?.messages && Array.isArray(response.data.messages)) {
        return response.data.messages
      } else {
        return []
      }
    } catch (error) {
      console.error('Error fetching history:', error)
      return [] // Return empty array on error
    }
  }

  async clearHistory(userId: string = 'default'): Promise<{ status: string }> {
    const response = await this.api.delete('/chat/history', {
      params: { user_id: userId },
    })
    return response.data
  }

  async getSentiment(messageId: string): Promise<Sentiment> {
    const response = await this.api.get<Sentiment>(`/chat/sentiment/${messageId}`)
    return response.data
  }

  // Quote endpoints
  async getQuotes(category?: string): Promise<Quote[]> {
    const response = await this.api.get<any>('/quotes', {
      params: category ? { category } : {},
    })

    // Handle different response formats
    if (Array.isArray(response.data)) {
      return response.data
    } else if (response.data?.quotes && Array.isArray(response.data.quotes)) {
      return response.data.quotes
    } else {
      return []
    }
  }

  async getQuotesByCategory(category: string): Promise<Quote[]> {
    const response = await this.api.get<any>(`/quotes/category/${category}`)

    if (Array.isArray(response.data)) {
      return response.data
    } else if (response.data?.quotes && Array.isArray(response.data.quotes)) {
      return response.data.quotes
    } else {
      return []
    }
  }

  async getQuotesBySentiment(sentiment: string): Promise<Quote[]> {
    const response = await this.api.get<any>(`/quotes/sentiment/${sentiment}`)

    if (Array.isArray(response.data)) {
      return response.data
    } else if (response.data?.quotes && Array.isArray(response.data.quotes)) {
      return response.data.quotes
    } else {
      return []
    }
  }

  async recommendQuote(sentiment: string, category?: string): Promise<Quote> {
    const response = await this.api.post<Quote>('/quotes/recommend', {
      sentiment,
      category,
    })
    return response.data
  }

  // AI endpoints
  async generateResponse(prompt: string, context?: string): Promise<{ text: string }> {
    const response = await this.api.post<{ text: string }>('/ai/generate', {
      prompt,
      context,
    })
    return response.data
  }

  async analyzeSentiment(text: string): Promise<Sentiment> {
    const response = await this.api.post<Sentiment>('/ai/analyze', { text })
    return response.data
  }

  async getSuggestions(context: string): Promise<{ suggestions: string[] }> {
    const response = await this.api.get<{ suggestions: string[] }>('/ai/suggestions', {
      params: { context },
    })
    return response.data
  }

  // Health check
  async healthCheck(): Promise<{ status: string }> {
    const response = await this.api.get<{ status: string }>('/health')
    return response.data
  }

  // Error handling helper
  static handleError(error: unknown): string {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.detail || error.message
    }
    return 'An unexpected error occurred'
  }
}

// Export singleton instance
export const chatAPI = new ChatAPI()
export default chatAPI
