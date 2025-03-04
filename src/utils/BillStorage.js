export function clearBillData() {
  localStorage.removeItem('billTitle');
  localStorage.removeItem('items');
}

// Bill Title
export function initializeBillTitle() {
  const savedBillTitle = localStorage.getItem('billTitle');
  return savedBillTitle ? String(savedBillTitle) : '';
}

export function saveBillTitle(billTitle) {
  billTitle
    ? localStorage.setItem('billTitle', billTitle)
    : localStorage.removeItem('billTitle');
}

// Bill Items
export function initializeBillItems() {
  const savedBillItems = localStorage.getItem('items');
  return savedBillItems ? JSON.parse(savedBillItems) : [];
}

export function saveBillItems(billItems) {
  if (!Array.isArray(billItems)) throw new Error('billItems is not an Array');

  billItems.length
    ? localStorage.setItem('items', JSON.stringify(billItems))
    : localStorage.removeItem('items');
}
