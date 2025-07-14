import { Outlet } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import useSearchRouting from '@/hooks/useSearchRouting';

function Layout() {
  const { inputDebounce, setInputDebounce } = useSearchRouting();

  return (
    <>
      <NavBar
        inputDebounce={inputDebounce}
        setInputDebounce={setInputDebounce}
      />
      <Outlet />
    </>
  );
}

export default Layout;
