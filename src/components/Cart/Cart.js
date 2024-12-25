import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { CartContext } from "../../Context/Cart.context";
import { useContext } from "react";
import { Link } from 'react-router-dom';
export default function Cart({ productInfo }) {
    const { imageCover, title, price, category, ratingsAverage, description, id } = productInfo;
    let { addProductToCart } = useContext(CartContext);
    return (_jsx("div", { children: _jsxs("div", { className: "overflow-hidden rounded-lg shadow-lg cart ", children: [_jsxs("div", { className: 'relative', children: [_jsx("img", { src: imageCover, alt: "aus" }), _jsxs("div", { className: "absolute top-0 left-0 flex items-center justify-center w-full h-full gap-2 transition-opacity duration-300 bg-black opacity-0 layer hover:opacity-100 bg-opacity-15", children: [_jsx("div", { className: "flex items-center justify-center w-10 h-10 text-sm text-white transition-transform duration-300 rounded-full cursor-pointer icon hover:rotate-6 hover:scale-110 bg-primary-900", children: _jsx("i", { className: "fa-solid fa-heart" }) }), _jsx("div", { onClick: () => {
                                        addProductToCart({ productId: id });
                                    }, className: "flex items-center justify-center w-10 h-10 text-sm text-white transition-transform duration-300 rounded-full cursor-pointer icon hover:rotate-6 hover:scale-110 bg-primary-900", children: _jsx("i", { className: "fa-solid fa-cart-shopping" }) }), _jsx(Link, { to: `/Product/${id}`, className: "flex items-center justify-center w-10 h-10 text-sm text-white transition-transform duration-300 rounded-full cursor-pointer icon hover:rotate-6 hover:scale-110 bg-primary-900", children: _jsx("i", { className: "fa-solid fa-eye" }) })] })] }), _jsxs("div", { className: "p-4 space-y-3 cart-body", children: [_jsxs("header", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-600 line-clamp-1", children: title }), _jsx("h4", { className: "text-sm font-semibold text-primary-500", children: category.name })] }), _jsxs("p", { className: "text-sm text-gray-400 line-clamp-2", children: [" ", description] }), _jsxs("div", { className: 'flex items-center justify-between', children: [_jsxs("span", { children: [price, " L.E"] }), _jsxs("div", { children: [_jsx("i", { className: "mr-1 text-yellow-500 fa-solid fa-star" }), _jsx("span", { children: ratingsAverage })] })] })] })] }) }));
}
