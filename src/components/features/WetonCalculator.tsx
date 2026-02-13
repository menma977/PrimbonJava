import React, {useState} from 'react';
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {StandardPrimbon} from "@/utils/primbon";
import {usePrimbon} from "@/context/PrimbonContext";
import type {WetonData} from "@/types/core";

export const WetonCalculator: React.FC = () => {
  const {addToHistory, user} = usePrimbon();
  const [date, setDate] = useState<string>('');
  const [result, setResult] = useState<WetonData | null>(null);
  
  const handleCalculate = () => {
    if (!date) return;
    const dateObj = new Date(date);
    const weton = StandardPrimbon.getWeton(dateObj);
    setResult(weton);
    
    // Save to History
    addToHistory({
      id: crypto.randomUUID(),
      userId: user?.id || 'guest',
      type: 'WETON',
      input: {date},
      result: weton,
      createdAt: Date.now()
    });
  };
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="bg-surface border-primary/20 shadow-lg shadow-primary/5">
        <CardHeader>
          <CardTitle className="text-center font-heading text-2xl text-primary">
            Cek Weton
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-text-muted">Tanggal Lahir (Masehi)</label>
            <Input
              type="date"
              value={date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
              className="bg-background border-border focus:border-primary text-text-primary h-12"
            />
          </div>
          
          <Button
            onClick={handleCalculate}
            className="w-full bg-primary text-primary-foreground font-bold h-12 text-lg hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] transition-all"
          >
            Reveal Destiny
          </Button>
        </CardContent>
      </Card>
      
      {result && (
        <div className="text-center space-y-4 animate-in zoom-in duration-500">
          <div className="p-8 bg-surface/80 border border-primary/50 rounded-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <h3 className="text-text-muted text-sm uppercase tracking-widest mb-2">Your Weton Is</h3>
            <div className="text-4xl font-heading font-bold text-primary mb-2 drop-shadow-md">
              {result.dina} {result.pasaran}
            </div>
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
              Neptu: {result.neptu}
            </div>
          </div>
          
          <p className="text-xs text-text-muted italic">
            "Harmony between the day and the market brings balance to the soul."
          </p>
        </div>
      )}
    </div>
  );
};
