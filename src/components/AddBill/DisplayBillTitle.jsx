import { useAddBill } from '@/hooks/useAddBill';

export default function DisplayBillTitle() {
  const { billTitle, setBillTitle, timestamp } = useAddBill();

  return (
    <>
      <input
        name="billTitle"
        type="text"
        placeholder="Enter Bill Title"
        className="bg-inherit h-8 text-lg text-center font-extrabold"
        value={billTitle}
        onChange={e => setBillTitle(e.target.value)}
      />
      <span className="text-center">{timestamp}</span>
    </>
  );
}
