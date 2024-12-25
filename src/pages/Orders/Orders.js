var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/User.context";
import { jwtDecode } from "jwt-decode";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Orders() {
    const [orders, setOrders] = useState(null);
    const { token } = useContext(UserContext);
    let { id } = jwtDecode(token);
    function getUserOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method: "GET",
            };
            let { data } = yield axios.request(options);
            setOrders(data);
        });
    }
    useEffect(() => {
        getUserOrders();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Orders" }) }), _jsxs("div", { className: "flex items-center gap-5", children: [_jsx("i", { className: "text-3xl fa-brands fa-opencart" }), _jsx("h2", { className: "relative text-xl font-semibold text-slate-600 pl-4 before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2", children: "Your Orders" })] }), orders ? (orders.length === 0 ? ( // التحقق إذا كان عدد الطلبات صفر
            _jsxs("div", { className: "flex flex-col items-center justify-center gap-3 p-6 mt-6 bg-gray-100 rounded-md shadow", children: [_jsx("h2", { children: "Oops! Your Not Orders. Start shopping now by clicking the button below and find something you love!" }), _jsx(Link, { to: "/", className: "text-white btn bg-primary-600 hover:bg-primary-700", children: "Back to Home" })] })) : (_jsx("section", { className: "space-y-4", children: orders.map((order) => (_jsxs("div", { className: "orders p-4 border-2 border-gray-500 border-opacity-25 rounded-lg", children: [_jsxs("header", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-gray-500", children: "Order ID" }), _jsx("span", { className: "text-lg font-semibold text-gray-700", children: order.id })] }), _jsxs("div", { className: "space-x-4", children: [order.isPaid ? (_jsx("span", { className: "font-cairo mx-2 inline-block px-3 py-1 bg-lime-500 text-white rounded-full", children: "\u062A\u0645 \u0627\u0644\u062F\u0641\u0639" })) : (_jsx("span", { className: "font-cairo mx-2 inline-block px-3 py-1 bg-red-500 text-white rounded-full", children: "\u063A\u064A\u0631 \u0645\u062F\u0641\u0648\u0639" })), order.isDelivered ? (_jsx("span", { className: "font-cairo inline-block px-3 py-1 bg-lime-500 text-white rounded-full", children: "\u062A\u0645 \u0627\u0644\u062A\u0648\u0635\u064A\u0644" })) : (_jsx("span", { className: "font-cairo inline-block px-3 py-1 bg-blue-500 text-white rounded-full", children: "\u0642\u064A\u062F \u0627\u0644\u062A\u0648\u0635\u064A\u0644" }))] })] }), _jsx("div", { className: "grid mt-4 md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6", children: order.cartItems.map((product) => (_jsxs("div", { className: "product-item border-2 border-gray-400 border-opacity-30 p-4 rounded-lg", children: [_jsx("img", { className: "w-full", src: product.product.imageCover, alt: "" }), _jsx("h3", { className: "text-lg font-semibold line-clamp-2", children: _jsx(Link, { to: `/product/${product.product.id}`, children: product.product.title }) }), _jsxs("div", { className: "flex justify-between items-center mt-2", children: [_jsxs("p", { className: "mx-1 font-bold text-slate-800", children: [_jsx("span", { className: "font-bold underline mx-1", children: "Count:" }), product.count] }), _jsxs("span", { className: "mx-1 font-bold text-primary-800", children: [product.price, " L.E"] })] })] }, product._id))) }), _jsxs("p", { className: "text-lg mt-4", children: ["Your Total Order Price", " ", _jsx("span", { className: "mx-1 font-bold text-primary-800", children: order.totalOrderPrice }), "L.E"] })] }, order.id))) }))) : (_jsx(Loading, {}))] }));
}
