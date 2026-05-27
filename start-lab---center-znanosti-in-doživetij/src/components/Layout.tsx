import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import TechBackground from './TechBackground';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <TechBackground />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
