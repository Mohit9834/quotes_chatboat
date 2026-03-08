import React from 'react'
import { FiX, FiBook, FiSettings, FiHelpCircle, FiMessageCircle } from 'react-icons/fi'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: FiMessageCircle, label: 'New Chat', action: 'new' },
    { icon: FiBook, label: 'History', action: 'history' },
    { icon: FiSettings, label: 'Preferences', action: 'preferences' },
    { icon: FiHelpCircle, label: 'Help', action: 'help' },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-40 transform transition-transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Quote Zen
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Your mood companion</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <button
                key={idx}
                onClick={onClose}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Categories Section */}
        <div className="p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
            Quote Categories
          </h3>
          <div className="space-y-2">
            {['Motivation', 'Inspiration', 'Success', 'Love', 'Humor'].map((category) => (
              <button
                key={category}
                className="w-full text-left px-4 py-2 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Mood Indicators */}
        <div className="p-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
            Your Mood
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { emoji: '😊', label: 'Happy' },
              { emoji: '😔', label: 'Sad' },
              { emoji: '😰', label: 'Anxious' },
              { emoji: '😎', label: 'Confident' },
              { emoji: '😴', label: 'Tired' },
              { emoji: '🤔', label: 'Thoughtful' },
            ].map((mood) => (
              <button
                key={mood.label}
                className="flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                title={mood.label}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Quote Zen v1.0.0 <br />
            Powered by AI
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
