import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Utensils,
  Plus,
  UserCheck,
  MinusCircle,
} from 'lucide-react';

function BillSplit() {
  const location = useLocation();
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [friendName, setFriendName] = useState('');
  const [showInput, setShowInput] = useState(false);

  if (!location.state) {
    navigate('/bill');
    return null;
  }

  const { title, timestamp, items, totalAmount } = location.state;

  const addFriend = () => {
    if (!friendName) return;
    setFriends([...friends, friendName]);
    setFriendName('');
    setShowInput(false);
  };

  const removeFriend = index => {
    setFriends(friends.filter((_, i) => i !== index));
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      addFriend();
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full sm:max-w-xl relative">
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
                      <span className="text-sm font-semibold">Rs.</span>{' '}
                      <span className="font-extrabold">{totalAmount}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col mr-4">
                  <Link
                    to="/bill/split"
                    className="my-1 text-center bg-neutral-800 hover:bg-neutral-700 transition-colors duration-150 ease-in-out text-white font-bold py-3 px-4 rounded-lg"
                  >
                    Split
                  </Link>
                  <Link
                    to="/bill/split-evenly"
                    className="my-1 flex-1 text-center inner-border hover:bg-neutral-200 transition-colors duration-150 ease-in-out font-bold py-3 px-4 rounded-lg"
                  >
                    Split evenly
                  </Link>
                </div>
              </div>

              <div className="my-8">
                <p className="font-bold">Share with</p>
                <div className="flex gap-x-2 my-4 items-center">
                  <div>
                    <button
                      onClick={() => setShowInput(true)}
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
                        <UserCheck color="#eeeeee" size="32" />
                      </div>
                      <p className="text-center mt-1 text-sm font-bold">
                        {friend}
                      </p>
                      <button
                        onClick={() => removeFriend(index)}
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center"
                        title="Remove friend"
                      >
                        <MinusCircle color="#ffffff" size="16" />
                      </button>
                    </div>
                  ))}
                </div>

                {showInput && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                      <h2 className="text-lg font-bold mb-4">Add a Friend</h2>
                      <input
                        type="text"
                        placeholder="Friend's Name"
                        value={friendName}
                        onChange={e => setFriendName(e.target.value)}
                        onKeyDown={handleKeyDown}
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
                    <div className="flex flex-col flex-1 gap-y-2 w-[28rem]">
                      {items.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-flow-col justify-between items-center gap-x-4 px-4 py-4 bg-neutral-50 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
                        >
                          <p className="font-bold">x{item.quantity}</p>
                          <p className="font-medium">{item.name}</p>
                          <p className="font-bold">{item.price.toFixed(2)}</p>
                          <div>
                            <button className="w-fit h-fit p-2 bg-neutral-800 hover:bg-neutral-600 transition-colors duration-150 ease-in-out rounded-full">
                              <Plus color="#eeeeee" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
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

export default BillSplit;
