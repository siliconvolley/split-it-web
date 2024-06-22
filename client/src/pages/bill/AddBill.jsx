import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

function AddBill() {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemPrice, setItemPrice] = useState('');

  const itemNameInputRef = useRef(null);
  const quantityInputRef = useRef(null);
  const priceInputRef = useRef(null);

  const navigate = useNavigate();

  const timestamp = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());

  const addItem = () => {
    if (!itemName || !itemPrice) return;
    const newItem = {
      serialNumber: items.length + 1,
      name: itemName,
      quantity: Number(itemQuantity),
      price: Number(itemPrice),
    };
    setItems([...items, newItem]);
    setItemName('');
    setItemQuantity(1);
    setItemPrice('');
    itemNameInputRef.current.focus();
  };

  const totalAmount = items.reduce(
    (acc, item) => Number(acc) + Number(item.quantity) * Number(item.price),
    0
  );

  const navigateAndLogState = () => {
    const stateToPass = {
      title: title,
      timestamp: timestamp,
      items: items.map(({ name, price, quantity }) => ({ name, price, quantity })),
      totalAmount: totalAmount.toFixed(2),
    };

    console.log(stateToPass); // Log the state
    navigate('/bill/split', { state: stateToPass });
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full sm:max-w-xl relative">
          <nav className="flex mx-4 my-8">
            <Link to="/" className="absolute">
              <ChevronLeft color="#262626" size="32" />
            </Link>
            <span className="text-2xl font-bold flex-grow text-center">
              Add Bill
            </span>
          </nav>

          <main className="flex justify-center">
            <div className="w-full sm:max-w-xl">
              <div className="my-8 mx-4 flex justify-center">
                <div className="w-full sm:w-[35rem] p-4 bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg flex flex-col justify-center">
                  <input
                    type="text"
                    placeholder="Enter Bill Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="h-[2rem] text-[1.25rem] font-extrabold text-center bg-inherit"
                  />

                  <span className="text-center">
                    {new Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    }).format(new Date())}
                  </span>

                  <div className="flex justify-between">
                    <span className="font-bold">Total: </span>
                    <span>Rs. {totalAmount.toFixed(2)}</span>
                  </div>

                  <div className="grid my-4">
                    {items.map(item => (
                      <div
                        key={item.serialNumber}
                        className="grid grid-flow-col grid-cols-4 gap-0 bg-inherit"
                        style={{ gridTemplateColumns: '10% 50% 20% 20%' }}
                      >
                        <div className="">{item.serialNumber}.</div>
                        <div className="">{item.name}</div>
                        <div className="text-end">x{item.quantity} </div>
                        <div className="text-end">{item.price.toFixed(2)}</div>
                      </div>
                    ))}
                    <div
                      className="grid grid-flow-col grid-cols-3 gap-0 pt-1 bg-inherit [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      style={{ gridTemplateColumns: '60% 20% 20%' }}
                    >
                      <input
                        ref={itemNameInputRef}
                        type="text"
                        placeholder="Item Name"
                        value={itemName}
                        className="bg-inherit px-2 py-1 w-full"
                        onChange={e => setItemName(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            quantityInputRef.current.focus();
                          }
                        }}
                      />
                      <input
                        ref={quantityInputRef}
                        type="number"
                        placeholder="Quantity"
                        value={itemQuantity}
                        className="bg-inherit w-full px-2 py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-end"
                        onChange={e => setItemQuantity(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            priceInputRef.current.focus();
                          }
                        }}
                      />
                      <input
                        ref={priceInputRef}
                        type="number"
                        placeholder="Price"
                        value={itemPrice}
                        className="bg-inherit w-full px-2 py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-end"
                        onChange={e => setItemPrice(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            addItem();
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={addItem}
                      className="text-center hover:bg-neutral-300 text-neutral-800 py-1 px-2 rounded-lg"
                    >
                      + Add Item
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center my-[6rem]">
                <button
                  onClick={navigateAndLogState}
                  className="w-[15rem] text-center bg-neutral-800 hover:bg-neutral-700 transition-colors duration-150 ease-in-out text-white font-bold py-3 px-4 rounded-lg"
                >
                  Add Bill
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default AddBill;
