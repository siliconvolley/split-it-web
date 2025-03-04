import { Link } from 'react-router-dom';

export default function ComingSoonButton({ path, children }) {
  return (
    <Link
      to={path}
      className="coming-soon-banner w-[15rem] py-3 px-4 rounded-lg font-bold text-center text-white bg-neutral-600 transition-colors duration-150 ease-in-out hover:bg-neutral-700"
    >
      {children}
    </Link>
  );
}
