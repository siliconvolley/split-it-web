import { useState } from 'react';
import { AddFriendsContext } from '@/contexts/AllContexts';
import { getBillData, getBillItems } from '@/utils/BillStorage';

export default function AddFriendsContextProvider({ children }) {
  const [addFriendPopover, setAddFriendPopover] = useState(false);
  const [addSharesPopover, setAddSharesPopover] = useState(false);
  const [items, setItems] = useState(getBillItems);
  const [friends, setFriends] = useState(getBillData().friends || []);
  const [newFriend, setNewFriend] = useState({
    name: '',
    share: 0,
  });

  const addFriend = () => {
    if (!newFriend.name || newFriend.share <= 0) return;

    const friendToAdd = {
      name: newFriend.name,
      share: Number(newFriend.share),
    };

    setFriends( prevFriends => {
      const updatedFriends = [...prevFriends, friendToAdd];
      const billData = getBillData();
      billData.friends = updatedFriends;
      // Save the updated friends list to storage
      localStorage.setItem('billData', JSON.stringify(billData));
      return updatedFriends;
    });
    
    setNewFriend({ name: '', share: 0 });
  }

  const checkIfFriendsExist = () => {
    if (friends.length === 0) {
      return false;
    }
    return true;
  };

  const value = {
    addFriendPopover,
    setAddFriendPopover,
    addSharesPopover,
    setAddSharesPopover,
    items,
    setItems,
    checkIfFriendsExist,
  };

  return (
    <AddFriendsContext.Provider value={value}>
      {children}
    </AddFriendsContext.Provider>
  );
}
