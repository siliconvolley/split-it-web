import { useState, useRef } from 'react';
import { getTimestamp } from '@/utils/BillUtils';
import { AddBillContext } from '@/contexts/AllContexts';
import {
  getBillTitle,
  getBillItems,
  getBillData,
  saveBillData,
  initializeBillData,
  getGstData,
  saveGstData,
  getDiscountData,
  saveDiscountData,
} from '@/utils/BillStorage';

const calculateTotalAmount = items =>
  items.reduce(
    (sum, item) =>
      sum +
      item.price * (typeof item.quantity === 'number' ? item.quantity : 1),
    0
  );

export default function AddBillContextProvider({ children }) {
  const [billTitle, setBillTitle] = useState(getBillTitle);
  const [items, setItems] = useState(getBillItems);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    price: 0,
  });

  // GST and Discount state
  const [isGstEnabled, setIsGstEnabled] = useState(() => getGstData().enabled);
  const [gstValue, setGstValue] = useState(() =>
    getGstData().percentage.toString()
  );
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(
    () => getDiscountData().enabled
  );
  const [discountValue, setDiscountValue] = useState(() =>
    getDiscountData().percentage.toString()
  );

  const itemNameInputRef = useRef(null);
  const timestamp = getTimestamp();
  const totalAmount = calculateTotalAmount(items);

  const addItem = () => {
    if (!newItem.name || !newItem.price) return;

    const itemToAdd = {
      name: newItem.name,
      quantity: newItem.quantity || 1, // Default to 1 only when adding
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
    setIsGstEnabled(false);
    setGstValue('');
    setIsDiscountEnabled(false);
    setDiscountValue('');
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
      const updatedItems = prevItems.map((item, i) => {
        if (i !== index) return item;
        return { ...item, [field]: value };
      });

      saveBillData({
        ...getBillData(),
        items: updatedItems,
        totalAmount: calculateTotalAmount(updatedItems),
      });
      return updatedItems;
    });
  };

  const handleGstToggle = enabled => {
    setIsGstEnabled(enabled);
    if (!enabled) {
      setGstValue('');
      saveGstData(false, 0);
    } else {
      saveGstData(true, Number(gstValue) || 0);
    }
  };

  const handleDiscountToggle = enabled => {
    setIsDiscountEnabled(enabled);
    if (!enabled) {
      setDiscountValue('');
      saveDiscountData(false, 0);
    } else {
      saveDiscountData(true, Number(discountValue) || 0);
    }
  };

  const handleGstValueChange = value => {
    setGstValue(value);
    if (isGstEnabled) {
      saveGstData(true, Number(value) || 0);
    }
  };

  const handleDiscountValueChange = value => {
    setDiscountValue(value);
    if (isDiscountEnabled) {
      saveDiscountData(true, Number(value) || 0);
    }
  };

  const value = {
    // State
    billTitle,
    setBillTitle: handleBillTitleChange,
    items,
    setItems,
    newItem,
    setNewItem,

    // GST and Discount state
    isGstEnabled,
    gstValue,
    isDiscountEnabled,
    discountValue,

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
    handleGstToggle,
    handleDiscountToggle,
    handleGstValueChange,
    handleDiscountValueChange,
  };

  return (
    <AddBillContext.Provider value={value}>{children}</AddBillContext.Provider>
  );
}
