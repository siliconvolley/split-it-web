import BillDetails from './BillDetails';
import IndividualShares from './IndividualShares';

export default function DisplaySharesInfo() {
  return (
      <main
        id="screenshot"
        className="place-items-center py-4 px-8 -mx-5"
      >
        <BillDetails />
        <IndividualShares />
      </main>
  );
}
