import { Link } from 'react-router-dom';
import HomeIllustration from '@public/home_illustration.png';

export default function HomePage() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen ">
        <div className="mx-5 flex flex-col justify-end align-middle h-full max-w-[40rem] w-full">
          <div>
            <img
              src={HomeIllustration}
              alt="Home Illustration"
              className="max-w-[35rem] mx-auto w-full"
            />
          </div>
          <div className="home-title-container">
            <p className="text-[1.75rem] font-light">welcome to</p>
            <p className="uppercase text-[5rem] font-extrabold mt-[-1.5rem]">
              Split.it
            </p>
            <span className="w-[30rem] text-[1rem] text-justify font-light lg:text-[1.425rem]">
              "<span className="underline font-semibold">Seamlessly</span>{' '}
              divide your bills according to individual choices or equally,
              guaranteeing everyone pays their fair share with ease."
            </span>
          </div>
          <div className="flex flex-col items-center justify-center my-[4rem] gap-2">
            <Link
              to="/bill"
              className="w-[15rem] text-center bg-neutral-800 transition-colors duration-150 ease-in-out hover:bg-neutral-700 text-white font-bold py-3 px-4 rounded-lg"
            >
              Enter Bill
            </Link>
            <Link
              to="/ocr"
              className="coming-soon-banner w-[15rem] text-center bg-neutral-600 transition-colors duration-150 ease-in-out hover:bg-neutral-700 text-white font-bold py-3 px-4 rounded-lg"
            >
              Upload Bill
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
