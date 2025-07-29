import { useDisplayShares } from '@/hooks/useDisplayShares';

export default function IndividualShares() {
  const { billData } = useDisplayShares();

  const calculateFriendTotal = friend => {
    return friend.share.reduce((total, itemIndex) => {
      const item = billData.items[itemIndex];
      const friendShare = item.shares[friend.name] || 0;
      const shareAmount = friendShare * item.price;
      return total + shareAmount;
    }, 0);
  };

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
              <span className="font-extrabold text-[1.25rem]">
                {friend.name}
              </span>
              <span className="text-[1.25rem] font-light">
                <span className="font-extrabold">
                  ₹ {calculateFriendTotal(friend).toFixed(2)}
                </span>
              </span>
            </div>
            <ul>
              {friend.share.map((itemIndex, itemShareIndex) => {
                const item = billData.items[itemIndex];
                const friendShare = item.shares[friend.name] || 0;
                const shareAmount = friendShare * item.price; // Fixed calculation

                return (
                  <li key={itemShareIndex} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>₹ {shareAmount.toFixed(2)}</span>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
