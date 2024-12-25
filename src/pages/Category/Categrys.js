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
import axios from "axios";
import { useEffect, useState } from "react";
// Import Swiper React components
;
// Import Swiper styles
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";
export default function Categrys() {
    const [categories, setCategories] = useState(null);
    function getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    url: "https://ecommerce.routemisr.com/api/v1/categories",
                    method: "GET",
                };
                const { data } = yield axios.request(options);
                console.log(data);
                setCategories(data.data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    useEffect(() => {
        getCategories();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Categories" }) }), _jsxs("section", { className: "my-8 hidden lg:block", children: [_jsx("h2", { className: "mb-5 text-lg text-gray-600 font-semibold", children: "Shop Popular Categories" }), !categories ? (_jsx(Loading, {})) : (categories.length > 0 ? (_jsx("div", { className: "grid grid-cols-4 gap-4", children: categories.map((category) => (_jsxs("div", { className: "category-item", children: [_jsx("div", { className: "h-64", children: _jsx("img", { className: "w-full h-full object-cover", src: category.image, alt: category.name }) }), _jsx("h3", { className: "mt-2 text-center", children: category.name })] }, category.id))) })) : (_jsx("p", { className: "text-center text-gray-500", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u0626\u0627\u062A \u0645\u062A\u0627\u062D\u0629 \u062D\u0627\u0644\u064A\u064B\u0627." })))] })] }));
}
