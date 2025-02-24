import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Utensils, Plus, Minus } from 'lucide-react';
import Bill from '@utils/Bill';

export default function AddFriends() {
  const location = useLocation();
  const navigate = useNavigate();
  const [friends, setFriends] = useState(location.state?.friends || JSON.parse(localStorage.getItem('friends')) || []);
  const [friendName, setFriendName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [itemFriends, setItemFriends] = useState(location.state?.itemFriends || JSON.parse(localStorage.getItem('itemFriends')) || {});
  const inputRef = useRef(null);
  const popupRef = useRef(null);

  const billDetails =
    location.state ?? JSON.parse(localStorage.getItem('billDetails')) ?? {};
  const { title, timestamp, items, totalAmount } = billDetails;

  useEffect(() => {
    if (!title) {
      navigate('/bill');
    }
  }, [title, navigate]);

  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem('itemFriends', JSON.stringify(itemFriends));
  }, [itemFriends]);

  const addFriend = () => {
    if (!friendName) return;
    setFriends([...friends, friendName]);
    setFriendName('');
    setShowInput(false);
  };

  const removeFriend = index => {
    const friendToRemove = friends[index];
    setFriends(friends.filter((_, i) => i !== index));
    const updatedItemFriends = { ...itemFriends };
    for (const itemIndex in updatedItemFriends) {
      updatedItemFriends[itemIndex] = updatedItemFriends[itemIndex].filter(
        friend => friend !== friendToRemove
      );
    }
    setItemFriends(updatedItemFriends);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      addFriend();
    }
  };

  const handleAddFriendClick = () => {
    setShowInput(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  const adjustPopup = () => {
    if (popupRef.current) {
      if (window.innerWidth < 768) {
        popupRef.current.style.transform = 'translateY(-50%)';
      } else {
        popupRef.current.style.transform = 'none';
      }
    }
  };

  const handleClickOutside = event => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setSelectedItemIndex(null);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', adjustPopup);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('resize', adjustPopup);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePlusClick = index => {
    setSelectedItemIndex(index);
  };

  const handleAllSelect = () => {
    const updatedItemFriends = { ...itemFriends };
    if (!updatedItemFriends[selectedItemIndex]) {
      updatedItemFriends[selectedItemIndex] = [];
    }
    friends.forEach(friend => {
      if (!updatedItemFriends[selectedItemIndex].includes(friend)) {
        updatedItemFriends[selectedItemIndex].push(friend);
      }
    });
    setItemFriends(updatedItemFriends);
    setSelectedItemIndex(null);
  };

  const handleFriendSelect = friend => {
    const updatedItemFriends = { ...itemFriends };
    if (!updatedItemFriends[selectedItemIndex]) {
      updatedItemFriends[selectedItemIndex] = [];
    }
    if (!updatedItemFriends[selectedItemIndex].includes(friend)) {
      updatedItemFriends[selectedItemIndex].push(friend);
    }
    setItemFriends(updatedItemFriends);
    setSelectedItemIndex(null);
  };

  const handleRemoveItemFriend = (itemIndex, friendIndex) => {
    const updatedItemFriends = { ...itemFriends };
    updatedItemFriends[itemIndex] = updatedItemFriends[itemIndex].filter(
      (_, index) => index !== friendIndex
    );
    setItemFriends(updatedItemFriends);
  };

  const handleSplitClick = () => {
    const bill = new Bill(title, timestamp);

    bill.addMembers(friends);

    items.forEach((item, index) => {
      bill.addItem(item.name, item.price, item.quantity);
      if (itemFriends[index]) {
        bill.addMembersToItem(item.name, itemFriends[index]);
      }
    });

    const shares = bill.findIndividualShares();

    navigate('/bill/shares', {
      state: { shares, title, timestamp, totalAmount, items, friends, itemFriends },
    });
    console.log(shares);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full sm:max-w-xl relative mb-16">
        <nav className="flex mx-4 my-8">
          <Link to="/bill" className="absolute">
            <ChevronLeft color="#262626" size="32" />
          </Link>
          <span className="text-2xl font-bold flex-grow text-center">
            Split the Bill
          </span>
        </nav>

        <main className="flex flex-col justify-center">
          <div className="w-full sm:max-w-xl">
            <div className="mx-4 flex flex-col justify-center">
              <div
                className="w-full sm:w-[34rem] grid gap-x-4 p-4 bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
                style={{ gridTemplateColumns: '55% 45%' }}
              >
                <div className="flex flex-col justify-between">
                  <div className="grid grid-flow-col gap-4 justify-start">
                    <div className="bg-neutral-800 w-fit h-fit p-2 rounded-full">
                      <Utensils color="#eeeeee" />
                    </div>
                    <div>
                      <p className="font-bold">{title}</p>
                      <p className="text-sm">{timestamp}</p>
                    </div>
                  </div>

                  <div>
                    <p>
                      <span className="font-bold">Total:</span>
                    </p>
                    <p>
                      <span className="text-sm font-semibold">₹</span>{' '}
                      <span className="font-extrabold">{totalAmount}</span>
                    </p>
                  </div>
                </div>

                <div className="grid mr-4">
                  <button
                    onClick={handleSplitClick}
                    className="my-1 text-center bg-neutral-800 hover:bg-neutral-700 transition-colors duration-150 ease-in-out text-white font-bold py-3 px-4 rounded-lg"
                  >
                    Split
                  </button>
                  <Link className="my-1 flex-1 text-center inner-border hover:bg-neutral-200 transition-colors duration-150 ease-in-out font-bold py-3 px-4 rounded-lg">
                    Split evenly
                  </Link>
                </div>
              </div>

              <div className="mt-8 mb-12">
                <p className="font-bold">Share with</p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 my-4 items-center">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={handleAddFriendClick}
                      className="bg-neutral-300 hover:bg-neutral-400 w-[4rem] h-[4rem] p-2 transition-colors duration-150 ease-in-out rounded-full grid place-items-center"
                    >
                      <Plus color="#eeeeee" size="32" />
                    </button>
                    <p className="text-center text-sm mt-1">Add Friend</p>
                  </div>
                  {friends.map((friend, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col items-center"
                    >
                      <div className="bg-neutral-800 w-[4rem] h-[4rem] p-2 rounded-full grid place-items-center">
                        <span className="text-2xl text-white font-bold">
                          {friend.charAt(0)}
                        </span>
                      </div>
                      <p className="text-center mt-1 text-sm font-bold break-words">
                        {friend}
                      </p>
                      <button
                        onClick={() => removeFriend(index)}
                        className="absolute top-[0.25rem] right-[1rem] transform translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center"
                        title="Remove friend"
                      >
                        <Minus color="#ffffff" size="16" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {showInput && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div
                    id="popup"
                    className="bg-white p-6 z-10 rounded-lg shadow-lg w-full max-w-sm transition-transform duration-300 ease-in-out"
                  >
                    <h2 className="text-lg font-bold mb-4">Add a Friend</h2>
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Friend's Name"
                      value={friendName}
                      onChange={e => setFriendName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onFocus={adjustPopup}
                      onBlur={adjustPopup}
                      className="bg-neutral-200 px-2 py-1 rounded-lg w-full h-[3rem] mb-4"
                    />
                    <div className="flex justify-end gap-x-2">
                      <button
                        onClick={() => setShowInput(false)}
                        className="bg-red-500 hover:bg-red-600 transition-colors duration-150 ease-in-out text-white font-bold py-2 px-4 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={addFriend}
                        className="bg-blue-500 hover:bg-blue-600 transition-colors duration-150 ease-in-out text-white font-bold py-2 px-4 rounded-lg"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="w-full sm:w-[34rem] mt-8">
                <p className="font-bold">Bill Details</p>
                <div className="flex gap-x-2 my-4">
                  <div className="flex flex-col flex-1 gap-y-2 w-full sm:w-[28rem]">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 sm:grid-cols-[20%_45%_15%_20%] justify-between items-center gap-x-4 gap-y-1 px-4 py-4 bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
                      >
                        <div className="text-sm font-thin flex justify-between">
                          <span>#{index + 1}</span>
                          <span className="font-bold">x{item.quantity}</span>
                        </div>
                        <div className="font-medium flex justify-between">
                          <span className="font-medium visible sm:hidden">Name:</span>
                          <span className="font-extrabold">{item.name}</span>
                        </div>
                        <div className="font-medium flex justify-between">
                          <span className="visible sm:hidden">Price:</span>
                          <span>
                            <span className="text-sm font-semibold">₹</span> 
                            {item.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="relative">
                          <button
                            onClick={() => handlePlusClick(index)}
                            className="w-fit h-fit p-2 bg-neutral-800 hover:bg-neutral-600 transition-colors duration-150 ease-in-out rounded-full"
                          >
                            <Plus color="#eeeeee" />
                          </button>
                          {selectedItemIndex === index && (
                            <div
                              ref={popupRef}
                              className="absolute top-0 right-[6.5rem] bg-neutral-100 p-4 shadow-lg rounded-lg w-48"
                            >
                              <h3 className="text-sm font-bold mb-2">Select Friend</h3>
                              <ul>
                                <li onClick={() => handleAllSelect()} className="cursor-pointer p-2 hover:bg-gray-200 rounded">ALL</li>
                                {friends.map((friend, i) => (
                                  <li
                                    key={i}
                                    onClick={() => handleFriendSelect(friend)}
                                    className="cursor-pointer p-2 hover:bg-gray-200 rounded"
                                  >
                                    {friend}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        {itemFriends[index] && itemFriends[index].length > 0 && (
                          <div className="flex items-center ml-2 flex-wrap">
                            {itemFriends[index].map((friend, friendIndex) => (
                              <div
                                key={friendIndex}
                                className="flex items-center mr-2 mb-2"
                              >
                                <div className="bg-neutral-800 w-8 h-8 rounded-full grid place-items-center">
                                  <span className="text-xl text-white font-bold">
                                    {friend.charAt(0)}
                                  </span>
                                </div>
                                <span className="ml-2 font-medium">{friend}</span>
                                <button
                                  onClick={() => handleRemoveItemFriend(index, friendIndex)}
                                  className="ml-1 w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center"
                                  title="Remove friend"
                                >
                                  <Minus color="#ffffff" size="12" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
