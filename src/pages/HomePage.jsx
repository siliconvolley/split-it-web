import HomeIllustration from '@/public/home_illustration.png';
import Button from '@/components/Button';
import ComingSoonButton from '@/components/ComingSoonButton';

export default function HomePage() {
  return (
    <div className="h-svh max-w-[40rem] flex flex-col justify-center mx-auto px-5 py-8">
      <img
        src={HomeIllustration}
        alt="Home Illustration"
        className="max-w-[35rem] mx-auto w-full"
      />
      <div id="home-title-container">
        <p className="font-light text-[1.75rem]">welcome to</p>
        <h1 className="text-[5rem] font-extrabold mt-[-1.5rem] uppercase">
          Split.it
        </h1>
        <span className="font-light sm:text-xl">
          "<span className="underline font-semibold">Seamlessly</span>{' '}
          divide your bills according to individual choices or equally,
          guaranteeing everyone pays their fair share with ease."
        </span>
      </div>
      <div className="grid place-items-center gap-4">
        <Button path='/bill' className='mt-8'>
          Enter Bill
        </Button> 
        <ComingSoonButton path='/ocr'>
          Upload Bill
        </ComingSoonButton>
      </div>
    </div>
  );
}
