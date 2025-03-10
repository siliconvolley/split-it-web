import { useState, useRef } from 'react';
import { Plus, Trash2 } from 'lucide-react';

import { calculateTotalAmount, getTimestamp } from '@/utils/BillUtils';
import {
  initializeBillTitle,
  initializeBillItems,
  saveBillTitle,
  saveBillItems,
} from '@/utils/BillStorage';

export default function BillEntryForm() {
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

  return (
    <main className="place-items-center px-2 py-4">
      <div className="bg-neutral-50 flex flex-col p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
        {/* <DisplayBillTitle /> */}

        <input
          name="billTitle"
          type="text"
          placeholder="Enter Bill Title"
          className="bg-inherit h-8 text-xl text-center font-extrabold"
          value={billTitle}
          onChange={e => {
            const newBillTitle = e.target.value;
            setBillTitle(newBillTitle);
            saveBillTitle(newBillTitle);
          }}
        />

        <span className="text-center">{timestamp}</span>

        {/* <AddBillItemsList /> */}

        <div className="grid my-2">
          <div
            className="bg-inherit grid grid-flow-col grid-cols-4 items-center gap-0 font-semibold text-xs text-neutral-500"
            style={{ gridTemplateColumns: '10% 50% 20% 20%' }}
          >
            <h3 className="text-start">No.</h3>
            <h3 className="pl-2">Item Name</h3>
            <h3 className="text-end pr-2">Quantity</h3>
            <h3 className="text-end pr-2">Price</h3>
          </div>
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-inherit grid grid-flow-col grid-cols-4 items-center gap-0"
              style={{ gridTemplateColumns: '10% 50% 20% 20%' }}
            >
              <span className="items-center">{index + 1}.</span>

              <input
                name="updatedItemName"
                type="text"
                placeholder="Enter Item Name"
                value={item.name}
                className="bg-inherit w-full px-2 py-1 resize-none overflow-hidden"
                onChange={e => {
                  const updatedItemName = e.target.value;
                  setItems(prevItems => {
                    const updatedItems = prevItems.map((item, i) =>
                      i === index ? { ...item, name: updatedItemName } : item
                    );
                    saveBillItems(updatedItems);
                    return updatedItems;
                  });
                }}
                onInput={e => {
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              />

              <input
                name="updatedItemQuantity"
                type="number"
                min="0"
                placeholder="Quantity"
                value={item.quantity || ''}
                className="bg-inherit w-full px-2 py-1 text-end remove-spinner-button"
                onChange={e => {
                  const updatedItemQuantity = Number(e.target.value);
                  setItems(prevItems => {
                    const updatedItems = prevItems.map((item, i) =>
                      i === index
                        ? { ...item, quantity: updatedItemQuantity }
                        : item
                    );
                    saveBillItems(updatedItems);
                    return updatedItems;
                  });
                }}
              />
              <input
                name="updatedItemPrice"
                type="number"
                min="0"
                placeholder="Price"
                value={item.price || ''}
                className="bg-inherit w-full px-2 py-1 text-end remove-spinner-button"
                onChange={e => {
                  const updatedItemPrice = Number(e.target.value);
                  setItems(prevItems => {
                    const updatedItems = prevItems.map((item, i) =>
                      i === index ? { ...item, price: updatedItemPrice } : item
                    );
                    saveBillItems(updatedItems);
                    return updatedItems;
                  });
                }}
              />
            </div>
          ))}

          <div
            className="grid grid-cols-3"
            style={{ gridTemplateColumns: '60% 20% 20%' }}
          >
            <input
              name="newItemName"
              ref={itemNameInputRef}
              type="text"
              placeholder="Enter Item Name"
              value={itemName}
              className="bg-inherit w-full px-2 py-1"
              onChange={e => {
                const newItemName = e.target.value;
                setItemName(newItemName);
              }}
            />
            <input
              name="newItemQuantity"
              type="number"
              min="0"
              placeholder="Quantity"
              value={itemQuantity || ''}
              className="bg-inherit w-full px-2 py-1 text-end remove-spinner-button"
              onChange={e => {
                const newItemQuantity = e.target.value
                  ? Number(e.target.value)
                  : '';
                setItemQuantity(newItemQuantity);
              }}
            />

            <input
              name="newItemPrice"
              type="number"
              min="0"
              placeholder="Price"
              value={itemPrice || ''}
              className="bg-inherit w-full px-2 py-1 text-end remove-spinner-button"
              onChange={e => {
                const newItemPrice = e.target.value
                  ? Number(e.target.value)
                  : '';
                setItemPrice(newItemPrice);
              }}
              onKeyDown={e => {
                if (e.key == 'Enter') {
                  addItem();
                  handleItemNameInputFocus();
                }
              }}
            />
          </div>
        </div>

        {/* <DisplayBillTotal /> */}

        <div className="flex justify-between pt-1">
          <span className="uppercase font-bold">Total: </span>
          <span className="font-bold">₹ {totalAmount.toFixed(2)}</span>
        </div>

        {/* <AddBillControls /> */}

        <div className="flex justify-between text-sm">
          <button
            className="bg-neutral-100 flex flex-row items-center shadow mt-4 py-1 px-2 rounded-lg font-semibold text-center text-neutral-800 hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleClearBillData}
            disabled={!billTitle.trim() && items.length === 0}
          >
            <Trash2 size={16} className="mr-1" />
            Clear Bill Data
          </button>
          <button
            className="bg-neutral-100 flex flex-row items-center shadow mt-4 py-1 px-2 rounded-lg font-semibold text-center text-neutral-800 hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={addItem}
            disabled={!itemName || !itemPrice}
          >
            <Plus size={16} className="mr-1" />
            Add Item
          </button>
        </div>
      </div>
    </main>
  );
}
