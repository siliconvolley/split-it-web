import PageLayout from './PageLayout';
import Navbar from '@/components/Navbar';
import BillEntryForm from '@/components/AddBill/BillEntryForm';
import Button from '@/components/Button';

export default function AddBillPage() {
  return (
    <PageLayout>
      <Navbar path="/" title="Add Bill" />
      <BillEntryForm />
      <div className="flex self-center mt-8">
        <Button path="/bill/friends" className="w-[15rem] my-16">
          Add Bill
        </Button>
      </div>
    </PageLayout>
  );
}
