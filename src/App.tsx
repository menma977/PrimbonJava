import {useState} from "react";
import {PrimbonProvider} from "@/context/PrimbonContext";
import {MainLayout} from "@/components/layout/MainLayout";
import {Button} from "@/components/ui/button";
import {WetonCalculator} from "@/components/features/WetonCalculator";
import {CompatibilityMatch} from "@/components/features/CompatibilityMatch";
import {WeddingCalculator} from "@/components/features/WeddingCalculator";
import {CircumcisionCalculator} from "@/components/features/CircumcisionCalculator";
import {PranataMangsaDisplay} from "@/components/features/PranataMangsaDisplay";
import {AIChat} from "@/components/features/AIChat";
import {JavaneseCalendar} from "@/components/features/JavaneseCalendar";
import {Calendar, Heart, Scissors, MessageCircle, Sun, CalendarDays} from "lucide-react";

type ViewState = 'HOME' | 'WETON' | 'MATCH' | 'WEDDING' | 'CIRCUMCISION' | 'CHAT' | 'CALENDAR';

function App() {
  const [view, setView] = useState<ViewState>('HOME');
  
  const renderContent = () => {
    switch (view) {
      case 'WETON':
        return <WetonCalculator/>;
      case 'MATCH':
        return <CompatibilityMatch/>;
      case 'WEDDING':
        return <WeddingCalculator/>;
      case 'CIRCUMCISION':
        return <CircumcisionCalculator/>;
      case 'CHAT':
        return <AIChat/>;
      case 'CALENDAR':
        return <JavaneseCalendar/>;
      default:
        return (
          <div className="space-y-6 text-center animate-in fade-in duration-500">
            <h2 className="text-xl font-heading text-primary">Sugeng Rawuh</h2>
            <p className="text-text-muted">
              Welcome to the digital realm of Javanese divination.
            </p>
            
            <PranataMangsaDisplay/>
            
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button
                onClick={() => setView('WETON')}
                className="bg-primary/90 text-primary-foreground hover:bg-primary font-bold h-24 flex flex-col gap-2"
              >
                <Sun className="w-6 h-6"/>
                Cek Weton
              </Button>
              <Button
                onClick={() => setView('MATCH')}
                className="bg-surface border-2 border-primary text-primary hover:bg-primary/10 h-24 flex flex-col gap-2"
              >
                <Heart className="w-6 h-6"/>
                Jodoh
              </Button>
              <Button
                onClick={() => setView('CALENDAR')}
                className="bg-surface border border-primary/50 text-primary hover:bg-primary/10 h-24 flex flex-col gap-2"
              >
                <CalendarDays className="w-6 h-6"/>
                Kalender Jawa
              </Button>
              <Button
                onClick={() => setView('WEDDING')}
                className="bg-surface border border-primary/50 text-primary hover:bg-primary/10 h-24 flex flex-col gap-2"
              >
                <Calendar className="w-6 h-6"/>
                Hari Nikah
              </Button>
              <Button
                onClick={() => setView('CIRCUMCISION')}
                className="bg-surface border border-primary/30 text-text-muted hover:bg-primary/10 h-24 flex flex-col gap-2"
              >
                <Scissors className="w-6 h-6"/>
                Sunatan
              </Button>
              <Button
                onClick={() => setView('CHAT')}
                className="bg-gradient-to-r from-slate-800 to-slate-900 border border-primary/30 text-text-muted hover:text-primary h-24 flex flex-col items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5"/>
                Tanya Mbah
              </Button>
            </div>
          </div>
        );
    }
  };
  
  return (
    <PrimbonProvider>
      <MainLayout>
        {view !== 'HOME' && (
          <Button
            variant="ghost"
            onClick={() => setView('HOME')}
            className="mb-4 text-text-muted hover:text-primary pl-0 flex items-center gap-2"
          >
            ← Kembali
          </Button>
        )}
        {renderContent()}
      </MainLayout>
    </PrimbonProvider>
  );
}

export default App;
