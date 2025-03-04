import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ path, title, onClick }) {
  return (
    <nav className="flex items-center my-8 relative">
      <Link to={path} className="absolute" onClick={onClick?.()}>
        <ChevronLeft color="#262626" size="32" />
      </Link>
      <span className="flex-grow text-2xl font-bold text-center">{title}</span>
    </nav>
  );
}
