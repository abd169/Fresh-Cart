import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useContext } from 'react';
import { CartContext } from '../../Context/Cart.context';
import { Link } from 'react-router-dom';
export default function Cartitem({ productInfo }) {
    const { price, count, product } = productInfo;
    const { title, imageCover, category, id } = product;
    let { removeProductFromCart, updateCounte } = useContext(CartContext);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: 'flex gap-2', children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-3 bg-gray-100 rounded-lg grow", children: [_jsx("img", { className: 'object-cover w-24 h-24 border-4 border-white rounded-full', src: imageCover, alt: title }), _jsx("h3", { className: 'text-lg font-semibold text-gray-700', children: _jsx(Link, { to: `/product/${id}`, children: title }) }), _jsx("h4", { className: 'text-lg font-semibold text-gray-700', children: category.name }), _jsxs("div", { className: "flex items-center gap-5 count", children: [_jsx("span", { className: 'text-lg font-bold text-gray-600', children: count }), _jsxs("div", { className: "space-y-2 icons", children: [_jsx("div", { className: "flex items-center justify-center w-6 h-6 text-white bg-gray-700 rounded-full cursor-pointer", onClick: () => {
                                                updateCounte({ productId: id, count: count + 1 });
                                            }, children: _jsx("i", { className: "fa-solid fa-plus" }) }), _jsx("div", { className: "flex items-center justify-center w-6 h-6 text-white bg-gray-700 rounded-full cursor-pointer minus ", onClick: () => {
                                                updateCounte({ productId: id, count: count - 1 });
                                            }, children: _jsx("i", { className: "fa-solid fa-minus" }) })] })] }), _jsxs("span", { children: [price, " L.E"] })] }), _jsx("button", { onClick: () => {
                        removeProductFromCart({ productId: id });
                    }, className: 'p-3 transition-colors duration-300 bg-gray-100 rounded-md hover:bg-gray-200', children: _jsx("i", { className: "fa-solid fa-xmark" }) })] }) }));
}
