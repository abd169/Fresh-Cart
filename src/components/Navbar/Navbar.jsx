import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import freachCartLogo from '../../assets/images/freshcart-logo.svg';
import { UserContext } from "../../Context/User.context";
import { CartContext } from '../../Context/Cart.context';

export default function Navbar() {
  const { token, logOut } = useContext(UserContext);
  const { cartInfo, getCartProducts } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-3 shadow bg-slate-100">
    {!token ? (
      <>
      <div className="flex gap-4 items-center justify-between ml-10 mr-10">
      <a href="">
      <img src={freachCartLogo} alt="freach Cart Logo" />
    </a>
    <div className=" space-x-5">
    <NavLink
          to="/Login"
          className="btn   text-sm uppercase bg-primary-800 hover:bg-primary-900 text-white font-semibold transition "
        >
          Login
        </NavLink>
        <NavLink
          to="/Signup"
          className="btn text-sm uppercase bg-primary-800 hover:bg-primary-900 text-white font-semibold transition"
        >
          Signup
        </NavLink>
    </div>
      </div>
      </>
      // روابط Login و Signup عند عدم وجود توكن
      
    ) : (
      // القائمة الكاملة عند وجود توكن
      <>
        <div className="container flex items-center justify-between">
        {/* Logo */}
        <a href="">
          <img src={freachCartLogo} alt="freach Cart Logo" />
        </a>
        <div className="lg:hidden flex items-center justify-center flex-grow">
          {token && (
            <NavLink to="/Cart" className="relative cursor-pointer cart">
              <i className="text-2xl fa-solid fa-cart-shopping"></i>
              <div className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-white translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-800">
                {cartInfo === null ? (
                  <i className="text-sm fa-solid fa-spinner fa-spin"></i>
                ) : (
                  <span className="text-sm font-semibold">{cartInfo.numOfCartItems}</span>
                )}
              </div>
            </NavLink>
          )}
        </div>
        {/* Hamburger Icon for Small Screens */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xl focus:outline-none"
          >
            {menuOpen ? (
              <i className="fa-solid fa-times"></i> // أيقونة الإغلاق
            ) : (
              <i className="fa-solid fa-bars"></i> // أيقونة الهامبرجر
            )}
          </button>
          {token && (
            <button
              onClick={logOut}
              className="text-lg text-gray-800 flex items-center gap-1"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          )}
        </div>
       
        {/* Main Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-slate-100 transition-transform transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0 lg:flex lg:items-center lg:gap-5`}
        >
          {/* Close Button inside Menu */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 text-2xl text-gray-800 lg:hidden"
          >
            <i className="fa-solid fa-times"></i>
          </button>

          {/* Navigation Links */}
          <ul className="flex flex-col ml-12 items-center justify-center text-center gap-4 p-5 border-b lg:flex-row lg:p-0 lg:border-none">
            {token && (
              <>
                <li className="w-full border-b-2 border-transparent hover:border-[#23b523] hover:border-b-2 transition-all duration-[4000ms]">
                  <NavLink
                    to="/"
                    className="text-lg w-full block py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="w-full border-b-2 border-transparent hover:border-[#23b523] hover:border-b-2 transition-all duration-[2000ms]">
                  <NavLink
                    to="/Products"
                    className="text-lg w-full block py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Products
                  </NavLink>
                </li>
                <li className="w-full border-b-2 border-transparent hover:border-[#23b523] hover:border-b-2 transition-all duration-[2000ms]">
                  <NavLink
                    to="/Categories"
                    className="text-lg w-full block py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="w-full border-b-2 border-transparent hover:border-[#23b523] hover:border-b-2 transition-all duration-[2000ms]">
                  <NavLink
                    to="/Brand"
                    className="text-lg w-full block py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Brand
                  </NavLink>
                </li>
                <li className="w-full border-b-2 border-transparent hover:border-[#23b523] hover:border-b-2 transition-all duration-[2000ms]">
                  <NavLink
                    to="/allorders"
                    className="text-lg w-full block py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Orders
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Large Screen Elements */}
          <div className="hidden lg:flex lg:items-center lg:gap-10 lg:ml-auto">
            {/* Cart Icon */}
            {token && (
              <NavLink to="/Cart" className="relative cursor-pointer cart">
              
              <i className="text-xl fa-solid fa-cart-shopping"></i>
                <div className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-white translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-800 ">
                  {cartInfo === null ? (
                    <i className="text-sm fa-solid fa-spinner fa-spin "></i>
                  ) : (
                    <span className="text-sm font-semibold">{cartInfo.numOfCartItems}</span>
                  )}
                </div>
              
              </NavLink>
            )}







            {/* Social Links */}
            <ul className="flex items-center justify-center gap-3">
              <li className="lg:hover:border-b-2 lg:hover:border-[#23b523]">
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li className="lg:hover:border-b-2 lg:hover:border-[#23b523]">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li className="lg:hover:border-b-2 lg:hover:border-[#23b523]">
                <a href="https://tiktok.com" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </li>
              <li className="lg:hover:border-b-2 lg:hover:border-[#23b523]">
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </li>
              <li className="lg:hover:border-b-2 lg:hover:border-[#23b523]">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
              <li className="lg:hover:border-b-2 lg:hover:border-[#23b523]">
                <a href="https://youtube.com" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </li>
            </ul>

            {/* Logout Button */}
            {token && (
              <button onClick={logOut} className="text-lg text-gray-800 flex items-center gap-1">
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            )}
          </div>
        </div>
      </div>
      </>
    )}
    
      
    </nav>
  );
}
