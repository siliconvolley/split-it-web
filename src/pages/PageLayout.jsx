export default function PageLayout({ children }) {
  return (
    <div className="h-svh max-w-[40rem] flex flex-col justify-start mx-auto px-3">
      {children}
    </div>
  );
}
