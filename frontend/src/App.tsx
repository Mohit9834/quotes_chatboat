import React, { useState, useEffect } from "react";
import ChatBox from "@/components/ChatBox";
import InputArea from "@/components/InputArea";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useChat } from "@/hooks/useChat";
import "./App.css";

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const {
    messages,
    isLoading,
    error,
    currentSentiment,
    sendMessage,
    clearConversation,
  } = useChat();

  // Apply theme to HTML element
  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onMenuClick={() => setShowSidebar(!showSidebar)}
          sentiment={currentSentiment}
          onClearChat={clearConversation}
        />

        {/* Chat Messages */}
        <ChatBox messages={messages} isLoading={isLoading} error={error} />

        {/* Input Area */}
        <InputArea onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;