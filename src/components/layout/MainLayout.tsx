import React, {type ReactNode} from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
  return (
    <div className="min-h-screen bg-background text-text-primary font-body flex flex-col items-center">
      {/* Mystical Header */}
      <header className="w-full max-w-lg p-6 text-center flex flex-col items-center gap-4">
        <img src="/logo.png" alt="PrimbonJava Logo" className="w-24 h-24 object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.3)] animate-in zoom-in duration-700"/>
        <h1 className="text-3xl font-heading font-bold text-primary drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
          PRIMBON JAVA
        </h1>
        <p className="text-sm text-text-muted mt-2">
          Ancient Wisdom, Modern Insight
        </p>
      </header>
      
      {/* Content Area */}
      <main className="w-full max-w-4xl flex-1 px-4 pb-12">
        <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-xl relative overflow-hidden">
          {/* Batik Pattern Overlay (CSS only implies it) */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik.png')]"></div>
          
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full text-center py-4 text-xs text-text-muted opacity-50">
        © {new Date().getFullYear()} PrimbonJava • Mbah Artificial
      </footer>
    </div>
  );
};
