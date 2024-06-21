import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Utensils, Plus } from 'lucide-react';

function BillSplit() {
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="max-w-[35rem] relative">
          <nav className="flex mx-4 my-8">
            <Link to="/bill" className="absolute">
              <ChevronLeft color="#262626" size="32" />
            </Link>
            <span className="text-2xl font-bold flex-grow text-center">
              Split the Bill
            </span>
          </nav>

          <main className="flex flex-col justify-center">
            {/* Splitting operation section */}
            <div
              className="grid grid-flow-row grid-rows-1 gap-4 w-[28rem] p-4 bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
              style={{ gridTemplateColumns: '2fr 1fr' }}
            >
              {/* Bill icon */}
              <div className="flex flex-col justify-between">
                <div className="grid grid-flow-col gap-4 justify-start">
                  <div className="bg-neutral-800 w-fit h-fit p-2 rounded-full">
                    <Utensils color="#eeeeee" />
                  </div>
                  {/* Bill Name */}
                  <div>
                    <p className="font-bold">Hamburg</p>
                    {/* Bill Timestamp */}
                    <p>
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
                    {/* Total title */}
                    <span className="font-bold">Total:</span>
                    {/* Split by n friends */}
                    <span> Split to 8</span>
                  </p>
                  {/* Total amount */}
                  <p className="font-bold">Rs. 120.48</p>
                </div>
              </div>

              <div className="flex flex-col">
                <Link className="my-1 flex-1 text-center bg-neutral-800 hover:bg-neutral-700 transition-colors duration-150 ease-in-out text-white font-bold py-3 px-4 rounded-lg">
                  Split
                </Link>
                <Link className="my-1 flex-1 text-center inner-border hover:bg-neutral-200 transition-colors duration-150 ease-in-out font-bold py-3 px-4 rounded-lg">
                  Split evenly
                </Link>
              </div>
            </div>

            {/* Add friends section */}
            <div className="my-8">
              <p className="font-bold">Share with</p>
              <div className="flex gap-x-2 my-4">
                {/* List of members */}
                <div className="flex overflow-x-auto gap-x-2">
                  <button className="bg-neutral-300 hover:bg-neutral-400 w-[4rem] h-[4rem] p-2 transition-colors duration-150 ease-in-out rounded-full grid place-items-center">
                    <Plus color="#eeeeee" size="32" />
                  </button>
                  <div className="w-[4rem] h-[4rem] bg-neutral-200 inner-border rounded-full"></div>
                  <div className="w-[4rem] h-[4rem] bg-neutral-200 inner-border rounded-full"></div>
                  <div className="w-[4rem] h-[4rem] bg-neutral-200 inner-border rounded-full"></div>
                  <div className="w-[4rem] h-[4rem] bg-neutral-200 inner-border rounded-full"></div>
                  <div className="w-[4rem] h-[4rem] bg-neutral-200 inner-border rounded-full"></div>
                  {/* <div className="w-[4rem] h-[4rem] bg-neutral-200 inner-border rounded-full"></div> */}
                  {/* <div className="w-[4rem] h-[4rem] bg-neutral-200 inner-border rounded-full"></div> */}
                  {/* <div className="w-[4rem] h-[4rem] bg-neutral-200 inner-border rounded-full"></div> */}
                  {/* <div className="w-[4rem] h-[4rem] bg-neutral-200 inner-border rounded-full"></div> */}
                  {/* <div className="w-[4rem] h-[4rem] bg-neutral-200 inner-border rounded-full"></div> */}
                </div>
              </div>
            </div>

            {/* Bill details section */}
            <div>
              <p className="font-bold">Bill Details</p>
              <div className="flex gap-x-2 my-4">
                {/* List of members */}
                <div className="flex flex-col gap-y-2 w-[28rem]">
                  <div className="grid grid-flow-col justify-between items-center gap-x-4 px-4 py-4 bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg">
                    <p className="font-bold">x2</p>
                    <p className="font-medium">something tasty</p>
                    <p className="font-bold">50.00</p>
                    <div>
                      <button className="w-fit h-fit p-2 bg-neutral-800 hover:bg-neutral-600 transition-colors duration-150 ease-in-out rounded-full">
                        <Plus color="#eeeeee" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-flow-col justify-between items-center gap-x-4 px-4 py-4 bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg">
                    <p className="font-bold">x2</p>
                    <p className="font-medium">something tasty</p>
                    <p className="font-bold">50.00</p>
                    <div>
                      <button className="w-fit h-fit p-2 bg-neutral-800 hover:bg-neutral-600 transition-colors duration-150 ease-in-out rounded-full">
                        <Plus color="#eeeeee" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-flow-col justify-between items-center gap-x-4 px-4 py-4 bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg">
                    <p className="font-bold">x2</p>
                    <p className="font-medium">something tasty</p>
                    <p className="font-bold">50.00</p>
                    <div>
                      <button className="w-fit h-fit p-2 bg-neutral-800 hover:bg-neutral-600 transition-colors duration-150 ease-in-out rounded-full">
                        <Plus color="#eeeeee" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-flow-col justify-between items-center gap-x-4 px-4 py-4 bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg">
                    <p className="font-bold">x2</p>
                    <p className="font-medium">something tasty</p>
                    <p className="font-bold">50.00</p>
                    <div>
                      <button className="w-fit h-fit p-2 bg-neutral-800 hover:bg-neutral-600 transition-colors duration-150 ease-in-out rounded-full">
                        <Plus color="#eeeeee" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-flow-col justify-between items-center gap-x-4 px-4 py-4 bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg">
                    <p className="font-bold">x2</p>
                    <p className="font-medium">something tasty</p>
                    <p className="font-bold">50.00</p>
                    <div>
                      <button className="w-fit h-fit p-2 bg-neutral-800 hover:bg-neutral-600 transition-colors duration-150 ease-in-out rounded-full">
                        <Plus color="#eeeeee" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default BillSplit;
