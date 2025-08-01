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

// Helper function to calculate individual item's final price
const calculateItemFinalPrice = (
  basePrice,
  gstEnabled,
  gstPercentage,
  discountEnabled,
  discountPercentage
) => {
  let finalPrice = basePrice;

  // Apply GST
  if (gstEnabled) {
    finalPrice = finalPrice + finalPrice * (gstPercentage / 100);
  }

  // Apply discount
  if (discountEnabled) {
    finalPrice = finalPrice - finalPrice * (discountPercentage / 100);
  }

  return finalPrice;
};

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
  const [gstValue, setGstValue] = useState(() => {
    const gstData = getGstData();
    return gstData.enabled && gstData.percentage > 0
      ? gstData.percentage.toString()
      : '';
  });
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(
    () => getDiscountData().enabled
  );
  const [discountValue, setDiscountValue] = useState(() => {
    const discountData = getDiscountData();
    return discountData.enabled && discountData.percentage > 0
      ? discountData.percentage.toString()
      : '';
  });

  const itemNameInputRef = useRef(null);

  // Function to recalculate all item prices with current GST/discount
  const recalculateAllItemPrices = (
    gstEnabled,
    gstPercentage,
    discountEnabled,
    discountPercentage
  ) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item => ({
        ...item,
        price: calculateItemFinalPrice(
          item.basePrice || item.price, // Use basePrice if available, otherwise use current price
          gstEnabled,
          gstPercentage,
          discountEnabled,
          discountPercentage
        ),
      }));

      // Calculate total using final prices
      const actualTotal = updatedItems.reduce((sum, item) => {
        const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
        return sum + item.price * quantity;
      }, 0);

      saveBillData({
        ...getBillData(),
        items: updatedItems,
        totalAmount: actualTotal,
      });

      return updatedItems;
    });
  };

  const timestamp = getTimestamp();
  const totalAmount = items.reduce((sum, item) => {
    const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
    return sum + item.price * quantity;
  }, 0);

  const addItem = () => {
    if (!newItem.name || !newItem.price) return;

    const itemToAdd = {
      name: newItem.name,
      quantity: newItem.quantity || 1, // Default to 1 only when adding
      basePrice: Number(newItem.price), // Store original price
      price: calculateItemFinalPrice(
        Number(newItem.price),
        isGstEnabled,
        Number(gstValue) || 0,
        isDiscountEnabled,
        Number(discountValue) || 0
      ), // Store final price with GST/discount
    };

    setItems(prevItems => {
      const updatedItems = [...prevItems, itemToAdd];
      // Calculate total using final prices
      const actualTotal = updatedItems.reduce((sum, item) => {
        const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
        return sum + item.price * quantity;
      }, 0);

      saveBillData({
        ...getBillData(),
        items: updatedItems,
        totalAmount: actualTotal,
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

        let updatedItem = { ...item, [field]: value };

        // If price is being updated, store as basePrice and calculate final price
        if (field === 'price') {
          updatedItem.basePrice = Number(value);
          updatedItem.price = calculateItemFinalPrice(
            Number(value),
            isGstEnabled,
            Number(gstValue) || 0,
            isDiscountEnabled,
            Number(discountValue) || 0
          );
        }

        return updatedItem;
      });

      // Calculate total using final prices
      const actualTotal = updatedItems.reduce((sum, item) => {
        const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
        return sum + item.price * quantity;
      }, 0);

      saveBillData({
        ...getBillData(),
        items: updatedItems,
        totalAmount: actualTotal,
      });
      return updatedItems;
    });
  };

  const handleGstToggle = enabled => {
    setIsGstEnabled(enabled);
    if (!enabled) {
      setGstValue('');
      saveGstData(false, 0);
      // Recalculate all item prices without GST
      recalculateAllItemPrices(
        false,
        0,
        isDiscountEnabled,
        Number(discountValue) || 0
      );
    } else {
      saveGstData(true, Number(gstValue) || 0);
      // Recalculate all item prices with GST
      recalculateAllItemPrices(
        true,
        Number(gstValue) || 0,
        isDiscountEnabled,
        Number(discountValue) || 0
      );
    }
  };

  const handleDiscountToggle = enabled => {
    setIsDiscountEnabled(enabled);
    if (!enabled) {
      setDiscountValue('');
      saveDiscountData(false, 0);
      // Recalculate all item prices without discount
      recalculateAllItemPrices(isGstEnabled, Number(gstValue) || 0, false, 0);
    } else {
      saveDiscountData(true, Number(discountValue) || 0);
      // Recalculate all item prices with discount
      recalculateAllItemPrices(
        isGstEnabled,
        Number(gstValue) || 0,
        true,
        Number(discountValue) || 0
      );
    }
  };

  const handleGstValueChange = value => {
    setGstValue(value);
    if (isGstEnabled) {
      saveGstData(true, Number(value) || 0);
      // Recalculate all item prices with new GST value
      recalculateAllItemPrices(
        isGstEnabled,
        Number(value) || 0,
        isDiscountEnabled,
        Number(discountValue) || 0
      );
    }
  };

  const handleDiscountValueChange = value => {
    setDiscountValue(value);
    if (isDiscountEnabled) {
      saveDiscountData(true, Number(value) || 0);
      // Recalculate all item prices with new discount value
      recalculateAllItemPrices(
        isGstEnabled,
        Number(gstValue) || 0,
        isDiscountEnabled,
        Number(value) || 0
      );
    }
  };

  const handleDeleteItem = index => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter((_, i) => i !== index);

      // Calculate total using final prices
      const actualTotal = updatedItems.reduce((sum, item) => {
        const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
        return sum + item.price * quantity;
      }, 0);

      saveBillData({
        ...getBillData(),
        items: updatedItems,
        totalAmount: actualTotal,
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
    handleDeleteItem,
    handleGstToggle,
    handleDiscountToggle,
    handleGstValueChange,
    handleDiscountValueChange,
  };

  return (
    <AddBillContext.Provider value={value}>{children}</AddBillContext.Provider>
  );
}
