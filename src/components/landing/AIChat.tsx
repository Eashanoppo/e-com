"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

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
    <div className="fixed bottom-6 right-6 z-[999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] bg-white rounded-[32px] shadow-2xl border border-primary/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-2xl flex items-center justify-center">
                   <Sparkles className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg">Hena Assistant</h3>
                  <p className="text-[10px] text-secondary font-bold uppercase tracking-wider">Powered by RHA Intelligence</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="h-[400px] overflow-y-auto p-6 space-y-4 bg-secondary/10">
              {history.length === 0 && (
                <div className="text-center py-10 px-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-primary font-bold mb-2">Welcome to the Atelier!</p>
                  <p className="text-xs text-textMuted leading-relaxed">
                    I'm your botanical assistant. Ask me anything about our products, safety, or delivery.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {["Is it safe?", "Price of Value Pack", "How long it lasts?"].map((q) => (
                      <button 
                        key={q}
                        onClick={() => {
                           handleSend(undefined, q);
                        }}
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
                  <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                    msg.role === "user" 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-white text-primary rounded-tl-none border border-primary/5"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-primary/5 flex gap-1">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-secondary/30 flex gap-2">
              <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask your assistant..."
                className="flex-1 bg-secondary/30 border-none outline-none px-4 py-3 rounded-2xl text-xs font-medium focus:ring-1 ring-accent"
              />
              <button 
                type="submit"
                disabled={!message.trim() || isLoading}
                className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-secondary transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-secondary/50 relative group"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
        <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-primary text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-bounce">
          1
        </span>
      </motion.button>
    </div>
  );
}
