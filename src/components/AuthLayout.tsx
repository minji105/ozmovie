import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative h-full min-h-screen w-full overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden bg-black bg-cover bg-center brightness-50 sm:bg-auth" />
      <Link to="/">
        <div className="responsive-spacing absolute z-20 py-5 text-xl font-bold text-red-primary sm:text-2xl">
          <h1>OZMOVIE</h1>
        </div>
      </Link>

      {children}
    </div>
  );
}

export default AuthLayout;
