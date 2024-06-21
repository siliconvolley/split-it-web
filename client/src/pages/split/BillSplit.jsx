import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Utensils, Plus } from 'lucide-react';

function BillSplit() {
  const [items, setItems] = useState([]);

  const addItem = () => {
    const newItem = items.length + 1;
    setItems([...items, newItem]);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full sm:max-w-xl relative">
        <nav className="flex mx-4 my-8">
          <Link to="/bill" className="absolute">
            <ChevronLeft color="#262626" size="32" />
          </Link>
          <span className="text-2xl font-bold flex-grow text-center">
            Split the Bill
          </span>
        </nav>

        <main className="flex flex-col justify-center">
          <div className="w-full sm:max-w-xl">
            <div className="mx-4 flex flex-col justify-center">
              <div
                className="w-full sm:w-[34rem] grid gap-x-4 p-4 bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
                style={{ gridTemplateColumns: '55% 45%' }}
              >
                <div className="flex flex-col justify-between">
                  <div className="grid grid-flow-col gap-4 justify-start">
                    <div className="bg-neutral-800 w-fit h-fit p-2 rounded-full">
                      <Utensils color="#eeeeee" />
                    </div>
                    <div>
                      <p className="font-bold">Hamburg</p>
                      <p className="text-sm">
                        {new Intl.DateTimeFormat('en-GB', {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        }).format(new Date())}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p>
                      <span className="font-bold">Total:</span>
                    </p>
                    <p>
                      <span className="text-sm font-semibold">Rs.</span>{' '}
                      <span className="font-extrabold">120.48</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col  mr-4">
                  <Link className="my-1 text-center bg-neutral-800 hover:bg-neutral-700 transition-colors duration-150 ease-in-out text-white font-bold py-3 px-4 rounded-lg">
                    Split
                  </Link>
                  <Link className="my-1 flex-1 text-center inner-border hover:bg-neutral-200 transition-colors duration-150 ease-in-out font-bold py-3 px-4 rounded-lg">
                    Split evenly
                  </Link>
                </div>
              </div>

              <div className="my-8">
                <p className="font-bold">Share with</p>
                <div className="flex gap-x-2 my-4">
                  <div className="grid grid-flow-col grid-cols-6 gap-x-2">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="w-[4rem] h-[4rem] bg-neutral-200 inner-border rounded-full grid place-items-center"
                      >
                        {item}
                      </div>
                    ))}
                    <button
                      onClick={addItem}
                      className="bg-neutral-300 hover:bg-neutral-400 w-[4rem] h-[4rem] p-2 transition-colors duration-150 ease-in-out rounded-full grid place-items-center"
                    >
                      <Plus color="#eeeeee" size="32" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-[34rem]">
                <p className="font-bold">Bill Details</p>
                <div className="flex gap-x-2 my-4">
                  <div className="flex flex-col flex-1 gap-y-2 w-[28rem]">
                    {Array(5)
                      .fill()
                      .map((_, index) => (
                        <div
                          key={index}
                          className="grid grid-flow-col justify-between items-center gap-x-4 px-4 py-4 bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
                        >
                          <p className="font-bold">x2</p>
                          <p className="font-medium">something tasty</p>
                          <p className="font-bold">50.00</p>
                          <div>
                            <button className="w-fit h-fit p-2 bg-neutral-800 hover:bg-neutral-600 transition-colors duration-150 ease-in-out rounded-full">
                              <Plus color="#eeeeee" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BillSplit;
