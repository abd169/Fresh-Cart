import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Layout from './components/Layout/Layout';
import { Toaster } from 'react-hot-toast';
import Categrys from './pages/Category/Categrys';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import GuestRoute from './components/GuestRoute/GuestRoute';
import UseProvider from './Context/User.context';
import CartProvider from './Context/Cart.context';
import Cart from './pages/Cart/Cart';
import ProductDetals from './pages/ProductDetals/ProductDetals';
import Checkout from './pages/Checkout/Checkout';
import ProductCart from './components/productCart/ProductCart';
import Orders from './pages/Orders/Orders';
import Brands from './pages/Brandes/Brandes';
import BrandDetails from './pages/BrandsDetals/BrandsDetals';
import Online from './components/Online/Online';
import Offline from './components/Offline/Offline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const router = createBrowserRouter([
    {
        path: "/",
        element: (_jsx(ProtectedRoute, { children: _jsx(Layout, {}) })),
        children: [
            { index: true, element: _jsx(Home, {}) },
            { path: "cart", element: _jsx(Cart, {}) },
            { path: "product/:id", element: _jsx(ProductDetals, {}) },
            { path: "products", element: _jsx(ProductCart, {}) },
            { path: "checkout", element: _jsx(Checkout, {}) },
            { path: "allorders", element: _jsx(Orders, {}) },
            { path: "Categories", element: _jsx(Categrys, {}) },
            { path: "Brand", element: _jsx(Brands, {}) },
            { path: "Brand/:id", element: _jsx(BrandDetails, {}) },
        ],
    },
    {
        path: "/",
        element: (_jsx(GuestRoute, { children: _jsx(Layout, {}) })),
        children: [
            { path: "Signup", element: _jsx(Signup, {}) },
            { path: "Login", element: _jsx(Login, {}) },
        ],
    },
]);
function App() {
    const myClient = new QueryClient();
    return (_jsxs(_Fragment, { children: [_jsx(QueryClientProvider, { client: myClient, children: _jsx(UseProvider, { children: _jsxs(CartProvider, { children: [_jsx(RouterProvider, { router: router }), _jsx(Toaster, { position: 'top-right' }), _jsx(ReactQueryDevtools, { initialIsOpen: false })] }) }) }), _jsx(Offline, { children: _jsxs("div", { className: 'p-4 fixed right-8 bottom-8 z-50 rounded-lg shadow bg-gray-200 text-gary-600 font-semibold', children: [_jsx("i", { className: "fa-solid fa-wifi mr-2" }), _jsx("span", { children: "Check Your Internet Connection" })] }) })] }));
}
export default App;
