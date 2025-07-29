import { DisplaySharesContext } from '@/contexts/AllContexts';
import { getBillData } from '@/utils/BillStorage';
import html2canvas from 'html2canvas';

export default function DisplaySharesContextProvider({ children }) {
  const billData = getBillData();

  const downloadBill = () => {
    const element = document.querySelector('#screenshot');
    if (element) {
      html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
        allowTaint: true,
      })
        .then(canvas => {
          // Replace spaces with underscores and remove commas
          const formattedTimestamp = billData.timestamp
            .replace(/\s+/g, '_')
            .replace(/,/g, '');
          const formattedTitle = billData.title
            .replace(/\s+/g, '_')
            .replace(/,/g, '');

          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = `${formattedTimestamp}_${formattedTitle}.png`;
          link.click();
        })
        .catch(error => {
          console.error('Error capturing screenshot:', error);
        });
    } else {
      console.error("Element with ID 'screenshot' not found.");
    }
  };

  const value = {
    billData,
    downloadBill,
  };

  return (
    <DisplaySharesContext.Provider value={value}>
      {children}
    </DisplaySharesContext.Provider>
  );
}
