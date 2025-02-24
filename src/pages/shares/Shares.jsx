import html2canvas from 'html2canvas';
import { ChevronLeft, Utensils } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Shares() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    shares,
    title,
    items = [],
    timestamp,
    totalAmount,
    friends,
    itemFriends,
  } = location.state || {
    shares: {},
    title: '',
    items: [],
    timestamp: '',
    totalAmount: 0,
  };

  const sharesArray = Object.keys(shares).map(member => ({
    member,
    total: shares[member].total,
    items: shares[member].items,
  }));

  function downloadBill() {
    const element = document.querySelector('#screenshot');
    if (element) {
      html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
      })
        .then(canvas => {
          // Replace spaces with underscores and remove commas
          const formattedTimestamp = timestamp.replace(/\s+/g, '_').replace(/,/g, '');
          const formattedTitle = title.replace(/\s+/g, '_').replace(/,/g, '');

          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = `${formattedTimestamp}_${formattedTitle}.png`; // Use formatted strings
          link.click();
        })
        .catch(error => {
          console.error('Error capturing screenshot:', error);
        });
    } else {
      console.error("Element with ID 'screenshot' not found.");
    }
  }

  function handleBackClick() {
    navigate('/bill/friends', {
      state: { title, timestamp, items, totalAmount, friends, itemFriends },
    });
    console.log(friends)
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full sm:max-w-xl relative mb-16">
        <nav className="flex mx-4 my-8">
          <button onClick={handleBackClick} className="absolute">
            <ChevronLeft color="#262626" size="32" />
          </button>
          <span className="text-2xl font-bold flex-grow text-center">
            Share Details
          </span>
        </nav>

        <main className="flex flex-col justify-center">
          <div id="screenshot" className="w-full sm:max-w-xl">
            <div className="mx-4 flex flex-col items-center">
              <div className="w-full sm:w-[34rem] my-2 p-4 grid bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg relative">
                <div className="grid grid-flow-col place-items-center justify-between gap-2">
                  <div className="grid grid-flow-col justify-items-center place-items-center gap-2">
                    <div className="bg-neutral-900 w-fit h-fit p-[0.75rem] rounded-full">
                      <Utensils color="#eeeeee" />
                    </div>
                    <div id="just-a-wrapper">
                      <p className="font-bold text-[1.25rem] ">{title}</p>
                      <p className="text-sm text-[1.25rem]">{timestamp}</p>
                    </div>
                  </div>
                  <div className="grid justify-items-end gap-[0.25rem]">
                    <p className="font-medium leading-none text-[0.95rem]">
                      Total
                    </p>
                    <p className="text-[1.225rem] font-light leading-none ">
                      ₹ <span className="font-extrabold">{totalAmount}</span>
                    </p>
                  </div>
                </div>

                <div
                  className="w-full overflow-hidden my-4"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #000 50%, transparent 50%)',
                    backgroundSize: '10px 1px',
                    height: '1px',
                  }}
                ></div>
                <div id="bill-details">
                  {items.map((item, index) => (
                    <div
                      key={item.serialNumber}
                      className="grid grid-flow-col grid-cols-4 gap-0 bg-inherit"
                      style={{ gridTemplateColumns: '10% 50% 20% 20%' }}
                    >
                      <div className="">{index + 1}.</div>
                      <div className="">{item.name}</div>
                      <div className="text-end">x{item.quantity}</div>
                      <div className="text-end">{item.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="my-4 font-bold text-[1.25rem]">
                Individual Shares
              </h2>

              <ul className="grid w-full sm:w-[34rem]">
                {sharesArray.map((share, index) => (
                  <li
                    key={index}
                    className="mb-2 w-full p-4 bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
                  >
                    <div className="flex justify-between">
                      <span className="font-extrabold text-[1.25rem]">
                        {share.member}
                      </span>
                      <span className="text-[1.25rem] font-light">
                        ₹{' '}
                        <span className="font-extrabold">
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
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="w-[15rem] text-center bg-neutral-800 hover:bg-neutral-700 transition-colors duration-150 ease-in-out text-white font-bold py-3 px-4 my-4 rounded-lg grid place-items-center"
              onClick={downloadBill}
            >
              Download Bill
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
