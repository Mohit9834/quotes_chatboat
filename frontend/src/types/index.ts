// Message types
export interface Message {
  id: string
  role: 'user' | 'bot'
  content: string
  timestamp: Date
  sentiment?: Sentiment
  emotion?: string
  intent?: string
}

// Sentiment types
export interface Sentiment {
  polarity: number // -1 to 1
  subjectivity: number // 0 to 1
  emotion: 'positive' | 'negative' | 'neutral' | 'mixed'
  confidence: number
}

// Quote types
export interface Quote {
  id: string
  text: string
  author: string
  category: 'motivation' | 'inspiration' | 'success' | 'love' | 'humor'
  sentiment?: string
  relevance_score?: number
}

// Chat response types
export interface ChatResponse {
  status: 'success' | 'error'
  user_sentiment: Sentiment
  detected_intent: string
  quote?: Quote
  ai_response: string
  suggestions: string[]
  message_id: string
}

// User preferences
export interface UserPreferences {
  theme: 'light' | 'dark'
  favorite_categories: string[]
  notification_enabled: boolean
  language: string
}

// Conversation
export interface Conversation {
  id: string
  messages: Message[]
  start_time: Date
  end_time?: Date
  sentiment_trend: {
    average_polarity: number
    sentiment_changes: number
  }
}

// API Error
export interface APIError {
  detail: string
  status_code: number
  timestamp: string
}

// Chat store state
export interface ChatStore {
  messages: Message[]
  isLoading: boolean
  error: string | null
  currentSentiment: Sentiment | null
  addMessage: (message: Message) => void
  clearMessages: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSentiment: (sentiment: Sentiment) => void
}
