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
  const buttonClasses = `py-3 px-4 rounded-lg font-bold text-center transition-colors duration-150 ease-in-out 
    ${className} 
    ${getButtonType(type)}
    ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
  `;

  return disabled ? (
    <div className={buttonClasses}>{children}</div>
  ) : (
    <Link to={path} className={buttonClasses} onClick={onClick}>
      {children}
    </Link>
  );
}
