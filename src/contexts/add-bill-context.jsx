import { createContext, useState, useRef } from 'react';

import { calculateTotalAmount, getTimestamp } from '@/utils/BillUtils';
import {
  initializeBillTitle,
  initializeBillItems,
  saveBillTitle,
  saveBillItems,
} from '@/utils/BillStorage';

export const AddBillContext = createContext(null);

export default function AddBillContextProvider({ children }) {
  const [billTitle, setBillTitle] = useState(initializeBillTitle);
  const [items, setItems] = useState(initializeBillItems);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemPrice, setItemPrice] = useState(0);

  const timestamp = getTimestamp();
  const totalAmount = calculateTotalAmount(items);
  const itemNameInputRef = useRef(null);

  const addItem = () => {
    if (!itemName || !itemPrice) return;

    const newItem = {
      name: itemName,
      quantity: Number(itemQuantity) || 1,
      price: Number(itemPrice),
    };

    setItems(prevItems => {
      const updatedItems = [...prevItems, newItem];
      saveBillItems(updatedItems);
      return updatedItems;
    });

    setItemName('');
    setItemQuantity(1);
    setItemPrice(0);
  };

  const handleClearBillData = () => {
    setBillTitle('');
    setItems([]);
    saveBillTitle('');
    saveBillItems([]);
  };

  const handleItemNameInputFocus = () => {
    if (itemNameInputRef.current) itemNameInputRef.current.focus();
  };

  const value = {
    // State
    billTitle,
    setBillTitle,
    items,
    setItems,
    itemName,
    setItemName,
    itemQuantity,
    setItemQuantity,
    itemPrice,
    setItemPrice,
    
    // Computed values
    timestamp,
    totalAmount,
    
    // Refs
    itemNameInputRef,
    
    // Actions
    addItem,
    handleClearBillData,
    handleItemNameInputFocus,
    
    // Utils
    saveBillTitle,
    saveBillItems
  };

  return (
    <AddBillContext.Provider value={value}>
      {children}
    </AddBillContext.Provider>
  );
}