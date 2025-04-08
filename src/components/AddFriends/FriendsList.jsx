import { Minus, Plus } from 'lucide-react';

import AddFriendPopover from './AddFriendPopover';
import { useAddFriends } from '@/hooks/useAddFriends';

export default function FriendsList() {
  const { addFriendPopover, setAddFriendPopover } = useAddFriends();

  return (
    <section className="flexible-container my-8">
      <h3 className="font-semibold text-lg leading-none">Share with</h3>
      <ul className="text-sm sm:text-base mt-4 grid grid-cols-4 gap-y-4 sm:grid-cols-6 items-center">
        {/* Fixed Add Friend Button */}
        <li id="add-friend-button" className="place-items-center space-y-1">
          <button
            className="bg-neutral-300 hover:bg-neutral-400 w-[4rem] aspect-square p-2 transition-colors duration-150 ease-in-out rounded-full grid place-items-center"
            title="Add friend to list"
            onClick={e => {
              e.preventDefault();
              setAddFriendPopover(prev => !prev);
            }}
          >
            <Plus color="#eeeeee" size="32" />
          </button>
          <p>Add Friend</p>
        </li>
        {/* Friends added by the user */}
        <li id="add-friend-button" className="place-items-center space-y-1">
          <div className="relative bg-neutral-800 w-[4rem] aspect-square p-2 rounded-full grid place-items-center">
            <button
              className="absolute top-0 right-[-0.25rem] w-5 aspect-square bg-red-600 rounded-full place-items-center"
              title="Remove friend"
            >
              <Minus color="white" size="16" />
            </button>
            <span className="text-2xl text-white font-semibold">V</span>
          </div>
          <p>Varshaa</p>
        </li>
      </ul>
      {/* Popover for adding a friend */}
      {addFriendPopover && <AddFriendPopover />}
    </section>
  );
}
