// Bill data structure
const initialBillData = {
  title: '',
  timestamp: '',
  totalAmount: 0,
  friends: [],
  items: [],
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
  billData.items = items;
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
