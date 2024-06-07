import React, { createContext, useContext, useMemo, useState } from 'react';
import { generateRandomEmail } from './lib/utils';

interface ContextProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const initialContext: ContextProps = {
  email: generateRandomEmail(),
  setEmail: () => {},
};

const EmailContext = createContext<ContextProps>(initialContext);

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error('useEmail must be used within a EmailProvider');
  }
  return context;
}

export const EmailProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [email, setEmail] = useState<string>(initialContext.email);

  const value = useMemo(() => ({ email, setEmail }), [email]);

  return (
    <EmailContext.Provider value={value}>
      {children}
    </EmailContext.Provider>
  );
};