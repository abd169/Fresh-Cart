import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
export default function Layout() {
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx("div", { className: "container min-h-[60vh] pb-10 pt-20", children: _jsx(Outlet, {}) }), _jsx(Footer, {})] }));
}
