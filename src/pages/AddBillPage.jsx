import PageLayout from './PageLayout';
import Navbar from '@/components/Navbar';
import BillEntryForm from '@/components/AddBill/BillEntryForm';

export default function AddBillPage() {
  return (
    <PageLayout>
      <Navbar path="/" title="Add Bill" />
      <BillEntryForm />
    </PageLayout>
  );
}
