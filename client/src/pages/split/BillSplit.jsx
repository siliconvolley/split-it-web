import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Utensils } from 'lucide-react';

function BillSplit() {
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-[35rem] relative">
          <nav className="flex mx-4 my-8">
            <Link to="/bill" className="absolute">
              <ChevronLeft color="#262626" size="32" />
            </Link>
            <span className="text-2xl font-bold flex-grow text-center">
              Split the Bill
            </span>
          </nav>

          <main className="flex justify-center">
            {/* Splitting operation section */}
            <div className="grid grid-flow-row w-[28rem] p-4 bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg">
              {/* Bill icon */}
              <div className="">
                <Utensils />
                <div>
                  {/* Bill Name */}
                  <p>Hamburg</p>
                  {/* Bill Timestamp */}
                  <p>20/6/2024, 11:31:57 pm</p>
                </div>
              </div>
              <div>
                {/* Total title */}
                <p>
                  Total:
                  {/* Split by n friends */}
                  <span>Split to 8</span>
                </p>
                {/* Total amount */}
                <p>Rs. 120.48</p>
              </div>
              <div>
                <Link className="text-center bg-neutral-800 hover:bg-neutral-700 transition-colors duration-150 ease-in-out text-white font-bold py-3 px-4 rounded-lg">
                  Split
                </Link>
              </div>
              <div>
                <Link className="text-center hover:bg-neutral-700 transition-colors duration-150 ease-in-out font-bold py-3 px-4 rounded-lg">
                  Split evenly
                </Link>
              </div>
            </div>

            {/* Add friends section */}
            <div>
              <p></p>
              <ul>
                <li></li>
              </ul>
            </div>

            {/* Bill details section */}
            <div>
              <p></p>
              <ul>
                <li></li>
              </ul>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default BillSplit;
