import Button from '@/components/Button';
import { useDisplayShares } from '@/hooks/useDisplayShares';

export default function DownloadBillButton() {
  const { downloadBill } = useDisplayShares();

  return (
    <Button
      className="w-[15rem] text-center bg-neutral-800 hover:bg-neutral-700 transition-colors duration-150 ease-in-out text-white font-bold py-3 px-4 my-4 rounded-lg grid place-items-center"
      onClick={downloadBill}
    >
      Download Bill
    </Button>
  );
}
