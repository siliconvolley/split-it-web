import AddBillContextProvider from '@/contexts/add-bill-context';
import BillEntryControls from './BillEntryControls';
import BillEntryItemsList from './BillEntryItemsList';
import DisplayBillTitle from './DisplayBillTitle';
import DisplayBillTotal from './DisplayBillTotal';
import AddBillButton from './AddBillButton';

export default function BillEntryForm() {
  return (
    <main className="place-items-center px-2 py-4">
      <AddBillContextProvider>
        <section className="flexible-container bg-neutral-50 flex flex-col p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <DisplayBillTitle />
          <BillEntryItemsList />
          <DisplayBillTotal />
          <BillEntryControls />
        </section>
        <AddBillButton />
      </AddBillContextProvider>
    </main>
  );
}
