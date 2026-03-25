"use client";
import { useState } from "react";
import { MessageSquare, MessageCircle, MessageSquareText, Sparkles, X, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingActions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);

  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801346646181";
  const waMessage = encodeURIComponent("Hello Ridy's Hena Art, I would like to know more about your premium mehendi kits.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${waMessage}`;

  const handleSend = async (e?: React.FormEvent, overrideMessage?: string) => {
    e?.preventDefault();
    const userMessage = overrideMessage || message.trim();
    if (!userMessage || isLoading) return;

    if (!overrideMessage) setMessage("");
    setHistory(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage,
          history: history.map(h => ({ 
            role: h.role === "user" ? "user" : "model", 
            parts: [{ text: h.content }] 
          }))
        }),
      });
      const data = await res.json();
      if (data.response) {
        setHistory(prev => [...prev, { role: "assistant", content: data.response }]);
      }
    } catch (error) {
      setHistory(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-4 z-[1000] flex flex-col items-start gap-4">
      {/* AI Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20, y: 20 }}
            className="w-[320px] sm:w-[380px] bg-white rounded-[32px] shadow-2xl border border-primary/10 flex flex-col overflow-hidden mb-2 ml-2"
          >
            {/* Header */}
            <div className="bg-primary p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <h3 className="font-heading text-sm">Hena Assistant</h3>
                  <p className="text-[8px] text-secondary font-bold uppercase tracking-wider">AI Support</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[350px] overflow-y-auto p-5 space-y-4 bg-secondary/10 text-xs">
              {history.length === 0 && (
                <div className="text-center py-6">
                  <Bot className="w-10 h-10 text-primary/20 mx-auto mb-3" />
                  <p className="font-bold text-primary mb-1">How can I help?</p>
                  <p className="text-[10px] text-textMuted mb-4">Ask about our natural mehendi kits.</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["Is it safe?", "Price?", "How to use?"].map((q) => (
                      <button 
                        key={q}
                        onClick={() => handleSend(undefined, q)}
                        className="text-[10px] font-bold text-primary/60 border border-primary/20 px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {history.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.role === "user" 
                      ? "bg-primary text-white rounded-bl-none" 
                      : "bg-white text-primary rounded-tl-none border border-primary/5"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-primary/5 flex gap-1">
                    <div className="w-1 h-1 bg-accent rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-secondary/30 flex gap-2">
              <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 bg-secondary/10 border-none outline-none px-4 py-2 rounded-xl text-xs focus:ring-1 ring-accent"
              />
              <button 
                type="submit"
                disabled={!message.trim() || isLoading}
                className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-secondary transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="flex flex-col gap-3 mb-2"
          >
            {/* WhatsApp Option */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 5 }}
              className="flex items-center gap-3 bg-white p-2 pr-4 rounded-2xl shadow-lg border border-primary/5 group"
            >
              <div className="w-10 h-10 bg-[#25D366] text-white rounded-xl flex items-center justify-center shadow-md">
                <MessageSquareText className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">WhatsApp</span>
            </motion.a>

            {/* AI Assistant Option */}
            <motion.button
              onClick={() => {
                setIsChatOpen(true);
                setIsMenuOpen(false);
              }}
              whileHover={{ scale: 1.05, x: 5 }}
              className="flex items-center gap-3 bg-white p-2 pr-4 rounded-2xl shadow-lg border border-primary/5 group"
            >
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">AI Assistant</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border-4 border-white transition-all duration-300 ${
          isMenuOpen ? "bg-accent rotate-90" : "bg-primary"
        }`}
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 text-primary" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-primary text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              !
            </span>
          </div>
        )}
      </motion.button>
    </div>
  );
}
