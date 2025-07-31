// Bill data structure
const initialBillData = {
  title: '',
  timestamp: '',
  totalAmount: 0,
  friends: [],
  items: [],
  gst: {
    enabled: false,
    percentage: 0,
  },
  discount: {
    enabled: false,
    percentage: 0,
  },
};

// Initialize Bill Data
export function initializeBillData() {
  localStorage.setItem('billData', JSON.stringify(initialBillData));
  return initialBillData;
}

// Get full bill data
export function getBillData() {
  const savedBillData = localStorage.getItem('billData');
  return savedBillData ? JSON.parse(savedBillData) : initialBillData;
}

// Save full bill data
export function saveBillData(billData) {
  localStorage.setItem('billData', JSON.stringify(billData));
}

// Utility functions to access/update specific parts of bill data
export function getBillTitle() {
  return getBillData().title;
}

export function saveBillTitle(title) {
  const billData = getBillData();
  billData.title = title;
  saveBillData(billData);
}

export function getBillItems() {
  return getBillData().items;
}

export function saveBillItems(items) {
  if (!Array.isArray(items)) throw new Error('items is not an Array');
  const billData = getBillData();

  // Ensure each item has the proper shares structure
  const itemsWithShares = items.map((item, itemIndex) => {
    if (!item.hasCustomShares && !item.shares) {
      // Initialize with equal shares for friends assigned to this item
      const itemFriends = getItemFriends(itemIndex);
      const shares = {};
      if (itemFriends.length > 0) {
        const sharePerPerson = item.quantity / itemFriends.length;
        itemFriends.forEach(friendName => {
          shares[friendName] = sharePerPerson;
        });
      }
      return {
        ...item,
        hasCustomShares: false,
        shares: shares,
      };
    }
    return item;
  });

  billData.items = itemsWithShares;
  saveBillData(billData);
}

export function getBillFriends() {
  return getBillData().friends;
}

export function saveBillFriends(friends) {
  if (!Array.isArray(friends)) throw new Error('friends is not an Array');
  const billData = getBillData();
  billData.friends = friends;
  saveBillData(billData);
}

export function getBillTimestamp() {
  return getBillData().timestamp;
}

export function saveTimestamp(timestamp) {
  const billData = getBillData();
  billData.timestamp = timestamp;
  saveBillData(billData);
}

export function getTotalAmount() {
  return getBillData().totalAmount;
}

export function saveTotalAmount(amount) {
  const billData = getBillData();
  billData.totalAmount = amount;
  saveBillData(billData);
}

// GST management functions
export function getGstData() {
  return getBillData().gst || { enabled: false, percentage: 0 };
}

export function saveGstData(enabled, percentage = 0) {
  const billData = getBillData();
  billData.gst = {
    enabled: Boolean(enabled),
    percentage: enabled ? Number(percentage) : 0,
  };
  saveBillData(billData);
}

// Discount management functions
export function getDiscountData() {
  return getBillData().discount || { enabled: false, percentage: 0 };
}

export function saveDiscountData(enabled, percentage = 0) {
  const billData = getBillData();
  billData.discount = {
    enabled: Boolean(enabled),
    percentage: enabled ? Number(percentage) : 0,
  };
  saveBillData(billData);
}

// Item shares management functions
export function updateItemShares(itemIndex, shares) {
  if (
    itemIndex < 0 ||
    !Number.isInteger(itemIndex) ||
    !shares ||
    typeof shares !== 'object'
  )
    return;

  const billData = getBillData();
  if (billData.items[itemIndex]) {
    billData.items[itemIndex].shares = shares;
    saveBillData(billData);
  }
}

export function toggleCustomShares(itemIndex, hasCustomShares) {
  if (
    itemIndex < 0 ||
    !Number.isInteger(itemIndex) ||
    typeof hasCustomShares !== 'boolean'
  )
    return;

  const billData = getBillData();
  if (billData.items[itemIndex]) {
    billData.items[itemIndex].hasCustomShares = hasCustomShares;

    // Initialize shares object if enabling custom shares
    if (hasCustomShares && !billData.items[itemIndex].shares) {
      const itemFriends = getItemFriends(itemIndex);
      const item = billData.items[itemIndex];
      const initialShares = {};
      if (itemFriends.length > 0 && item.quantity > 0) {
        const sharePerPerson = item.quantity / itemFriends.length;
        itemFriends.forEach(friendName => {
          if (friendName && typeof friendName === 'string') {
            initialShares[friendName] = sharePerPerson; // Equal distribution of total quantity
          }
        });
      }
      billData.items[itemIndex].shares = initialShares;
    }

    saveBillData(billData);
  }
}

export function getItemShares(itemIndex) {
  if (itemIndex < 0 || !Number.isInteger(itemIndex)) return {};

  const billData = getBillData();
  return billData.items[itemIndex]?.shares || {};
}

export function initializeItemWithShares(item, itemIndex) {
  const itemFriends = getItemFriends(itemIndex);
  const shares = {};

  if (itemFriends.length > 0) {
    const sharePerPerson = item.quantity / itemFriends.length;
    itemFriends.forEach(friendName => {
      shares[friendName] = sharePerPerson; // Equal distribution of total quantity
    });
  }

  return {
    ...item,
    hasCustomShares: false,
    shares: shares,
  };
}

// Helper function to validate that shares add up to the item quantity
export function validateItemShares(itemIndex) {
  const billData = getBillData();
  const item = billData.items[itemIndex];
  if (!item || !item.shares) return false;

  const totalShares = Object.values(item.shares).reduce(
    (sum, share) => sum + share,
    0
  );
  return Math.abs(totalShares - item.quantity) < 0.01; // Allow for small floating point differences
}

// Helper function to get the cost per person for an item
export function getItemCostPerPerson(itemIndex) {
  const billData = getBillData();
  const item = billData.items[itemIndex];
  if (!item || !item.shares) return {};

  const costPerPerson = {};
  const pricePerUnit = item.price / item.quantity;

  Object.entries(item.shares).forEach(([friendName, share]) => {
    costPerPerson[friendName] = share * pricePerUnit;
  });

  return costPerPerson;
}

// Friend item management functions
export function addFriendToItem(friendName, itemIndex) {
  if (!friendName || typeof friendName !== 'string' || itemIndex < 0) return;

  const billData = getBillData();
  const friend = billData.friends.find(f => f.name === friendName);

  if (
    friend &&
    Array.isArray(friend.share) &&
    !friend.share.includes(itemIndex)
  ) {
    friend.share.push(itemIndex);
    saveBillData(billData);
  }
}

export function removeFriendFromItem(friendName, itemIndex) {
  if (!friendName || typeof friendName !== 'string' || itemIndex < 0) return;

  const billData = getBillData();
  const friend = billData.friends.find(f => f.name === friendName);

  if (friend && Array.isArray(friend.share)) {
    friend.share = friend.share.filter(index => index !== itemIndex);
    saveBillData(billData);
  }
}

export function getFriendItems(friendName) {
  if (!friendName || typeof friendName !== 'string') return [];

  const billData = getBillData();
  const friend = billData.friends.find(f => f.name === friendName);

  return friend && Array.isArray(friend.share) ? friend.share : [];
}

export function getItemFriends(itemIndex) {
  if (itemIndex < 0 || !Number.isInteger(itemIndex)) return [];

  const billData = getBillData();

  return billData.friends
    .filter(
      friend =>
        friend &&
        Array.isArray(friend.share) &&
        friend.share.includes(itemIndex)
    )
    .map(friend => friend.name);
}
