import Navbar from '@/components/Navbar';
import AddBill from '@/components/AddBill';
import Button from '@/components/Button';

export default function AddBillPage() {

  return (
    <div className="h-svh max-w-[40rem] flex flex-col justify-start mx-auto px-5">
      <Navbar path='/' title='Add Bill' />

      <AddBill />

      <Button path="/bill/friends" className="my-16">
        Add Bill
      </Button>
    </div>
  );
}
