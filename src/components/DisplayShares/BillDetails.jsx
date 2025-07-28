import { useDisplayShares } from '@/hooks/useDisplayShares';
import { Utensils } from 'lucide-react';

export default function BillDetails() {
  const { billData } = useDisplayShares();

  return (
    <section className="flexible-container bg-neutral-50 grid grid-row-2 gap-4 p-3 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
      {/* Initial Bill Details */}
      <div
        id="bill-details-wrapper"
        className="flex justify-between sm:space-x-0 "
      >
        <div className="flex items-center">
          <div
            id="icon-container"
            className="bg-neutral-800 border-neutral-800 border-2 p-2 rounded-full"
          >
            <Utensils size={20} stroke="white" />
          </div>
          <div className="px-2">
            <h2 className="text-lg font-extrabold text-wrap">
              {billData.title}
            </h2>
            <p className="text-sm font-normal">{billData.timestamp}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="font-semibold">Total:</h2>
          <p className="text-lg font-bold text-nowrap">
            ₹ {billData.totalAmount.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="dashed" />
      {/* Bill Items List */}
      <div>
        {billData.items.map((item, index) => (
          <div
            key={index}
            className="bg-inherit grid grid-flow-col grid-cols-4 items-center text-sm sm:text-base"
            style={{ gridTemplateColumns: '10% 50% 20% 20%' }}
          >
            <div className="">{index + 1}.</div>
            <div className="">{item.name}</div>
            <div className="text-center">x{item.quantity}</div>
            <div className="text-end">₹ {item.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
