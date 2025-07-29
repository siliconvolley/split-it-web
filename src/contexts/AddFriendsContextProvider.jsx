import { useState } from 'react';
import { AddFriendsContext } from '@/contexts/AllContexts';
import {
  getBillData,
  getBillFriends,
  getBillItems,
  toggleCustomShares,
  getItemShares,
  updateItemShares,
  addFriendToItem,
  removeFriendFromItem,
  getItemFriends,
} from '@/utils/BillStorage';

export default function AddFriendsContextProvider({ children }) {
  const [addFriendPopover, setAddFriendPopover] = useState(false);
  const [addSharesPopover, setAddSharesPopover] = useState(false);
  const [items, setItems] = useState(getBillItems);
  const [friends, setFriends] = useState(getBillFriends);
  const [newFriend, setNewFriend] = useState({
    name: '',
    share: 0,
  });
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [isCustomShares, setIsCustomShares] = useState(false);
  const [selectedItemFriends, setSelectedItemFriends] = useState([]);

  const addFriend = () => {
    if (!newFriend.name) return;

    const isDuplicate = friends.some(
      friend => friend.name.toLowerCase() === newFriend.name.toLowerCase()
    );

    if (isDuplicate) {
      console.log('Friend already exists!');
      return;
    }

    const friendToAdd = {
      name: newFriend.name.trim(),
      share: [], // Initialize with empty array of item indices
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

  const getSelectedItemData = itemIndex => {
    if (itemIndex < 0 || itemIndex >= items.length) return null;
    const item = items[itemIndex];
    setSelectedItemData(item);
    // Set the current custom shares state for this item
    setIsCustomShares(item.hasCustomShares || false);

    // Get friends who are sharing this item using the new structure
    const itemFriendNames = getItemFriends(itemIndex);
    const itemShares = item.shares || {};

    const itemFriends = itemFriendNames.map(friendName => ({
      name: friendName,
      share: itemShares[friendName] || 0,
    }));

    setSelectedItemFriends(itemFriends);
  };

  const addFriendToSelectedItem = friendName => {
    if (!selectedItemData || !friendName) return;

    // Check if friend is already added
    const isAlreadyAdded = selectedItemFriends.some(f => f.name === friendName);
    if (isAlreadyAdded) return;

    // Find the item index
    const itemIndex = items.findIndex(
      item =>
        item.name === selectedItemData.name &&
        item.quantity === selectedItemData.quantity &&
        item.price === selectedItemData.price
    );

    if (itemIndex === -1) return;

    // Add friend to this item in the new structure
    addFriendToItem(friendName, itemIndex);

    const newFriends = [...selectedItemFriends, { name: friendName, share: 0 }];

    // Calculate equal shares
    const equalShare = selectedItemData.quantity / newFriends.length;
    const updatedFriends = newFriends.map(f => ({
      ...f,
      share: isCustomShares ? f.share : equalShare,
    }));

    setSelectedItemFriends(updatedFriends);

    // Update shares in storage
    const newShares = {};
    updatedFriends.forEach(f => {
      newShares[f.name] = f.share;
    });
    updateCurrentItemShares(newShares);
  };

  const removeFriendFromSelectedItem = friendName => {
    if (!selectedItemData) return;

    // Find the item index
    const itemIndex = items.findIndex(
      item =>
        item.name === selectedItemData.name &&
        item.quantity === selectedItemData.quantity &&
        item.price === selectedItemData.price
    );

    if (itemIndex === -1) return;

    // Remove friend from this item in the new structure
    removeFriendFromItem(friendName, itemIndex);

    const updatedFriends = selectedItemFriends.filter(
      f => f.name !== friendName
    );

    // Recalculate equal shares if not custom
    if (!isCustomShares && updatedFriends.length > 0) {
      const equalShare = selectedItemData.quantity / updatedFriends.length;
      updatedFriends.forEach(f => {
        f.share = equalShare;
      });
    }

    setSelectedItemFriends(updatedFriends);

    // Update shares in storage
    const newShares = {};
    updatedFriends.forEach(f => {
      newShares[f.name] = f.share;
    });
    updateCurrentItemShares(newShares);
  };

  const updateFriendShareInSelectedItem = (friendName, newShare) => {
    if (!isCustomShares) return; // Only allow editing in custom mode

    const updatedFriends = selectedItemFriends.map(f =>
      f.name === friendName ? { ...f, share: parseFloat(newShare) || 0 } : f
    );

    setSelectedItemFriends(updatedFriends);

    // Update shares in storage
    const newShares = {};
    updatedFriends.forEach(f => {
      newShares[f.name] = f.share;
    });
    updateCurrentItemShares(newShares);
  };

  const getRemainingQuantity = () => {
    if (!selectedItemData) return 0;

    const totalAllocated = selectedItemFriends.reduce(
      (sum, f) => sum + f.share,
      0
    );
    return selectedItemData.quantity - totalAllocated;
  };

  const getAvailableFriendsToAdd = () => {
    if (!selectedItemData) return friends;

    // Find the item index
    const itemIndex = items.findIndex(
      item =>
        item.name === selectedItemData.name &&
        item.quantity === selectedItemData.quantity &&
        item.price === selectedItemData.price
    );

    if (itemIndex === -1) return friends;

    // Get friends who are NOT currently sharing this item
    return friends.filter(friend => !friend.share.includes(itemIndex));
  };

  const saveSelectedItemShares = () => {
    if (!selectedItemData) return false;

    // Validate shares in custom mode
    if (isCustomShares) {
      const remainingQty = getRemainingQuantity();
      if (Math.abs(remainingQty) > 0.01) {
        // Shares don't add up to total quantity
        return false;
      }
    }

    // All shares are already saved in real-time via updateCurrentItemShares
    // This function just validates and confirms the save operation
    return true;
  };

  const handleToggleCustomShares = () => {
    if (!selectedItemData) return;

    // Find the item index
    const itemIndex = items.findIndex(
      item =>
        item.name === selectedItemData.name &&
        item.quantity === selectedItemData.quantity &&
        item.price === selectedItemData.price
    );

    if (itemIndex === -1) return;

    const newCustomSharesState = !isCustomShares;

    // Update the toggle state in BillStorage
    toggleCustomShares(itemIndex, newCustomSharesState);

    // Update local state
    setIsCustomShares(newCustomSharesState);

    // Recalculate shares based on mode
    if (!newCustomSharesState && selectedItemFriends.length > 0) {
      // Equal shares mode - recalculate equal distribution
      const equalShare = selectedItemData.quantity / selectedItemFriends.length;
      const updatedFriends = selectedItemFriends.map(f => ({
        ...f,
        share: equalShare,
      }));
      setSelectedItemFriends(updatedFriends);

      const newShares = {};
      updatedFriends.forEach(f => {
        newShares[f.name] = f.share;
      });
      updateCurrentItemShares(newShares);
    }

    // Update the items state to reflect the change
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        hasCustomShares: newCustomSharesState,
      };
      return updatedItems;
    });

    // Update selectedItemData to reflect the change
    setSelectedItemData(prev => ({
      ...prev,
      hasCustomShares: newCustomSharesState,
    }));
  };

  const getCurrentItemShares = () => {
    if (!selectedItemData) return {};

    const itemIndex = items.findIndex(
      item =>
        item.name === selectedItemData.name &&
        item.quantity === selectedItemData.quantity &&
        item.price === selectedItemData.price
    );

    if (itemIndex === -1) return {};

    return getItemShares(itemIndex);
  };

  const updateCurrentItemShares = newShares => {
    if (!selectedItemData) return;

    const itemIndex = items.findIndex(
      item =>
        item.name === selectedItemData.name &&
        item.quantity === selectedItemData.quantity &&
        item.price === selectedItemData.price
    );

    if (itemIndex === -1) return;

    // Update shares in BillStorage
    updateItemShares(itemIndex, newShares);

    // Update local items state
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        shares: newShares,
      };
      return updatedItems;
    });
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
    selectedItemData,
    getSelectedItemData,
    isCustomShares,
    setIsCustomShares,
    handleToggleCustomShares,
    getCurrentItemShares,
    updateCurrentItemShares,
    selectedItemFriends,
    addFriendToSelectedItem,
    removeFriendFromSelectedItem,
    updateFriendShareInSelectedItem,
    getRemainingQuantity,
    getAvailableFriendsToAdd,
    saveSelectedItemShares,
  };

  return (
    <AddFriendsContext.Provider value={value}>
      {children}
    </AddFriendsContext.Provider>
  );
}
