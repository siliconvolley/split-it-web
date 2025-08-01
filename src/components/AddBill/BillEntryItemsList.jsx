import { useAddBill } from '@/hooks/useAddBill';
import { X } from 'lucide-react';

export default function BillEntryItemsList() {
  const {
    items,
    newItem,
    setNewItem,
    itemNameInputRef,
    addItem,
    handleItemNameInputFocus,
    handleItemUpdate,
    handleDeleteItem,
    isGstEnabled,
    gstValue,
    isDiscountEnabled,
    discountValue,
    handleGstToggle,
    handleDiscountToggle,
    handleGstValueChange,
    handleDiscountValueChange,
  } = useAddBill();

  const gridColumnsTemplateValue = '7% 48% 20% 18% 7%';

  return (
    <div className="grid my-2">
      <div
        className="bg-inherit grid grid-flow-col items-center gap-0 font-semibold text-xs text-neutral-500"
        style={{ gridTemplateColumns: gridColumnsTemplateValue }}
      >
        <h3 className="text-start">No.</h3>
        <h3 className="pl-2">Item Name</h3>
        <h3 className="text-end pr-2">Quantity</h3>
        <h3 className="text-end pr-2">Price</h3>
        <span aria-label="Actions"/>
      </div>

      {/* Existing Items */}
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-inherit grid grid-flow-col items-center gap-0 text-[0.9rem]"
          style={{ gridTemplateColumns: gridColumnsTemplateValue }}
        >
          <span className="items-center">{index + 1}.</span>

          <input
            name="updatedItemName"
            type="text"
            placeholder="Enter Item Name"
            value={item.name}
            className="bg-inherit w-full px-2 py-1 resize-none overflow-hidden"
            onChange={e => handleItemUpdate(index, 'name', e.target.value)}
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
              handleItemUpdate(index, 'quantity', Number(e.target.value));
            }}
          />

          <input
            name="updatedItemPrice"
            type="number"
            min="0"
            placeholder="Price"
            value={item.price || ''}
            className="bg-inherit w-full px-2 py-1 text-end remove-spinner-button"
            onChange={e =>
              handleItemUpdate(index, 'price', Number(e.target.value))
            }
          />

          <button
            onClick={() => handleDeleteItem(index)}
            className="flex items-center justify-center justify-self-end w-5 h-5 sm:w-7 sm:h-7 text-red-600 bg-red-100 hover:bg-red-200 rounded border border-transparent transition-colors focus:outline-none"
            title="Delete this item"
            aria-label={`Delete ${item.name || 'item'}`}
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>
      ))}

      {/* New Item Entry */}
      <div
        className="grid items-center text-[0.9rem]"
        style={{ gridTemplateColumns: gridColumnsTemplateValue }}
      >
        <span>{items.length + 1}.</span>
        <input
          name="newItemName"
          ref={itemNameInputRef}
          type="text"
          placeholder="Enter Item Name"
          value={newItem.name}
          className="bg-inherit w-full px-2 py-1"
          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          name="newItemQuantity"
          type="number"
          min="0"
          placeholder="Quantity"
          value={newItem.quantity || ''}
          className="bg-inherit w-full px-2 py-1 text-end remove-spinner-button"
          onChange={e => {
            const value = e.target.value ? Number(e.target.value) : 0;
            setNewItem({ ...newItem, quantity: value });
          }}
        />
        <input
          name="newItemPrice"
          type="number"
          min="0"
          placeholder="Price"
          value={newItem.price || ''}
          className="bg-inherit w-full px-2 py-1 text-end remove-spinner-button"
          onChange={e => {
            const value = e.target.value ? Number(e.target.value) : 0;
            setNewItem({ ...newItem, price: value });
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              addItem();
              handleItemNameInputFocus();
            }
          }}
        />
        <span aria-hidden="true" />
      </div>
      <div className="dashed my-2" />

      <div className="grid gap-1">
        <span className="flex justify-between items-center">
          <label
            htmlFor="gst-checkbox"
            className="w-max flex items-center gap-2 text-[0.85rem] text-neutral-500 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              name="GST"
              id="gst-checkbox"
              className="rounded"
              checked={isGstEnabled}
              onChange={e => handleGstToggle(e.target.checked)}
            />
            <span className="mr-2">Include GST</span>
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            className={`remove-spinner-button rounded-md text-right text-[0.85rem] px-1 py-0.5 ${
              isGstEnabled
                ? 'bg-neutral-200 text-neutral-900'
                : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            }`}
            placeholder="GST %"
            value={gstValue}
            disabled={!isGstEnabled}
            onChange={e => handleGstValueChange(e.target.value)}
          />
        </span>

        <span className="flex justify-between items-center">
          <label
            htmlFor="discount-checkbox"
            className="w-max flex items-center gap-2 text-[0.85rem] text-neutral-500 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              name="Discount"
              id="discount-checkbox"
              className="rounded"
              checked={isDiscountEnabled}
              onChange={e => handleDiscountToggle(e.target.checked)}
            />
            <span className="mr-2">Include Discount</span>
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            className={`remove-spinner-button rounded-md text-right text-[0.85rem] px-1 py-0.5 ${
              isDiscountEnabled
                ? 'bg-neutral-200 text-neutral-900'
                : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            }`}
            placeholder="Discount %"
            value={discountValue}
            disabled={!isDiscountEnabled}
            onChange={e => handleDiscountValueChange(e.target.value)}
          />
        </span>
      </div>
    </div>
  );
}
