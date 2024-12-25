import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/Cart.context";
import Loading from "../../components/Loading/Loading";
import Cartitem from "../../components/Cartitem/Cartitem";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Cart() {
    let { getCartProducts, cartInfo, clearCart } = useContext(CartContext);
    useEffect(() => {
        getCartProducts();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Cart" }) }), cartInfo === null ? (_jsx(Loading, {})) : (_jsxs("section", { children: [_jsxs("div", { className: "flex items-center gap-5", children: [_jsx("i", { className: "text-3xl fa-brands fa-opencart" }), _jsx("h2", { className: "relative text-xl font-semibold text-slate-600 pl-4 before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2", children: "Your Shopping Cart" })] }), cartInfo.numOfCartItems === 0 ? _jsxs("div", { className: "flex flex-col items-center justify-center gap-3 p-6 mt-6 bg-gray-100 rounded-md shadow", children: [_jsx("h2", { children: "Oops! Yourcart is empty. Start shopping now by clicking the button below and find something you love!" }), _jsx(Link, { to: "/", className: "text-white btn bg-primary-600 hover:bg-primary-700", children: "Back to Home" })] }) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "mt-8 space-y-4", children: cartInfo.data.products.map((product) => _jsx(Cartitem, { productInfo: product }, product._id)) }), _jsxs("div", { className: "flex items-center justify-between mt-5", children: [_jsxs("p", { className: "text-xl", children: [_jsx("i", { className: "mr-2 text-xl fa-solid fa-dollar-sign text-primary-600" }), " Your Total Cart Price ", _jsx("span", { className: "font-bold text-primary-600", children: cartInfo.data.totalCartPrice }), " "] }), _jsxs("bitton", { onClick: clearCart, className: 'text-white bg-red-500 cursor-pointer btn hover:bg-red-600', children: [_jsx("i", { className: "mr-2 cursor-pointer fa-solid fa-trash" }), "Clear Cart"] })] }), _jsx(Link, { to: "/checkout", className: "btn bg-primary-500 hover:bg-primary-600 text-white inline-block w-full text-center mt-8", children: "Next Step (Payment)" })] }))] }))] }));
}
