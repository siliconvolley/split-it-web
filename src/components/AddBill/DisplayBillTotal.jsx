import { useAddBill } from "@/hooks/useAddBill";

export default function DisplayBillTotal() {
  const { totalAmount } = useAddBill();

  return (
    <div className="flex justify-between pt-1">
      <span className="uppercase font-bold">Total: </span>
      <span className="font-bold">₹ {totalAmount.toFixed(2)}</span>
    </div>
  );
}
