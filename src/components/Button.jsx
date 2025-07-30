import { Link } from 'react-router-dom';

const getButtonType = type => {
  switch (type) {
    case 'coming-soon':
      return 'coming-soon-banner bg-neutral-600 text-white hover:bg-neutral-700';
    case 'secondary':
      return 'inner-border bg-neutral-150 text-neutral-800 hover:bg-neutral-300';
    default:
      return 'bg-neutral-800 text-white hover:bg-neutral-700';
  }
};

export default function Button({
  path,
  className,
  type,
  children,
  onClick,
  disabled,
}) {
  const handleDragStart = e => {
    e.preventDefault();
  };

  return (
    <Link
      to={path}
      draggable="false"
      onDragStart={handleDragStart}
      className={`grid place-items-center py-3 px-4 rounded-lg font-bold select-none
        transition-all duration-150 ease-in-out
        active:scale-95 active:duration-25
        ${disabled ? 'pointer-events-none opacity-50' : ''}
        ${className} 
        ${getButtonType(type)}
      `}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
