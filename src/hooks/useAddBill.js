import { AddBillContext } from '@/contexts/AddBillContext';
import { useContext } from 'react';

export function useAddBill() {
  const context = useContext(AddBillContext);
  if (!context) {
    throw new Error('useAddBill must be used within an AddBillContextProvider');
  }
  return context;
}
