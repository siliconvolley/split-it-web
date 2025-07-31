import { useAddBill } from '@/hooks/useAddBill';

export default function BillEntryItemsList() {
  const {
    items,
    newItem,
    setNewItem,
    itemNameInputRef,
    addItem,
    handleItemNameInputFocus,
    handleItemUpdate,
    isGstEnabled,
    gstValue,
    isDiscountEnabled,
    discountValue,
    handleGstToggle,
    handleDiscountToggle,
    handleGstValueChange,
    handleDiscountValueChange,
  } = useAddBill();

  return (
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

      {/* Existing Items */}
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
        </div>
      ))}

      {/* New Item Entry */}
      <div
        className="grid grid-cols-4 items-center"
        style={{ gridTemplateColumns: '10% 50% 20% 20%' }}
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
      </div>

      <div className="grid gap-2 mt-2">
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
            <span>Include GST</span>
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            className={`remove-spinner-button rounded-md max-w-32 text-right text-[0.85rem] px-1 py-0.5 ${
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
            <span>Include Discount</span>
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            className={`remove-spinner-button rounded-md max-w-32 text-right text-[0.85rem] px-1 py-0.5 ${
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
