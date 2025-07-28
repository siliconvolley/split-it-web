import AddSharesPopover from './AddSharesPopover';
import { useAddFriends } from '@/hooks/useAddFriends';
import Button from '../Button';
import { PieChart, Equal } from 'lucide-react';

export default function SharesList() {
  const {
    items,
    addSharesPopover,
    setAddSharesPopover,
    getSelectedItemData,
  } = useAddFriends();

  return (
    <section className="flexible-container mb-8">
      <h3 className="font-semibold text-lg leading-none">Bill details</h3>
      <ul className="my-4 flex flex-col gap-2">
        {/* Bill items */}
        {items.map((item, index) => (
          <li
            key={index}
            className="bg-neutral-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <p className="flex justify-between items-baseline">
              <span className="font-light leading-none">#{index + 1}</span>
              <span className="font-bold text-lg leading-none">
                x{item.quantity}
              </span>
            </p>
            <p className="flex justify-between items-baseline">
              <span className="font-semibold text-lg">{item.name}</span>
              <span className="font-bold">₹ {item.price}</span>
            </p>
            <div className="dashed my-2" />
            <Button
              type="primary"
              title="Add friend to the item"
              className="w-max grid grid-flow-col items-center gap-2 px-[0.75rem] py-[0.5rem] mt-3"
              onClick={e => {
                e.preventDefault();
                getSelectedItemData(index);
                setAddSharesPopover(prev => !prev);
              }}
            >
              {item.hasCustomShares ? <PieChart /> : <Equal />}
              <span className="font-medium">
                {item.hasCustomShares ? 'Custom' : 'Equal'}
              </span>
            </Button>
          </li>
        ))}
      </ul>

      {/* Popover for adding friends to share the item*/}
      {addSharesPopover && <AddSharesPopover />}
    </section>
  );
}
