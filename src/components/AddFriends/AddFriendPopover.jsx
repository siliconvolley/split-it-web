import Button from '@/components/Button';
import { useAddFriends } from '@/hooks/useAddFriends';

export default function AddFriendPopover() {
  const { newFriend, setNewFriend, setAddFriendPopover, addFriend } =
    useAddFriends();

  return (
    <div className="fixed inset-0 grid place-items-center bg-neutral-950 bg-opacity-50 z-10 backdrop-blur-sm">
      <div className="bg-white p-6 z-10 rounded-lg shadow-lg w-[90%] max-w-sm transition-transform duration-300 ease-in-out">
        <h2 className="text-lg font-bold mb-4">Add a Friend</h2>
        <input
          autoFocus
          type="text"
          placeholder="Friend's Name"
          className="bg-neutral-200 px-2 py-1 rounded-lg w-full h-[3rem] mb-4"
          onChange={e => {
            const newFriendName = e.target.value;
            setNewFriend({ name: newFriendName, shares: 0 });
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && newFriend.name !== '') {
              addFriend();
              setAddFriendPopover(prev => !prev);
            }
          }}
        />
        <div className="grid grid-flow-col grid-cols-2 gap-x-2">
          <Button
            type="secondary"
            onClick={e => {
              e.preventDefault();
              setAddFriendPopover(prev => !prev);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={e => {
              e.preventDefault();
              if (newFriend.name !== '') {
                console.log(newFriend.name)
                addFriend();
                setAddFriendPopover(prev => !prev);
              }
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
