import React from 'react';
import { Link } from 'react-router-dom';
import HomeIllustration from '../../assets/home_illustration.svg';

function HomePage() {
  return (
    <>
      <div className="mx-5 flex flex-col justify-end h-dvh">
        <div>
          <img
            src={HomeIllustration}
            alt="Home Illustration"
            className="max-w-[35rem] h-auto mx-auto mt-"
          />
        </div>
        <div className="home-title-container">
          <div className="text-[1.5rem] italic">Welcome to</div>
          <div className="uppercase text-[4rem] font-extrabold tracking-wide mt-[-0.5rem]">
            Split.it
          </div>
          <span className="text-[0.9rem] text-justify">
            "<span className="underline font-semibold">Seamlessly</span> divide
            your bills according to individual choices or equally, guaranteeing
            everyone pays their fair share with ease."
          </span>
        </div>
        <div className="flex justify-center my-[6rem]">
          <div className="w-[15rem] text-center bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 px-4 rounded-lg">
            <Link to="/bill" className="">
              Enter Bill
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
