import { Link } from 'react-router-dom';

export default function Button({ path, children, className }) {
  return (
    <div className={`flex self-center ${className}`}>
      <Link
        to={path}
        className="w-[15rem] py-3 px-4 rounded-lg font-bold text-center text-white bg-neutral-800 transition-colors duration-150 ease-in-out hover:bg-neutral-700"
      >
        {children}
      </Link>
    </div>
  );
}
