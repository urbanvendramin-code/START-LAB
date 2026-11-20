import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import TechBackground from './TechBackground';

export default function Layout() {
  const { pathname } = useLocation();
  const isPatentsPage = pathname.startsWith('/patenti');

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {!isPatentsPage && <TechBackground />}
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
