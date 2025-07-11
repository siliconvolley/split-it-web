import SharesEntryControls from './SharesEntryControls';
import FriendsList from './FriendsList';
import SharesList from './SharesList';
import AddFriendsContextProvider from '@/contexts/AddFriendsContextProvider';

export default function SharesEntryForm() {
  return (
    <main className="place-items-center px-2 py-4">
      <AddFriendsContextProvider>
        <SharesEntryControls />
        <FriendsList />
        <SharesList />
      </AddFriendsContextProvider>
    </main>
  );
}
