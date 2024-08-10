import html2canvas from 'html2canvas';
import { ChevronLeft, Utensils } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Shares() {
  const location = useLocation();
  const { shares, title, timestamp, totalAmount } = location.state || {
    shares: {},
    title: '',
    timestamp: '',
    totalAmount: 0,
  };

  const sharesArray = Object.keys(shares).map(member => ({
    member,
    total: shares[member].total,
    items: shares[member].items,
  }));

  function downloadBill() {
    const element = document.querySelector("#screenshot");
    if (element) {
      html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true
      }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'bill.png';
        link.click();
      }).catch(error => {
        console.error("Error capturing screenshot:", error);
      });
    } else {
      console.error("Element with ID 'screenshot' not found.");
    }
  }

  return (
    <div className="w-full flex justify-center" >
      <div className="w-full sm:max-w-xl relative mb-16">
        <nav className="flex mx-4 my-8">
          <Link to="/bill/friends" className="absolute">
            <ChevronLeft color="#262626" size="32" />
          </Link>
          <span className="text-2xl font-bold flex-grow text-center">
            Share Details
          </span>
        </nav>

        <main className="flex flex-col justify-center">
          <div id='screenshot' className="w-full sm:max-w-xl">
            <div className="mx-4 grid place-items-center">
              <div className="w-full sm:w-[34rem] my-2 p-8 flex justify-between bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg">
                <div className="grid grid-flow-col place-items-center gap-2">
                  <div className="bg-neutral-900 w-fit h-fit p-[0.75rem] rounded-full">
                    <Utensils color="#eeeeee" />
                  </div>
                  <div className="grid place-items-start gap-2">
                    <p className="font-bold text-[1.5rem] leading-none">
                      {title}
                    </p>
                    <p className="text-sm text-[1.25rem]">{timestamp}</p>
                  </div>
                </div>

                <div className="grid place-items-center justify-items-end gap-[0.25rem]">
                  <p className="text-[1.125rem] font-medium leading-none">
                    Total
                  </p>
                  <p className="text-[1.5rem] font-light leading-none">
                    ₹{' '}
                    <span className="font-extrabold text-[1.5rem]">
                      {totalAmount}
                    </span>
                  </p>
                </div>
              </div>

              <h2 className="my-4 font-bold text-[1.25rem]">
                Individual Shares
              </h2>

              <ul>
                {sharesArray.map((share, index) => (
                  <li
                    key={index}
                    className="mb-2 w-[34rem] sm:w-[34rem] p-4 bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
                  >
                    <div className="flex justify-between">
                      <span className="font-extrabold text-[1.25rem]">
                        {share.member}
                      </span>
                      <span className="text-[1.5rem] font-light">
                        ₹{' '}
                        <span className="font-extrabold text-[1.5rem]">
                          {share.total.toFixed(2)}
                        </span>
                      </span>
                    </div>
                    <ul>
                      {share.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>{item.item}</span>
                          <span>₹ {item.shareAmount.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <button
                className="w-[15rem] text-center bg-neutral-800 hover:bg-neutral-700 transition-colors duration-150 ease-in-out text-white font-bold py-3 px-4 my-4 rounded-lg grid place-items-center"
                onClick={downloadBill}
              >
                Download Bill
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Shares;
