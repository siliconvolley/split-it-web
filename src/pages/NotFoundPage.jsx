import Button from '@/components/Button';

export default function NotFoundPage() {
  return (
    <div className="relative h-svh max-w-[40rem] flex flex-col justify-start mx-auto px-5">
      <img
        src="/src/public/disappointed_bean.gif"
        alt="Disappointed Bean"
        className="absolute -z-10 opacity-30 min-h-screen object-cover bg-no-repeat left-0 right-0"
      />
      <main className="grid gap-4 mt-24 mb-16 text-center">
        <h1 className="text-4xl">404 Not Found ❌</h1>
        <p className="text-xl">
          Uh-oh! Looks like this page didn't pay its share 🙃
          <br /> Let's split and get back home!
        </p>
      </main>
      <Button path="/">Back to Home!</Button>
    </div>
  );
}
