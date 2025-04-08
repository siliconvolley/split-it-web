import { IndianRupeeIcon, Percent, PieChartIcon, Plus } from 'lucide-react';

import Button from '@/components/Button';
import { useAddFriends } from '@/hooks/useAddFriends';

export default function AddSharesPopover() {
  const { setAddSharesPopover } = useAddFriends();

  return (
    <div className="fixed inset-0 grid place-items-center bg-neutral-950 bg-opacity-50 z-10 backdrop-blur-sm">
      <div className="bg-white p-4 z-10 rounded-lg shadow-lg w-full max-w-sm transition-transform duration-300 ease-in-out">
        <h2 className="text-lg font-bold">Chicken Salad x1</h2>
        {/* Share-type selection form */}
        <form id="share-type-selector" className="flex justify-end">
          <label htmlFor="all-items" className="mr-2 flex items-center">
            <input
              id="all-items"
              type="radio"
              name="share-type"
              className="mr-1 accent-neutral-800"
              defaultChecked
            />
            All
          </label>
          <label htmlFor="individual-items" className="flex items-center ">
            <input
              id="individual-items"
              type="radio"
              name="share-type"
              className="mr-1 accent-neutral-800"
            />
            Individual
          </label>
        </form>

        <div className="my-2 flex justify-around items-center">
          <Percent />
          <PieChartIcon />
          <IndianRupeeIcon />
        </div>

        {/* Shares list */}
        <ul className="my-4 bg-neutral-400 p-2 rounded-md">
          <li className="grid grid-cols-4 place-items-start">
            <span>1. </span>
            <span>Chicken Roll</span>
            <span> x1</span>
            <span>
              <Plus />
            </span>
            <p>Varshaa </p>
          </li>
        </ul>
        <div className="grid grid-flow-col grid-cols-2 gap-x-2">
          <Button
            type="secondary"
            onClick={e => {
              
              e.preventDefault();
              setAddSharesPopover(prev => !prev);
              console.log('Cancel clicked');
            }}
          >
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}
