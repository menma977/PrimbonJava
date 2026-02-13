import React, {useState} from 'react';
import {ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sun} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {StandardPrimbon} from '@/utils/primbon';

export const JavaneseCalendar: React.FC = () => {
  const [viewDate, setViewDate] = useState(new Date());
  
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  
  const monthName = new Intl.DateTimeFormat('id-ID', {month: 'long'}).format(viewDate);
  const days = StandardPrimbon.getDaysInMonth(year, month);
  
  // Calculate empty slots for grid alignment
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 is Sunday
  const emptySlots = Array(firstDayOfWeek).fill(null);
  
  const prevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };
  
  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };
  
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <Card className="bg-surface border-primary/20 shadow-xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-primary/10 py-4">
          <CardTitle className="text-primary font-heading flex items-center gap-2">
            <CalendarIcon className="w-5 h-5"/>
            {monthName} {year}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={prevMonth} className="text-text-muted hover:text-primary">
              <ChevronLeft className="w-5 h-5"/>
            </Button>
            <Button variant="ghost" size="icon" onClick={nextMonth} className="text-text-muted hover:text-primary">
              <ChevronRight className="w-5 h-5"/>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-text-muted mb-2">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {emptySlots.map((_, i) => (
              <div key={`empty-${i}`} className="h-16 border border-transparent"/>
            ))}
            {days.map((d, i) => (
              <div
                key={i}
                className={`h-16 p-1 border rounded-md flex flex-col justify-between transition-all duration-300 ${
                  d.isHariBaik
                    ? 'border-primary/40 bg-primary/5 shadow-[0_0_10px_rgba(255,215,0,0.1)]'
                    : 'border-border/50 bg-background/30'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-sm font-bold ${d.isHariBaik ? 'text-primary' : 'text-text-primary'}`}>
                    {d.date.getDate()}
                  </span>
                  {d.isHariBaik && (
                    <Sun className="w-3 h-3 text-primary animate-pulse"/>
                  )}
                </div>
                <div className="text-[9px] uppercase tracking-tighter text-text-muted truncate">
                  {d.pasaran}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm border border-primary/40 bg-primary/20"/>
              <span className="text-text-muted">Hari Baik</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm border border-border/50 bg-background/30"/>
              <span className="text-text-muted">Hari Biasa</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
