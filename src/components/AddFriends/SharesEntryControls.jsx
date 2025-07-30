import { Utensils } from 'lucide-react';

import Button from '@/components/Button';
import {
  getBillTitle,
  getBillTimestamp,
  getTotalAmount,
} from '@/utils/BillStorage';
import { useAddFriends } from '@/hooks/useAddFriends';

export default function SharesEntryControls() {
  const billTitle = getBillTitle();
  const timestamp = getBillTimestamp();
  const totalAmount = getTotalAmount();

  const { checkIfFriendsExist } = useAddFriends();

  return (
    <section className="flexible-container bg-neutral-50 grid grid-row-2 gap-4 p-3 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div id="bill-details-wrapper" className="flex justify-between">
        <div className="flex items-center">
          <div
            id="icon-container"
            className="bg-neutral-800 border-neutral-800 border-2 p-2 rounded-full"
          >
            <Utensils size={20} stroke="white" />
          </div>
          <div className="px-2">
            <h2 className="text-lg font-extrabold text-wrap">{billTitle}</h2>
            <p className="text-sm font-normal">{timestamp}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="font-semibold">Total:</h2>
          <p className="text-lg font-bold text-nowrap">
            ₹ {totalAmount.toFixed(2)}
          </p>
        </div>
      </div>
      <Button
        path="/bill/shares"
        className="w-full max-w-[20rem] mx-auto"
        disabled={!checkIfFriendsExist()}
      >
        Split
      </Button>
    </section>
  );
}
