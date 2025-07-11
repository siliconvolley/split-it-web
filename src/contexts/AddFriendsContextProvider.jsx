import { useState } from 'react';
import { AddFriendsContext } from '@/contexts/AllContexts';
import { getBillItems } from '@/utils/BillStorage';

export default function AddFriendsContextProvider({ children }) {
  const [addFriendPopover, setAddFriendPopover] = useState(false);
  const [addSharesPopover, setAddSharesPopover] = useState(false);
  const [items, setItems] = useState(getBillItems);
  

  const value = {
    addFriendPopover,
    setAddFriendPopover,
    addSharesPopover,
    setAddSharesPopover,
    items,
    setItems,
  };

  return (
    <AddFriendsContext.Provider value={value}>
      {children}
    </AddFriendsContext.Provider>
  );
}
