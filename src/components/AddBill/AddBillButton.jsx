import Button from '@/components/Button';
import { useAddBill } from '@/hooks/useAddBill';

export default function AddBillButton() {
  const { checkIfBillExists } = useAddBill();

  return (
    <div className="flex justify-center mt-8">
      <Button
        path="/bill/friends"
        className="w-[15rem] my-16"
        disabled={!checkIfBillExists()}
      >
        Add Bill
      </Button>
    </div>
  );
}
