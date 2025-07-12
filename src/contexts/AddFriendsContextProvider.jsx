import { useState } from 'react';
import { AddFriendsContext } from '@/contexts/AllContexts';
import { getBillData, getBillFriends, getBillItems } from '@/utils/BillStorage';

export default function AddFriendsContextProvider({ children }) {
  const [addFriendPopover, setAddFriendPopover] = useState(false);
  const [addSharesPopover, setAddSharesPopover] = useState(false);
  const [items, setItems] = useState(getBillItems);
  const [friends, setFriends] = useState(getBillFriends);
  const [newFriend, setNewFriend] = useState({
    name: '',
    share: 0,
  });

  const addFriend = () => {
    if (!newFriend.name || newFriend.share <= 0) return;

    const isDuplicate = friends.some(
      friend => friend.name.toLowerCase() === newFriend.name.toLowerCase()
    );

    if (isDuplicate) {
      console.log('Friend already exists!');
      return;
    }

    const friendToAdd = {
      name: newFriend.name.trim(),
      share: Number(newFriend.share),
    };

    setFriends(prevFriends => {
      const updatedFriends = [...prevFriends, friendToAdd];
      const billData = getBillData();
      billData.friends = updatedFriends;
      localStorage.setItem('billData', JSON.stringify(billData));
      return updatedFriends;
    });

    setNewFriend({ name: '', share: 0 });
  };

  const removeFriend = index => {
    if (index < 0 || index >= friends.length) return;

    setFriends(prevFriends => {
      const updatedFriends = prevFriends.filter((_, i) => i !== index);
      const billData = getBillData();
      billData.friends = updatedFriends;
      localStorage.setItem('billData', JSON.stringify(billData));
      return updatedFriends;
    });
  };

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
    newFriend,
    setNewFriend,
    addFriend,
    removeFriend,
    friends,
    checkIfFriendsExist,
  };

  return (
    <AddFriendsContext.Provider value={value}>
      {children}
    </AddFriendsContext.Provider>
  );
}
