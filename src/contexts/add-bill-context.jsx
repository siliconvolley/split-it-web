import { createContext, useState, useRef } from 'react';
import { getTimestamp } from '@/utils/BillUtils';
import {
  getBillTitle,
  getBillItems,
  getBillData,
  saveBillData,
  initializeBillData,
} from '@/utils/BillStorage';

export const AddBillContext = createContext(null);

const calculateTotalAmount = items =>
  items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

export default function AddBillContextProvider({ children }) {
  const [billTitle, setBillTitle] = useState(getBillTitle);
  const [items, setItems] = useState(getBillItems);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    price: 0,
  });

  const itemNameInputRef = useRef(null);
  const timestamp = getTimestamp();
  const totalAmount = calculateTotalAmount(items);

  const addItem = () => {
    if (!newItem.name || !newItem.price) return;

    const itemToAdd = {
      name: newItem.name,
      quantity: Number(newItem.quantity) || 1,
      price: Number(newItem.price),
    };

    setItems(prevItems => {
      const updatedItems = [...prevItems, itemToAdd];
      saveBillData({
        ...getBillData(),
        items: updatedItems,
        totalAmount: calculateTotalAmount(updatedItems),
      });
      return updatedItems;
    });

    setNewItem({ name: '', quantity: 1, price: 0 });
  };

  const handleBillTitleChange = title => {
    setBillTitle(title);
    saveBillData({
      ...getBillData(),
      title,
      timestamp,
    });
  };

  const handleClearBillData = () => {
    initializeBillData();
    setBillTitle('');
    setItems([]);
    setNewItem({ name: '', quantity: 1, price: 0 });
  };

  const handleItemNameInputFocus = () => {
    itemNameInputRef.current?.focus();
  };

  const checkIfBillExists = () => {
    if (!billTitle.trim() || items.length === 0) {
      return false;
    }
    return true;
  };

  const handleItemUpdate = (index, field, value) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      saveBillData({
        ...getBillData(),
        items: updatedItems,
        totalAmount: calculateTotalAmount(updatedItems),
      });
      return updatedItems;
    });
  };

  const value = {
    // State
    billTitle,
    setBillTitle: handleBillTitleChange,
    items,
    setItems,
    newItem,
    setNewItem,

    // Computed values
    timestamp,
    totalAmount,

    // Refs
    itemNameInputRef,

    // Actions
    addItem,
    handleClearBillData,
    handleItemNameInputFocus,
    checkIfBillExists,
    handleItemUpdate,
  };

  return (
    <AddBillContext.Provider value={value}>{children}</AddBillContext.Provider>
  );
}
