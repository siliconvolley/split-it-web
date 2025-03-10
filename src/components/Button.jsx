import { Link } from 'react-router-dom';

export default function Button({ path, className, type, children }) {
  return (
    <Link
      to={path}
      className={`w-[15rem] py-3 px-4 rounded-lg font-bold text-center text-white transition-colors duration-150 ease-in-out hover:bg-neutral-700 
        ${className} 
        ${type === 'coming-soon' ? 'coming-soon-banner bg-neutral-600' : 'bg-neutral-800'}`}
    >
      {children}
    </Link>
  );
}
