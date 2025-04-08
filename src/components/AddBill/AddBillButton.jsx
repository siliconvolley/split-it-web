import Button from '@/components/Button';

export default function AddBillButton() {
  return (
    <div className="flex self-center mt-8">
      <Button path="/bill/friends" className="w-[15rem] my-16">
        Add Bill
      </Button>
    </div>
  );
}
