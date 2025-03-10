import { createContext } from 'react';

const AddBillContext = createContext();

export const AddBillProvider = ({ children }) => {
  return <AddBillContext.Provider>{children}</AddBillContext.Provider>;
};
