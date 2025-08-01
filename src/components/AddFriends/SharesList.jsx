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
    getItemFriends,
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
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-2 flex-wrap">
                {getItemFriends(index).length === 0 ? (
                  <div className="w-9 h-9 bg-neutral-400 rounded-full grid place-items-center text-white text-sm font-semibold">
                    ?
                  </div>
                ) : (
                  getItemFriends(index).map((friendName, friendIndex) => (
                    <div
                      key={friendIndex}
                      className="w-9 h-9 bg-neutral-800 rounded-full grid place-items-center text-white text-xs font-semibold"
                      title={friendName || 'Unknown'}
                    >
                      {friendName && friendName[0]
                        ? friendName[0].toUpperCase()
                        : '?'}
                    </div>
                  ))
                )}
              </div>
              <Button
                type="primary"
                title="Add friend to the item"
                className="w-max grid grid-flow-col items-center place-self-start gap-2 px-[0.75rem] py-[0.5rem]"
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
            </div>
          </li>
        ))}
      </ul>

      {/* Popover for adding friends to share the item*/}
      {addSharesPopover && <AddSharesPopover />}
    </section>
  );
}
