import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import BackArrow from '../../assets/back_arrow.svg';

function AddBill() {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemPrice, setItemPrice] = useState('');

  const itemNameInputRef = useRef(null);
  const quantityInputRef = useRef(null);
  const priceInputRef = useRef(null);

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
    (acc, item) => acc + item.price,
    0
  );

  return (
    <>
      <div className="flex justify-center min-h-screen w-full">
        <div className="max-w-[40rem] w-full m-5">
          <div className="m-5">
            <div className="flex items-center w-full">
              <div className="absolute flex-shrink-0">
                <Link to="/">
                  <img src={BackArrow} alt="Back Arrow" className="w-8 h-8" />
                </Link>
              </div>
              <span className="text-2xl font-bold flex-grow text-center">
                Add Bill
              </span>
            </div>
            <div className="my-8 mx-2 display-bill flex justify-center">
              <div className="w-[28rem]  py-4 px-4 bg-neutral-200 rounded-lg flex flex-col justify-center">
                <input
                  type="text"
                  placeholder="Enter Bill Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="h-[2rem] font-semibold text-center bg-inherit"
                />

                <span className="text-center">
                  {new Date().toLocaleString()}
                </span>

                <div className="flex justify-between">
                  <span className="font-bold">Total: </span>
                  <span>Rs. {totalAmount.toFixed(2)}</span>
                </div>

                <div className="grid my-4">
                  {items.map(item => (
                    <div
                      key={item.serialNumber}
                      className="grid grid-flow-col grid-cols-4 gap-0 bg-inherit [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      style={{ gridTemplateColumns: '10% 50% 20% 20%' }}
                    >
                      <div className="">{item.serialNumber}.</div>
                      <div className="">{item.name}</div>
                      <div className="text-end">x{item.quantity} </div>
                      <div className="text-end">{item.price}</div>
                    </div>
                  ))}
                  <div
                    className="grid grid-flow-col grid-cols-3 gap-0 bg-inherit pt-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
              <div className="w-[15rem] text-center bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 px-4 rounded-lg">
                <Link>Add Bill</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddBill;
