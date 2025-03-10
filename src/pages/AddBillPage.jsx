import PageLayout from './PageLayout';
import Navbar from '@/components/Navbar';
import BillEntryForm from '@/components/AddBill/BillEntryForm';
import Button from '@/components/Button';

export default function AddBillPage() {
  return (
    <PageLayout>
      <Navbar path="/" title="Add Bill" />
      <BillEntryForm />
      <Button path="/bill/friends" className="my-16">
        Add Bill
      </Button>
    </PageLayout>
  );
}
