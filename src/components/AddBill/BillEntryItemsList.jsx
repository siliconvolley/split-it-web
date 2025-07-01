import { useAddBill } from "@/hooks/useAddBill";
import { saveBillItems } from "@/utils/BillStorage";

export default function BillEntryItemsList() {
  const {
    items,
    setItems,
    itemName,
    setItemName,
    itemQuantity,
    setItemQuantity,
    itemPrice,
    setItemPrice,
    itemNameInputRef,
    addItem,
    handleItemNameInputFocus,
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
        className="grid grid-cols-4 items-center"
        style={{ gridTemplateColumns: '10% 50% 20% 20%' }}
      >
        <span>{items.length+1}.</span>
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
            const newItemPrice = e.target.value ? Number(e.target.value) : '';
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
  );
}
