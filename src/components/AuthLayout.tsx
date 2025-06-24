import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative h-full min-h-screen w-full overflow-x-hidden">
      <div className="sm:bg-auth absolute inset-0 overflow-hidden bg-black bg-cover bg-center brightness-50" />
      <Link to="/">
        <div className="text-red-primary absolute z-20 px-[5vw] py-5 text-[calc(1vw+16px)] font-bold">
          <h1>OZMOVIE</h1>
        </div>
      </Link>

      {children}
    </div>
  );
}

export default AuthLayout;
