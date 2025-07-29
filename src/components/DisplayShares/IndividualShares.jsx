import { useDisplayShares } from '@/hooks/useDisplayShares';

export default function IndividualShares() {
  const { billData } = useDisplayShares();

  const calculateFriendTotal = friend => {
    if (
      !friend ||
      !Array.isArray(friend.share) ||
      !Array.isArray(billData.items)
    ) {
      return 0;
    }

    return friend.share.reduce((total, itemIndex) => {
      // Validate itemIndex and check if item exists
      if (itemIndex < 0 || itemIndex >= billData.items.length) {
        return total;
      }

      const item = billData.items[itemIndex];
      if (!item || !item.shares || typeof item.price !== 'number') {
        return total;
      }

      const friendShare = parseFloat(item.shares[friend.name]) || 0;
      const shareAmount = friendShare * item.price;

      // Validate the calculated amount
      if (isNaN(shareAmount) || shareAmount < 0) {
        return total;
      }

      return total + shareAmount;
    }, 0);
  };

  // Early return if billData is not available or invalid
  if (
    !billData ||
    !Array.isArray(billData.friends) ||
    !Array.isArray(billData.items)
  ) {
    return (
      <section className="flexible-container my-8">
        <h3 className="font-semibold text-lg leading-none">
          Individual Shares
        </h3>
        <p className="mt-4 text-gray-500">No data available</p>
      </section>
    );
  }

  return (
    <section className="flexible-container my-8">
      <h3 className="font-semibold text-lg leading-none">Individual Shares</h3>

      <ul className="grid w-full mt-4">
        {billData.friends.map((friend, index) => {
          // Skip invalid friends
          if (!friend || !friend.name || !Array.isArray(friend.share)) {
            return null;
          }

          return (
            <li
              key={`${friend.name}-${index}`} // More unique key
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
                  // Validate itemIndex and check if item exists
                  if (itemIndex < 0 || itemIndex >= billData.items.length) {
                    return null;
                  }

                  const item = billData.items[itemIndex];
                  if (
                    !item ||
                    !item.name ||
                    !item.shares ||
                    typeof item.price !== 'number'
                  ) {
                    return null;
                  }

                  const friendShare = parseFloat(item.shares[friend.name]) || 0;
                  const shareAmount = friendShare * item.price;

                  // Skip if the calculation is invalid
                  if (isNaN(shareAmount) || shareAmount < 0) {
                    return null;
                  }

                  return (
                    <li
                      key={`${itemIndex}-${itemShareIndex}`}
                      className="flex justify-between"
                    >
                      <span>{item.name}</span>
                      <span>₹ {shareAmount.toFixed(2)}</span>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
