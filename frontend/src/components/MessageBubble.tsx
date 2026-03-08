import React from 'react'
import { Message } from '@/types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

interface MessageBubbleProps {
  message: Message
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user'

  const getEmotionEmoji = (emotion?: string) => {
    switch (emotion) {
      case 'positive':
        return '😊'
      case 'negative':
        return '😔'
      case 'neutral':
        return '😐'
      case 'mixed':
        return '🤔'
      case 'anxious':
        return '😰'
      case 'confident':
        return '😎'
      default:
        return ''
    }
  }

  const getSentimentColor = (emotion?: string) => {
    switch (emotion) {
      case 'positive':
        return 'text-green-600 dark:text-green-400'
      case 'negative':
        return 'text-red-600 dark:text-red-400'
      case 'neutral':
        return 'text-gray-600 dark:text-gray-400'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-2`}>
        {/* Message Bubble */}
        <div
          className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-sm transition ${
            isUser
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-br-none'
              : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none border border-gray-200 dark:border-gray-600'
          }`}
        >
          <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        {/* Metadata */}
        <div
          className={`flex items-center gap-2 text-xs ${
            isUser
              ? 'text-gray-500 dark:text-gray-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          {!isUser && message.emotion && (
            <span className={getSentimentColor(message.emotion)} title={message.emotion}>
              {getEmotionEmoji(message.emotion)}
            </span>
          )}

          {message.intent && !isUser && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-xs font-medium">
              {message.intent.replace('_', ' ')}
            </span>
          )}

          <span>{dayjs(message.timestamp).fromNow()}</span>
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
