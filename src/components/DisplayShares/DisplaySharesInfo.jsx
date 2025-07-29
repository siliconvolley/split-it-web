import BillDetails from './BillDetails';
import IndividualShares from './IndividualShares';
import DownloadBillButton from './DownloadBillButton';
import DisplaySharesContextProvider from '@/contexts/DisplaySharesContextProvider';

export default function DisplaySharesInfo() {
  return (
    <DisplaySharesContextProvider>
      <main
        id="screenshot"
        className="place-items-center py-4 -mx-5"
      >
        <BillDetails />
        <IndividualShares />
      </main>
      <DownloadBillButton />
    </DisplaySharesContextProvider>
  );
}
