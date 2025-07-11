import { Plus } from 'lucide-react';

import AddSharesPopover from './AddSharesPopover';
import { useAddFriends } from '@/hooks/useAddFriends';

export default function SharesList() {
  const { items, addSharesPopover, setAddSharesPopover } = useAddFriends();

  return (
    <section className="flexible-container mb-8">
      <h3 className="font-semibold text-lg leading-none">Bill details</h3>
      <ul className="my-4 flex flex-col gap-2">
        {/* Bill items */}
        {items.map((item, index) => (
        <li key={index} className="bg-neutral-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <p className="flex justify-between items-baseline">
            <span className="font-light leading-none">#{index + 1}</span>
            <span className="font-bold text-lg leading-none">x{item.quantity}</span>
          </p>
          <p className="flex justify-between items-baseline">
            <span className="font-semibold text-lg">{item.name}</span>
            <span className="font-bold">₹ {item.price}</span>
          </p>
          <div className="dashed mt-2 mb-1" />
          <button
            className="mt-2 bg-neutral-800 hover:bg-neutral-600 p-2 rounded-full place-items-center"
            title="Add friend to the item"
            onClick={e => {
              e.preventDefault();
              setAddSharesPopover(prev => !prev);
            }}
          >
            <Plus color="white" size="24" />
          </button>
        </li>
      ))}
      </ul>

      {/* Popover for adding friends to share the item*/}
      {addSharesPopover && <AddSharesPopover />}
    </section>
  );
}
