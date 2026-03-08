import React, { useState } from 'react'
import { FiSend, FiPlus } from 'react-icons/fi'

interface InputAreaProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('')
  const [rows, setRows] = useState(1)

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input)
      setInput('')
      setRows(1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    // Auto-expand textarea
    const newRows = Math.min(e.target.value.split('\n').length, 4)
    setRows(newRows)
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Suggested actions */}
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          {[
            { emoji: '🎯', text: 'Another one' },
            { emoji: '🌟', text: 'Different category' },
            { emoji: '📊', text: 'My mood' },
            { emoji: '🔄', text: 'Change theme' },
          ].map((action, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(action.text)}
              disabled={isLoading}
              className="flex-shrink-0 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm whitespace-nowrap transition disabled:opacity-50"
            >
              {action.emoji} {action.text}
            </button>
          ))}
        </div>

        {/* Input form */}
        <div className="flex gap-3 items-end">
          <button
            className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-600 dark:text-gray-400"
            title="Add attachment"
            disabled={isLoading}
          >
            <FiPlus size={20} />
          </button>

          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Tell me your mood... (Shift + Enter for new line)"
              rows={rows}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white resize-none transition"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            title="Send message"
          >
            <FiSend size={20} />
          </button>
        </div>

        {/* Helper text */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          💡 Shift + Enter to create a new line
        </p>
      </div>
    </div>
  )
}

export default InputArea
