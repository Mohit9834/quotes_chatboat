import React, { useEffect, useRef } from 'react'
import { Message } from '@/types'
import MessageBubble from '@/components/MessageBubble'
import { FiAlertCircle } from 'react-icons/fi'

interface ChatBoxProps {
  messages: Message[]
  isLoading: boolean
  error: string | null
}

const TypingIndicator: React.FC = () => (
  <div className="flex gap-2 items-center p-4 animate-fade-in">
    <div className="flex gap-1">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
      <span
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: '0.2s' }}
      ></span>
      <span
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: '0.4s' }}
      ></span>
    </div>
  </div>
)

const ChatBox: React.FC<ChatBoxProps> = ({ messages = [], isLoading, error }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const lastMessageCountRef = useRef(0)

  // Only scroll when new messages are added (not on every render)
  useEffect(() => {
    // Only scroll if messages count increased
    if (messages.length > lastMessageCountRef.current) {
      lastMessageCountRef.current = messages.length
      // Delay scroll slightly to allow DOM to update
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      })
    }
  }, [messages.length])

  // Also scroll when loading state changes (typing indicator appeared/disappeared)
  useEffect(() => {
    if (isLoading && messages.length > 0) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      })
    }
  }, [isLoading])

  // Ensure messages is always an array
  const safeMessages = Array.isArray(messages) ? messages : []

  return (
    <div
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6"
    >
      <div className="max-w-4xl mx-auto space-y-4">
        {safeMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <div className="text-7xl mb-6 animate-bounce">💭</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-3">
              Welcome to Quote Zen
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
              I'm here to provide you with personalized quotes based on your mood and
              emotions. Start the conversation by telling me how you're feeling!
            </p>

            {/* Quick start suggestions */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-8 w-full max-w-2xl px-4">
              {[
                { emoji: '💪', text: 'I need motivation' },
                { emoji: '✨', text: 'Inspire me' },
                { emoji: '❤️', text: 'Love quotes' },
                { emoji: '😂', text: 'Make me laugh' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-white dark:bg-gray-700 rounded-xl hover:shadow-md hover:shadow-primary-300 dark:hover:shadow-primary-900 transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:-translate-y-1 active:translate-y-0"
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {safeMessages.map((message, idx) => (
              <div key={message.id || idx} className="animate-fade-in">
                <MessageBubble message={message} />
              </div>
            ))}

            {isLoading && <TypingIndicator />}

            {error && (
              <div className="flex gap-3 p-4 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-xl border border-red-200 dark:border-red-800 animate-fade-in">
                <FiAlertCircle className="flex-shrink-0 mt-0.5 w-5 h-5" />
                <div>
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  )
}

export default ChatBox
