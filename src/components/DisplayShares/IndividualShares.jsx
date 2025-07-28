import { useDisplayShares } from '@/hooks/useDisplayShares';

export default function IndividualShares() {
  const { billData } = useDisplayShares();

  return (
    <section className="flexible-container my-8">
      <h3 className="font-semibold text-lg leading-none">Individual Shares</h3>

      <ul className="grid w-full mt-4">
        {billData.friends.map((friend, index) => (
          <li
            key={index}
            className="mb-2 w-full p-4 bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
          >
            <div className="flex justify-between">
              <span className="font-extrabold text-[1.25rem]">{friend.name}</span>
              <span className="text-[1.25rem] font-light">
                ₹ <span className="font-extrabold">Share Total</span>
              </span>
            </div>
            <ul>
              <li className="flex justify-between">
                <span>Item</span>
                <span>₹ Item Amount</span>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
