export default function DisplayBillTitle() {
  return (
    <input
      name="billTitle"
      type="text"
      placeholder="Enter Bill Title"
      className="bg-purple-200 bg-inherit h-8 text-xl text-center font-extrabold"
      value={billTitle}
      onChange={e => {
        const newBillTitle = e.target.value;
        setBillTitle(newBillTitle);
        saveBillTitle(newBillTitle);
      }}
    />
  );
}
