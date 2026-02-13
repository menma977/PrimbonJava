import React, {useState} from 'react';
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {StandardPrimbon} from "@/utils/primbon";
import {usePrimbon} from "@/context/PrimbonContext";

export const CompatibilityMatch: React.FC = () => {
  const {addToHistory, user} = usePrimbon();
  const [dateA, setDateA] = useState<string>('');
  const [dateB, setDateB] = useState<string>('');
  const [matchResult, setMatchResult] = useState<{ score: number, title: string, meaning: string } | null>(null);
  
  const handleMatch = () => {
    if (!dateA || !dateB) return;
    
    const wetonA = StandardPrimbon.getWeton(new Date(dateA));
    const wetonB = StandardPrimbon.getWeton(new Date(dateB));
    
    const result = StandardPrimbon.calculateMatch(wetonA.neptu, wetonB.neptu);
    setMatchResult(result);
    
    addToHistory({
      id: crypto.randomUUID(),
      userId: user?.id || 'guest',
      type: 'MATCH',
      input: {dateA, dateB},
      result: {wetonA, wetonB, match: result},
      createdAt: Date.now()
    });
  };
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="bg-surface border-primary/20">
        <CardHeader>
          <CardTitle className="text-center font-heading text-2xl text-primary">
            Cek Jodoh
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-text-muted">Your Date</label>
              <Input
                type="date"
                value={dateA}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateA(e.target.value)}
                className="bg-background border-border text-text-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-text-muted">Partner Date</label>
              <Input
                type="date"
                value={dateB}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateB(e.target.value)}
                className="bg-background border-border text-text-primary"
              />
            </div>
          </div>
          
          <Button
            onClick={handleMatch}
            className="w-full bg-primary text-primary-foreground font-bold h-10 mt-4"
          >
            Analyze Compatibility
          </Button>
        </CardContent>
      </Card>
      
      {matchResult && (
        <div className="text-center space-y-4 animate-in zoom-in duration-500">
          <div className="p-6 bg-surface/80 border border-primary/50 rounded-xl">
            <h3 className="text-text-muted text-xs uppercase tracking-widest mb-1">Compatibility Result</h3>
            <div className="text-2xl font-heading font-bold text-primary mb-2">
              {matchResult.title}
            </div>
            <div className="text-4xl font-bold text-white mb-4">
              {matchResult.score}%
            </div>
            <p className="text-sm text-text-primary/80 italic">
              "{matchResult.meaning}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
