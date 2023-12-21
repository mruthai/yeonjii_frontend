import React, { createContext, ReactNode, useState } from 'react';

import axios from 'axios';


interface Correction {
  error: string;
  suggestion: string;
}


type GrammarContextValue = {
  corrections: Correction[];
  setCorrections: React.Dispatch<React.SetStateAction<Correction[]>>;
  fetchCorrections: () => void;
  isEditing: boolean;  
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GrammarContext = createContext<GrammarContextValue>({
  corrections: [],
  setCorrections: () => {}, 
  fetchCorrections: () => {},
  isEditing: false,
  setIsEditing: () => {},
});


type GrammarProviderProps = {
  children: ReactNode;
};


export const GrammarProvider: React.FC<GrammarProviderProps> = ({ children }) => {
  const [corrections, setCorrections] = useState<Correction[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const axiosInstance = axios.create({
    baseURL: "https://craftly-backend.onrender.com",
  });

  const fetchCorrections = async () => {
    try {
      const response = await axiosInstance.post('/api/get_cover_letter_corrections', { session_id: 'your-session-id' });

      if (Array.isArray(response.data)) {
        setCorrections(response.data as Correction[]); 
      } else {
        console.error('Invalid data format for grammar corrections:', response.data);
      }
    } catch (error) {
      console.error('Error fetching grammar corrections:', error);
    }
  };


  const contextValue: GrammarContextValue = {
    corrections,
    setCorrections,
    fetchCorrections,
    isEditing,
    setIsEditing
  };

  return (
    <GrammarContext.Provider value={contextValue}>
      {children}
    </GrammarContext.Provider>
  );
};
