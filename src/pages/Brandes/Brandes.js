import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import Loading from "../../components/Loading/Loading";
import { CartContext } from "../../Context/Cart.context";
import { Helmet } from "react-helmet";
export default function BrandsPage() {
    const { brands, loading, error } = useContext(CartContext);
    const [searchTerm, setSearchTerm] = useState("");
    // فلترة الماركات بناءً على البحث
    const filteredBrands = brands.filter((brand) => brand.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (loading)
        return _jsx(Loading, {});
    if (error)
        return _jsx("p", { className: "text-red-500", children: error });
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Brandes" }) }), _jsxs("div", { className: "container bg-slate-100 mx-auto my-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "\u062A\u0635\u0641\u062D \u0627\u0644\u0645\u0627\u0631\u0643\u0627\u062A" }), _jsx("input", { type: "text", placeholder: "\u0627\u0628\u062D\u062B \u0639\u0646 \u0645\u0627\u0631\u0643\u0629...", className: "border  p-2 mb-4 w-full from-control", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), _jsx("div", { className: "grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-8 w-full", children: filteredBrands.map((brand) => (_jsxs("div", { className: "border p-4 text-center", children: [_jsx(Link, { to: `/Brand/${brand._id}`, children: _jsx("img", { src: brand.image, alt: brand.brand_name, className: "h-20 mx-auto mb-2" }) }), _jsx("h3", { className: "text-lg font-semibold", children: brand.name }), _jsx("h2", { children: brand.slug })] }, brand.id))) })] })] }));
}
