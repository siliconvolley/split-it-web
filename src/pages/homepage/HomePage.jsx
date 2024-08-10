import React from 'react';
import { Link } from 'react-router-dom';
import HomeIllustration from '../../assets/home_illustration.png';

function HomePage() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen ">
        <div className="mx-5 flex flex-col justify-end align-middle h-dvh max-w-[40rem] w-full">
          <div>
            <img
              src={HomeIllustration}
              alt="Home Illustration"
              className="max-w-[35rem] mx-auto w-full"
            />
          </div>
          <div className="home-title-container">
            <div className="text-[1.75rem] font-light">welcome to</div>
            <div className="uppercase text-[5rem] font-extrabold mt-[-0.5rem]">
              Split.it
            </div>
            <span className="w-[30rem] text-[0.9rem] text-justify lg:text-[1.25rem]">
              "<span className="underline font-semibold">Seamlessly</span>{' '}
              divide your bills according to individual choices or equally,
              guaranteeing everyone pays their fair share with ease."
            </span>
          </div>
          <div className="flex justify-center my-[6rem]">
            <Link
              to="/bill"
              className="w-[15rem] text-center bg-neutral-800 transition-colors duration-150 ease-in-out hover:bg-neutral-700 text-white font-bold py-3 px-4 rounded-lg"
            >
              Enter Bill
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
