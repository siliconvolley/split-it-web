import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Utensils, Plus } from 'lucide-react';

function BillSplit() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full sm:max-w-xl relative">
        <nav className="flex mx-4 my-8">
          <Link to="/bill" className="absolute">
            <ChevronLeft color="#262626" size="32" />
          </Link>
          <span className="text-2xl font-bold flex-grow text-center">
            Share Details
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
                  </div>
                </div>

                <div className="flex flex-col mr-4">
                  <Link
                    to="/bill/split"
                    className="my-1 text-center bg-neutral-800 hover:bg-neutral-700 transition-colors duration-150 ease-in-out text-white font-bold py-3 px-4 rounded-lg"
                  >
                    Split
                  </Link>
                  <Link className="my-1 flex-1 text-center inner-border hover:bg-neutral-200 transition-colors duration-150 ease-in-out font-bold py-3 px-4 rounded-lg">
                    Split evenly
                  </Link>
                </div>
              </div>

              <div className="my-8">
                <p className="font-bold">Share with</p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 my-4 items-center">
                  <div className="flex flex-col items-center">
                    <button
                      className="bg-neutral-300 hover:bg-neutral-400 w-[4rem] h-[4rem] p-2 transition-colors duration-150 ease-in-out rounded-full grid place-items-center"
                    >
                      <Plus color="#eeeeee" size="32" />
                    </button>
                    <p className="text-center text-sm mt-1">Add Friend</p>
                  </div>
                </div>

                <div className="w-full sm:w-[34rem] mt-8">
                  <p className="font-bold">Bill Details</p>
                  <div className="flex gap-x-2 my-4">
                    <div className="flex flex-col flex-1 gap-y-2 w-full sm:w-[28rem]">
                    </div>
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
