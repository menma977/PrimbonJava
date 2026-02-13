import {useState} from 'react';
import {StandardPrimbon} from '@/utils/primbon';
import {Scissors, Calendar} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

export const CircumcisionCalculator = () => {
  const [date, setDate] = useState('');
  const [results, setResults] = useState<Date[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  const handleCalculate = () => {
    if (!date) return;
    
    const d = new Date(date);
    const w = StandardPrimbon.getWeton(d);
    
    const dates = StandardPrimbon.findCircumcisionDates(w.neptu);
    setResults(dates);
    setHasCalculated(true);
  };
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading text-primary flex items-center justify-center gap-2">
          <Scissors className="w-6 h-6"/>
          Hari Baik Sunat
        </h2>
        <p className="text-text-muted text-sm">
          Find auspicious dates for circumcision rituals.
        </p>
      </div>
      
      <Card className="bg-surface/50 border-border shadow-lg backdrop-blur-sm">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Child's Birthdate</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-background/50 border-border focus:border-primary"
            />
          </div>
          
          <Button
            onClick={handleCalculate}
            disabled={!date}
            className="w-full bg-primary hover:bg-primary/90 text-background font-bold"
          >
            Calculate Dates
          </Button>
        </CardContent>
      </Card>
      
      {hasCalculated && (
        <Card className="bg-surface/50 border-primary/20 shadow-lg animate-in zoom-in-95 duration-500">
          <CardHeader>
            <CardTitle className="text-center text-xl text-primary flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5"/>
              Recommended Dates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.length > 0 ? (
              <ul className="space-y-2">
                {results.map((d, idx) => {
                  const w = StandardPrimbon.getWeton(d);
                  return (
                    <li key={idx} className="p-3 bg-background/40 rounded border border-border flex justify-between items-center">
                      <span className="font-bold text-primary">{d.toLocaleDateString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</span>
                      <span className="text-sm text-text-muted">{w.dina} {w.pasaran} (Neptu {w.neptu})</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-center text-text-muted">No suitable dates found in the next few weeks. Try searching again later.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
