import PageLayout from './PageLayout';
import Navbar from '@/components/Navbar';
import BillEntryForm from '@/components/AddBill/BillEntryForm';
import AddBillButton from '@/components/AddBill/AddBillButton';

export default function AddBillPage() {
  return (
    <PageLayout>
      <Navbar path="/" title="Add Bill" />
      <BillEntryForm />
      <AddBillButton />
    </PageLayout>
  );
}
