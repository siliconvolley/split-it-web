import { DisplaySharesContext } from '@/contexts/AllContexts';
import { useContext } from 'react';

export function useDisplayShares() {
  const context = useContext(DisplaySharesContext);
  if (!context) {
    throw new Error(
      'useDisplayShares must be used within a DisplaySharesContextProvider'
    );
  }
  return context;
}
