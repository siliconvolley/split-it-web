import Button from '@/components/Button';
import { useDisplayShares } from '@/hooks/useDisplayShares';

export default function DownloadBillButton() {
  const { downloadBill } = useDisplayShares();

  return (
    <Button className="w-[15rem] z-10 fixed bottom-16 left-1/2 transform -translate-x-1/2" onClick={downloadBill}>
      Download Bill
    </Button>
  );
}
