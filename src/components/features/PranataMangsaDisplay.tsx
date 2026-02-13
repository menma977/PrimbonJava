import {StandardPrimbon} from '@/utils/primbon';
import {CloudSun} from 'lucide-react';

export const PranataMangsaDisplay = () => {
  const today = new Date();
  const season = StandardPrimbon.getPranataMangsa(today);
  
  return (
    <div className="flex items-center justify-center gap-2 p-3 bg-surface/30 rounded-lg border border-primary/20 text-text-muted text-sm mt-4">
      <CloudSun className="w-4 h-4 text-primary"/>
      <span>
        Current Season: <strong className="text-primary">{season.name}</strong> - {season.description}
      </span>
    </div>
  );
};
