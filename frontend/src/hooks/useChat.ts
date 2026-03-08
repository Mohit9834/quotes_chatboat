import { useState, useCallback, useRef, useEffect } from 'react'
import { Message, ChatResponse, Sentiment } from '@/types'
import { chatAPI } from '@/services/chatAPI'
import { v4 as uuidv4 } from 'uuid'

export const useChat = (userId: string = 'default') => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentSentiment, setCurrentSentiment] = useState<Sentiment | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load conversation history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await chatAPI.getHistory(userId)
        // Ensure history is always an array
        if (Array.isArray(history)) {
          setMessages(history)
        } else {
          console.warn('History is not an array:', history)
          setMessages([])
        }
      } catch (err) {
        console.error('Failed to load history:', err)
        setMessages([]) // Default to empty array on error
      }
    }
    loadHistory()
  }, [userId])

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Send message
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return

      // Add user message immediately
      const userMessage: Message = {
        id: uuidv4(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setError(null)
      setIsLoading(true)

      try {
        // Call API
        const response: ChatResponse = await chatAPI.sendMessage(content, userId)

        // Add bot message
        const botMessage: Message = {
          id: response.message_id,
          role: 'bot',
          content: response.ai_response,
          timestamp: new Date(),
          sentiment: response.user_sentiment,
          emotion: response.user_sentiment.emotion,
          intent: response.detected_intent,
        }

        setMessages((prev) => [...prev, botMessage])
        setCurrentSentiment(response.user_sentiment)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to send message'
        setError(errorMessage)

        // Add error message
        const errorMessage_obj: Message = {
          id: uuidv4(),
          role: 'bot',
          content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage_obj])
      } finally {
        setIsLoading(false)
      }
    },
    [userId]
  )

  // Clear conversation
  const clearConversation = useCallback(async () => {
    try {
      await chatAPI.clearHistory(userId)
      setMessages([])
      setError(null)
    } catch (err) {
      setError('Failed to clear conversation')
    }
  }, [userId])

  return {
    messages,
    isLoading,
    error,
    currentSentiment,
    sendMessage,
    clearConversation,
    messagesEndRef,
  }
}

// Hook for sentiment analysis
export const useSentiment = () => {
  const [sentiment, setSentiment] = useState<Sentiment | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeSentiment = useCallback(async (text: string) => {
    setIsAnalyzing(true)
    try {
      const result = await chatAPI.analyzeSentiment(text)
      setSentiment(result)
      return result
    } catch (err) {
      console.error('Sentiment analysis failed:', err)
      return null
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  return { sentiment, isAnalyzing, analyzeSentiment, setSentiment }
}

// Hook for quote recommendations
export const useQuoteRecommendation = () => {
  const [isLoading, setIsLoading] = useState(false)

  const getRecommendation = useCallback(async (sentiment: string, category?: string) => {
    setIsLoading(true)
    try {
      const quote = await chatAPI.recommendQuote(sentiment, category)
      return quote
    } catch (err) {
      console.error('Failed to get recommendation:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, getRecommendation }
}
