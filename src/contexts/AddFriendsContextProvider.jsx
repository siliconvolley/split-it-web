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
    if (!newFriend.name || !newFriend.name.trim()) return;

    const trimmedName = newFriend.name.trim();
    const isDuplicate = friends.some(
      friend => friend.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      console.log('Friend already exists!');
      return;
    }

    const friendToAdd = {
      name: trimmedName,
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

    const friendToRemove = friends[index];
    if (!friendToRemove) return;

    setFriends(prevFriends => {
      const updatedFriends = prevFriends.filter((_, i) => i !== index);

      // Remove this friend from all items in storage
      const billData = getBillData();
      billData.items = billData.items.map(item => {
        const updatedShares = { ...item.shares };
        delete updatedShares[friendToRemove.name];
        return {
          ...item,
          shares: updatedShares,
        };
      });

      billData.friends = updatedFriends;
      localStorage.setItem('billData', JSON.stringify(billData));

      // Update local items state to reflect the changes
      setItems(billData.items);

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
    if (!item) return null;

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
    if (!selectedItemData || !isValidFriendName(friendName)) return;

    // Check if friend is already added
    const isAlreadyAdded = selectedItemFriends.some(f => f.name === friendName);
    if (isAlreadyAdded) return;

    // Find the item index using utility function
    const itemIndex = findItemIndex(selectedItemData);
    if (itemIndex === -1) return;

    // Add friend to this item in the new structure
    addFriendToItem(friendName, itemIndex);

    const newFriends = [...selectedItemFriends, { name: friendName, share: 0 }];

    // Calculate equal shares with validation
    if (newFriends.length === 0) return;

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

  const addAllFriendsToSelectedItem = () => {
    if (!selectedItemData) return;

    const availableFriends = getAvailableFriendsToAdd();
    if (availableFriends.length === 0) return;

    const itemIndex = findItemIndex(selectedItemData);
    if (itemIndex === -1) return;

    availableFriends.forEach(friend => {
      addFriendToItem(friend.name, itemIndex);
    });

    const newFriendsToAdd = availableFriends.map(friend => ({
      name: friend.name,
      share: 0,
    }));

    const allFriends = [...selectedItemFriends, ...newFriendsToAdd];

    // Calculate shares based on mode
    let updatedFriends;
    if (isCustomShares) {
      // In custom mode, new friends get 0 share, existing friends keep their shares
      updatedFriends = allFriends.map(f => ({
        ...f,
        share:
          selectedItemFriends.find(existing => existing.name === f.name)
            ?.share || 0,
      }));
    } else {
      // In equal mode, recalculate equal shares for all friends
      const equalShare = selectedItemData.quantity / allFriends.length;
      updatedFriends = allFriends.map(f => ({
        ...f,
        share: equalShare,
      }));
    }

    setSelectedItemFriends(updatedFriends);

    // Update shares in storage
    const newShares = {};
    updatedFriends.forEach(f => {
      newShares[f.name] = f.share;
    });
    updateCurrentItemShares(newShares);
  };

  const removeFriendFromSelectedItem = friendName => {
    if (!selectedItemData || !isValidFriendName(friendName)) return;

    // Find the item index using utility function
    const itemIndex = findItemIndex(selectedItemData);
    if (itemIndex === -1) return;

    // Remove friend from this item in the new structure
    removeFriendFromItem(friendName, itemIndex);

    const updatedFriends = selectedItemFriends.filter(
      f => f.name !== friendName
    );

    // Recalculate equal shares if not custom and there are remaining friends
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
    if (!isCustomShares || !selectedItemData || !isValidFriendName(friendName))
      return;

    // Validate and parse the new share value using utility function
    if (!isValidShareValue(newShare)) return;

    const parsedShare = parseFloat(newShare);
    const updatedFriends = selectedItemFriends.map(f =>
      f.name === friendName ? { ...f, share: parsedShare } : f
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
    if (!selectedItemData || selectedItemData.quantity <= 0) return 0;

    const totalAllocated = selectedItemFriends.reduce((sum, f) => {
      const shareValue = parseFloat(f.share) || 0;
      return sum + shareValue;
    }, 0);
    return selectedItemData.quantity - totalAllocated;
  };

  const getAvailableFriendsToAdd = () => {
    if (!selectedItemData || !Array.isArray(friends)) return [];

    // Find the item index using utility function
    const itemIndex = findItemIndex(selectedItemData);
    if (itemIndex === -1) return friends;

    // Get friends who are NOT currently sharing this item
    return friends.filter(
      friend =>
        friend &&
        friend.share &&
        Array.isArray(friend.share) &&
        !friend.share.includes(itemIndex)
    );
  };

  const saveSelectedItemShares = () => {
    if (!selectedItemData || !Array.isArray(selectedItemFriends)) return false;

    // Validate shares in custom mode
    if (isCustomShares) {
      const remainingQty = getRemainingQuantity();
      if (Math.abs(remainingQty) > 0.01) {
        // Shares don't add up to total quantity
        return false;
      }

      // Check for negative shares
      const hasNegativeShares = selectedItemFriends.some(
        f => (parseFloat(f.share) || 0) < 0
      );
      if (hasNegativeShares) {
        return false;
      }
    }

    // Validate that all friends have valid shares
    const hasInvalidShares = selectedItemFriends.some(
      f => !f.name || isNaN(parseFloat(f.share))
    );
    if (hasInvalidShares) {
      return false;
    }

    // All shares are already saved in real-time via updateCurrentItemShares
    // This function just validates and confirms the save operation
    return true;
  };

  const handleToggleCustomShares = () => {
    if (!selectedItemData) return;

    // Find the item index using utility function
    const itemIndex = findItemIndex(selectedItemData);
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
      if (updatedItems[itemIndex]) {
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          hasCustomShares: newCustomSharesState,
        };
      }
      return updatedItems;
    });

    // Update selectedItemData to reflect the change
    setSelectedItemData(prev =>
      prev
        ? {
            ...prev,
            hasCustomShares: newCustomSharesState,
          }
        : null
    );
  };

  const getCurrentItemShares = () => {
    if (!selectedItemData) return {};

    const itemIndex = findItemIndex(selectedItemData);
    if (itemIndex === -1) return {};

    return getItemShares(itemIndex);
  };

  const updateCurrentItemShares = newShares => {
    if (!selectedItemData || !newShares || typeof newShares !== 'object')
      return;

    const itemIndex = findItemIndex(selectedItemData);
    if (itemIndex === -1) return;

    // Update shares in BillStorage
    updateItemShares(itemIndex, newShares);

    // Update local items state
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      if (updatedItems[itemIndex]) {
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          shares: newShares,
        };
      }
      return updatedItems;
    });
  };

  // Utility function to find item index more reliably
  const findItemIndex = targetItem => {
    if (!targetItem || !Array.isArray(items)) return -1;

    return items.findIndex(item => {
      return (
        item === targetItem ||
        (item &&
          item.name === targetItem.name &&
          item.quantity === targetItem.quantity &&
          item.price === targetItem.price)
      );
    });
  };

  // Utility function to validate friend name
  const isValidFriendName = name => {
    return name && typeof name === 'string' && name.trim().length > 0;
  };

  // Utility function to validate share value
  const isValidShareValue = value => {
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue >= 0;
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
    addAllFriendsToSelectedItem,
    removeFriendFromSelectedItem,
    updateFriendShareInSelectedItem,
    getRemainingQuantity,
    getAvailableFriendsToAdd,
    saveSelectedItemShares,
    getItemFriends,
  };

  return (
    <AddFriendsContext.Provider value={value}>
      {children}
    </AddFriendsContext.Provider>
  );
}
