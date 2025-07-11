export function calculateTotalAmount(billItems) {
  if (billItems.length === 0) return 0;
  const total = billItems.reduce(
    (sum, item) => Number(sum) + Number(item.quantity) * Number(item.price),
    0
  );
  return Math.round(total * 100) / 100;
}

export function getTimestamp() {
  const timestamp = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());

  return timestamp;
}
