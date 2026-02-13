import React, {useState, useRef, useEffect} from 'react';
import {Card, CardHeader, CardTitle, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {usePrimbon} from "@/context/PrimbonContext";
import {type ChatMessage, generateMbahResponse} from "@/services/ai";
import ReactMarkdown from 'react-markdown';

export const AIChat: React.FC = () => {
  const {user} = usePrimbon();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: ChatMessage = {role: 'user', content: input};
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    
    // Call AI
    const reply = await generateMbahResponse([...messages, userMsg], user);
    
    const mbahMsg: ChatMessage = {role: 'assistant', content: reply};
    setMessages(prev => [...prev, mbahMsg]);
    setLoading(false);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };
  
  return (
    <div className="h-[80vh] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="flex-1 flex flex-col bg-surface border-primary/20 shadow-lg mb-4 overflow-hidden">
        <CardHeader className="py-4 border-b border-primary/10">
          <CardTitle className="text-center font-heading text-xl text-primary flex items-center justify-center gap-2">
            <span>🧙‍♂️</span> Tanya Mbah
          </CardTitle>
          <p className="text-center text-xs text-text-muted">
            Primbon Oracle (Powered by GLM-4 & Gemini)
          </p>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {messages.length === 0 && (
            <div className="text-center text-text-muted opacity-50 mt-10">
              <p>Monggo, tanyakan apa saja...</p>
              <p className="text-xs mt-2">(e.g., "Hari ini baik untuk pindah rumah?")</p>
            </div>
          )}
          
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${
                m.role === 'user'
                  ? 'bg-primary/20 text-text-primary rounded-tr-none'
                  : 'bg-background/80 border border-primary/20 text-text-primary rounded-tl-none prose prose-invert prose-p:my-0 prose-ul:my-2 prose-li:my-0 prose-headings:text-primary'
              }`}>
                {m.role === 'assistant' ? (
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-background/80 border border-primary/20 text-text-muted rounded-lg p-3 text-xs italic">
                Mbah is meditating...
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-4 border-t border-primary/10">
          <div className="flex w-full gap-2">
            <Input
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Tulis pesan..."
              disabled={loading}
              className="bg-background border-border"
            />
            <Button
              onClick={handleSend}
              disabled={loading}
              className="bg-primary text-primary-foreground font-bold"
            >
              Send
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
