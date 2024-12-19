import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';

export default function Layout() {
  return (
    <>
    <Navbar/>
    <div className="container min-h-[60vh] pb-10 pt-20">
      <Outlet></Outlet>
    </div>
    
    <Footer/>
    </>
  )
}
