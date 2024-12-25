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
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { Link } from 'react-router-dom';
import { CartContext } from "../../Context/Cart.context";
import { useContext } from "react";
import { Helmet } from "react-helmet";
export default function ProductCart() {
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    let { addProductToCart } = useContext(CartContext);
    // جلب البيانات من الـ API
    function getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    url: "https://ecommerce.routemisr.com/api/v1/products",
                    method: "GET",
                };
                const { data } = yield axios.request(options);
                setProducts(data.data);
            }
            catch (error) {
                console.error("Error fetching products:", error);
            }
            finally {
                setIsLoading(false);
            }
        });
    }
    useEffect(() => {
        getProducts();
    }, []);
    // التحقق من تحميل البيانات
    if (isLoading)
        return _jsx(Loading, {});
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Products" }) }), _jsx("div", { className: "container mx-auto my-6", children: _jsx("div", { className: "grid grid-cols-12 gap-4", children: products &&
                        products.map((product) => {
                            const { id, images, title, price, category, ratingsAverage } = product;
                            return (_jsx("div", { className: "col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2", children: _jsxs("div", { className: "overflow-hidden shadow-lg", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: (images === null || images === void 0 ? void 0 : images[0]) || "default-image.jpg", className: "w-full", alt: title || "Product" }), _jsxs("div", { className: "absolute top-0 left-0 flex items-center justify-center w-full h-full gap-2 transition-opacity duration-300 bg-black opacity-0 layer hover:opacity-100 bg-opacity-15", children: [_jsx("div", { className: "flex items-center justify-center w-10 h-10 text-sm text-white transition-transform duration-300 rounded-full cursor-pointer icon hover:rotate-6 hover:scale-110 bg-primary-900", children: _jsx("i", { className: "fa-solid fa-heart" }) }), _jsx("div", { onClick: () => {
                                                                addProductToCart({ productId: id });
                                                            }, className: "flex items-center justify-center w-10 h-10 text-sm text-white transition-transform duration-300 rounded-full cursor-pointer icon hover:rotate-6 hover:scale-110 bg-primary-900", children: _jsx("i", { className: "fa-solid fa-cart-shopping" }) }), _jsx("div", { className: "flex items-center justify-center w-10 h-10 text-sm text-white transition-transform duration-300 rounded-full cursor-pointer icon hover:rotate-6 hover:scale-110 bg-primary-900", children: _jsx(Link, { to: `/Product/${id}`, className: "flex items-center justify-center w-10 h-10 text-sm text-white transition-transform duration-300 rounded-full cursor-pointer icon hover:rotate-6 hover:scale-110 bg-primary-900", children: _jsx("i", { className: "fa-solid fa-eye" }) }) })] })] }), _jsxs("div", { className: "p-3", children: [_jsx("h3", { className: "text-primary-800", children: (category === null || category === void 0 ? void 0 : category.name) || "Category" }), _jsx("h2", { className: "text-lg font-semibold line-clamp-2", children: title || "Product Title" }), _jsxs("div", { className: "flex items-center justify-between mt-3", children: [_jsx("span", { children: price ? `${price} L.E` : "N/A" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("i", { className: "text-yellow-500 fa-solid fa-star" }), _jsx("span", { children: ratingsAverage || "0.0" })] })] })] })] }) }, id));
                        }) }) })] }));
}
