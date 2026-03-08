import React from "react";
import { FiMenu, FiTrash2 } from "react-icons/fi";
import { IoMoon, IoSunny } from "react-icons/io5";
import { Sentiment } from "@/types";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onMenuClick: () => void;
  sentiment?: Sentiment | null;
  onClearChat: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  onMenuClick,
  sentiment,
  onClearChat,
}) => {
  const getEmotionEmoji = (emotion?: string) => {
    switch (emotion) {
      case "positive":
        return "😊";
      case "negative":
        return "😔";
      case "neutral":
        return "😐";
      case "mixed":
        return "🤔";
      default:
        return "💭";
    }
  };

  return (
    <header className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-gray-900 dark:to-gray-800 text-white shadow-lg transition-colors">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">

        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-white/20 rounded-lg transition"
            aria-label="Menu"
          >
            <FiMenu size={24} />
          </button>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Quote Zen</h1>
            <p className="text-xs sm:text-sm text-white/90">
              Personalized Quotes for Your Mood
            </p>
          </div>
        </div>

        {/* Center Section - Emotion Indicator */}
        {sentiment && (
          <div className="hidden sm:flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            <span className="text-2xl">{getEmotionEmoji(sentiment.emotion)}</span>

            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase">
                {sentiment.emotion}
              </span>
              <span className="text-xs opacity-90">
                {(sentiment.confidence * 100).toFixed(0)}% confident
              </span>
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClearChat}
            className="p-2 hover:bg-white/20 rounded-lg transition"
            aria-label="Clear chat"
            title="Clear conversation"
          >
            <FiTrash2 size={20} />
          </button>

          <button
            onClick={onToggleTheme}
            className="p-2 hover:bg-white/20 rounded-lg transition"
            aria-label="Toggle theme"
          >
            {isDark ? <IoSunny size={20} /> : <IoMoon size={20} />}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/20">
        <div className="h-full w-full bg-white animate-pulse" />
      </div>
    </header>
  );
};

export default Header;