import { PieChartIcon, X, AlertCircle } from 'lucide-react';

import Button from '@/components/Button';
import { useAddFriends } from '@/hooks/useAddFriends';
import { useState } from 'react';

export default function AddSharesPopover() {
  const {
    setAddSharesPopover,
    selectedItemData,
    isCustomShares,
    handleToggleCustomShares,
    selectedItemFriends,
    addFriendToSelectedItem,
    addAllFriendsToSelectedItem,
    removeFriendFromSelectedItem,
    updateFriendShareInSelectedItem,
    getRemainingQuantity,
    getAvailableFriendsToAdd,
    saveSelectedItemShares,
  } = useAddFriends();

  const [saveError, setSaveError] = useState('');

  const handleSave = () => {
    setSaveError('');

    // Validate that at least one friend is added
    if (selectedItemFriends.length === 0) {
      setSaveError('Please add at least one friend to share this item.');
      return;
    }

    // Validate shares in custom mode
    if (isCustomShares) {
      const remainingQty = getRemainingQuantity();
      if (Math.abs(remainingQty) > 0.01) {
        setSaveError(
          `Please allocate the remaining ${remainingQty.toFixed(2)} quantity.`
        );
        return;
      }
    }

    // Save and close popover
    const saveSuccess = saveSelectedItemShares();
    if (saveSuccess) {
      setAddSharesPopover(false);
    } else {
      setSaveError('Failed to save shares. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 grid place-items-center bg-neutral-950 bg-opacity-50 z-10 backdrop-blur-sm">
      <div className="bg-white p-4 z-10 rounded-lg shadow-lg w-[90%] max-w-sm transition-transform duration-300 ease-in-out">
        <h2 className="text-lg font-bold">{selectedItemData.name}</h2>
        <p className="text-base text-neutral-500">
          <span className="">₹ {selectedItemData.price} </span>
          <span className="text-sm">x{selectedItemData.quantity}</span>
        </p>

        {/* Toggle Switch */}
        <div className="flex items-center justify-between my-2 bg-neutral-100 p-2 rounded-lg">
          <div className="flex items-center gap-2">
            <PieChartIcon className="w-6 h-6" />
            <p className="grid">
              <span className="text-sm font-medium">Custom Shares</span>
              <span className="text-xs text-neutral-500 font-light text-pretty pr-3 leading-none">
                Set different proportions for each person
              </span>
            </p>
          </div>
          <button
            role="switch"
            aria-checked={isCustomShares}
            onClick={handleToggleCustomShares}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2
              ${isCustomShares ? 'bg-neutral-800' : 'bg-neutral-300'}`}
          >
            <p className="sr-only">Enable custom shares</p>
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out
                ${isCustomShares ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>

        {/* Friends List */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-3">
            Friends sharing this item:
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {selectedItemFriends.map(friend => (
              <div
                key={friend.name}
                className="flex items-center justify-between bg-neutral-50 p-1 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-neutral-800 rounded-full grid place-items-center text-white text-xs font-medium">
                    {friend.name && friend.name[0]
                      ? friend.name[0].toUpperCase()
                      : '?'}
                  </div>
                  <span className="text-sm font-medium">
                    {friend.name || 'Unknown'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {isCustomShares ? (
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max={selectedItemData?.quantity}
                      value={friend.share}
                      onChange={e =>
                        updateFriendShareInSelectedItem(
                          friend.name,
                          e.target.value
                        )
                      }
                      className="w-16 px-2 py-1 text-sm border rounded text-right"
                    />
                  ) : (
                    <span className="text-sm font-medium">
                      {friend.share.toFixed(2)}
                    </span>
                  )}
                  <button
                    onClick={() => removeFriendFromSelectedItem(friend.name)}
                    className="p-1 hover:bg-red-100 rounded-full text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Friend Dropdown */}
          {getAvailableFriendsToAdd().length > 0 && (
            <div className="mt-3">
              <select
                onChange={e => {
                  if (e.target.value === 'ALL') {
                    addAllFriendsToSelectedItem();
                    e.target.value = '';
                  } else if (e.target.value) {
                    addFriendToSelectedItem(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="w-full p-2 border rounded-lg text-sm"
                defaultValue=""
              >
                <option value="">Add a friend...</option>
                {getAvailableFriendsToAdd().length > 1 && (
                  <option value="ALL" className="font-medium">
                    Add all friends ({getAvailableFriendsToAdd().length})
                  </option>
                )}
                {getAvailableFriendsToAdd().map(friend => (
                  <option key={friend.name} value={friend.name}>
                    {friend.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Remaining Quantity Indicator */}
        {isCustomShares && (
          <div className="mb-4 text-end">
            <div className="text-sm">
              <span className="text-neutral-600">Remaining quantity: </span>
              <span
                className={`font-medium ${getRemainingQuantity() === 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {getRemainingQuantity().toFixed(2)}
              </span>
              <span className="text-neutral-600">
                {' '}
                / {selectedItemData?.quantity}
              </span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {saveError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{saveError}</span>
            </div>
          </div>
        )}

        <div className="grid grid-flow-col grid-cols-2 gap-x-2">
          <Button
            type="secondary"
            onClick={e => {
              e.preventDefault();
              setAddSharesPopover(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}
