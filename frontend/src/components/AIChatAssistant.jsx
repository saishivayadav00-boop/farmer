import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Minus, 
  User, 
  Sprout, 
  FlaskConical, 
  Bug, 
  TrendingUp, 
  MessageSquare 
} from 'lucide-react';

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Namaste! I am **AgriBot**, your AI Smart Farming Assistant. How can I help your farm today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Best crop for Alluvial soil?',
        'Urea dose for 1 acre wheat',
        'Tomato Early Blight cure',
        'Live Mandi wheat price'
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async (textToSend) => {
    const message = textToSend || inputMessage.trim();
    if (!message) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: message,
      time: timeStr
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const res = await axios.post('http://127.0.0.1:5000/api/chat', { message });
      if (res.data && res.data.chat_response) {
        const botReply = res.data.chat_response;
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: botReply.reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestions: botReply.suggested_actions || []
          }
        ]);
      }
    } catch (err) {
      console.warn("Backend Chat API offline, generating local response.", err);
      let replyText = "I am AgriBot! I recommend running our AI Crop Selector or Leaf Scanner tools for detailed field advice.";
      const msgLower = message.lower ? message.lower() : message.toLowerCase();

      if (msgLower.includes('crop') || msgLower.includes('soil')) {
        replyText = "For Alluvial & Loamy soils in Rabi season, **Wheat (HD 2967)** is top recommended (Est. Yield: 22-25 Quintals/Acre).";
      } else if (msgLower.includes('fertilizer') || msgLower.includes('urea')) {
        replyText = "For 1 acre of Wheat: Apply 55 Kg DAP + 20 Kg MOP basal, followed by 45 Kg Urea top-dressing in 2 split doses.";
      } else if (msgLower.includes('blight') || msgLower.includes('disease')) {
        replyText = "Tomato Early Blight Cure: Spray Mancozeb 75% WP @ 2g/L water or Copper Oxychloride 50% WP @ 3g/L. Keep leaf foliage dry.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: ['Crop Recommendation', 'Fertilizer Calculator', 'Leaf Disease Scan']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 shadow-2xl shadow-emerald-900/60 transition-all transform hover:scale-105 flex items-center justify-center"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
          <Bot className="w-7 h-7 font-bold" />
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[580px] glass-panel bg-slate-900/98 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                  AgriBot AI <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                </h4>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                  ● Online • Agricultural Scientist Assistant
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.sender === 'user' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-emerald-400 border border-slate-700'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`p-3.5 rounded-2xl space-y-1 ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none shadow-md' 
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                    <span className={`block text-[9px] ${msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-500'} text-right`}>
                      {msg.time}
                    </span>
                  </div>

                </div>

                {/* Suggestions Chips for Bot Messages */}
                {msg.sender === 'bot' && msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 pl-9">
                    {msg.suggestions.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(chip)}
                        className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-slate-700 hover:border-emerald-500/40 text-[10px] font-semibold transition-all"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
                <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                </div>
                <span className="italic">AgriBot is analyzing query...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 border-t border-slate-800 bg-slate-950">
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex items-center gap-2">
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about crops, fertilizers, diseases, prices..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-emerald-500"
              />
              <button 
                type="submit" 
                disabled={loading || !inputMessage.trim()}
                className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
