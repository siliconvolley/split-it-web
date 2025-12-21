import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDisplayShares } from '@/hooks/useDisplayShares';
import { Download } from 'lucide-react';

export default function SharesNavbar({ path, title, onClick }) {
const { downloadBill } = useDisplayShares();

  return (
    <nav className="flex items-center my-8 relative">
      <Link to={path} className="absolute left-0" onClick={onClick?.()}>
        <ChevronLeft color="#262626" size="32" />
      </Link>
      <span className="flex-grow text-2xl font-bold text-center">{title}</span>
      <button 
        onClick={downloadBill}
        className="absolute right-0 p-2"
        aria-label="Share bill"
      >
        <Download size="24" strokeWidth="2.25"/>
      </button>
    </nav>
  );
}
