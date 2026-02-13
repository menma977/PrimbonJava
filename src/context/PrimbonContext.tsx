import React, {createContext, useContext, useEffect, useState} from 'react';
import {type UserProfile, type HistoryRecord, STORAGE_KEYS} from '@/types/core';

interface PrimbonContextType {
  user: UserProfile | null;
  saveUser: (user: UserProfile) => void;
  removeUser: () => void;
  history: HistoryRecord[];
  addToHistory: (record: HistoryRecord) => void;
  bgMode: 'dark' | 'light';
}

const PrimbonContext = createContext<PrimbonContextType | undefined>(undefined);

export const PrimbonProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  
  // Load from Storage on Mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USERS);
    const storedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
    
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);
  
  const saveUser = (newUser: UserProfile) => {
    setUser(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(newUser));
  };
  
  const removeUser = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USERS);
  };
  
  const addToHistory = (record: HistoryRecord) => {
    const newHistory = [record, ...history].slice(0, 50); // Keep last 50
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
  };
  
  return (
    <PrimbonContext.Provider value={{
      user,
      saveUser,
      removeUser,
      history,
      addToHistory,
      bgMode: 'dark'
    }}>
      {children}
    </PrimbonContext.Provider>
  );
};

export const usePrimbon = () => {
  const context = useContext(PrimbonContext);
  if (!context) {
    throw new Error('usePrimbon must be used within a PrimbonProvider');
  }
  return context;
};
