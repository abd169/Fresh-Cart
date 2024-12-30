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

const router = createBrowserRouter(
  [
    {
      //  basename: "/freachCart-/",
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "product/:id", element: <ProductDetals /> },
        { path: "products", element: <ProductCart /> },
        { path: "checkout", element: <Checkout /> },
        { path: "allorders", element: <Orders /> },
        { path: "Categories", element: <Categrys /> },
        { path: "Brand", element: <Brands /> },
        { path: "Brand/:id", element: <BrandDetails /> },
      ],
    },
    {
      // basename: "/freachCart-/",
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: "Signup", element: <Signup /> },
        { path: "Login", element: <Login /> },
      ],
    },
  ],
  
);

function NotFound() {
  return (
    <div>
      <h1>404 - الصفحة غير موجودة</h1>
      <p>عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.</p>
    </div>
  );
}

function App() {
  const myClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={myClient}>
        <UseProvider>
          <CartProvider>
            <RouterProvider router={router} />
            <Toaster position='top-right' />
            <ReactQueryDevtools initialIsOpen={false} />
          </CartProvider>
        </UseProvider>
      </QueryClientProvider>
      <Offline>
        <div className='fixed z-50 p-4 font-semibold bg-gray-200 rounded-lg shadow right-8 bottom-8 text-gary-600'>
          <i className="mr-2 fa-solid fa-wifi"></i>
          <span>Check Your Internet Connection</span>
        </div>
      </Offline>
    </>
  );
}

export default App;
