import { useAddBill } from "@/hooks/useAddBill";
import { Plus, Trash2 } from "lucide-react";

export default function BillEntryControls() {
  const { billTitle, items, itemName, itemPrice, handleClearBillData, addItem } = useAddBill();

  return (
    <div className="flex justify-between text-sm">
      <button
        className="bg-neutral-100 flex flex-row items-center shadow mt-4 py-1 px-2 rounded-lg font-semibold text-center text-neutral-800 hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleClearBillData}
        disabled={!billTitle.trim() && items.length === 0}
      >
        <Trash2 size={16} className="mr-1" />
        Clear Bill Data
      </button>
      <button
        className="bg-neutral-100 flex flex-row items-center shadow mt-4 py-1 px-2 rounded-lg font-semibold text-center text-neutral-800 hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={addItem}
        disabled={!itemName || !itemPrice}
      >
        <Plus size={16} className="mr-1" />
        Add Item
      </button>
    </div>
  );
}
