import { initializeBillTitle } from '@/utils/BillStorage';

import { createContext, useContext, useState } from 'react';

const AddBillContext = createContext();

export const AddBillProvider = ({ children }) => {
  const [billTitle, setBillTitle] = useState(initializeBillTitle);

  return (
    <AddBillContext.Provider value={{ billTitle, setBillTitle }}>
      {children}
    </AddBillContext.Provider>
  );
};

export const useBillTitle = () => {
  const { billTitle, setBillTitle } = useContext(AddBillContext);
  return [billTitle, setBillTitle];
};
