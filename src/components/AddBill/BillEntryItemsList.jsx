import { useAddBill } from '@/hooks/useAddBill';

export default function BillEntryItemsList() {
  const {
    items,
    newItem,
    setNewItem,
    itemNameInputRef,
    addItem,
    handleItemNameInputFocus,
    handleItemUpdate
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
    </div>
  );
}
