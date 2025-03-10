export default function DisplayBillTotal() {
  return (
    <div className="bg-blue-200 flex justify-between pt-1">
      <span className="uppercase font-bold">Total: </span>
      <span className="font-bold">₹ {totalAmount.toFixed(2)}</span>
    </div>
  );
}