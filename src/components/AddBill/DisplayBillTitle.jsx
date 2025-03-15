import { useAddBill } from "@/hooks/useAddBill";

export default function DisplayBillTitle() {
  const { billTitle, setBillTitle, timestamp, saveBillTitle } = useAddBill();

  return (
    <>
      <input
        name="billTitle"
        type="text"
        placeholder="Enter Bill Title"
        className="bg-inherit h-8 text-lg text-center font-extrabold"
        value={billTitle}
        onChange={e => {
          const newBillTitle = e.target.value;
          setBillTitle(newBillTitle);
          saveBillTitle(newBillTitle);
        }}
      />
      <span className="text-center">{timestamp}</span>
    </>
  );
}
