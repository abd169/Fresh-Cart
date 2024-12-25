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
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
export default function Categryslider() {
    function getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/categories",
                method: "GET",
            };
            return axios.request(options);
        });
    }
    let { data, isLoading, isError, isFetched, isFetching } = useQuery({
        queryKey: [
            "Categryslide"
        ],
        queryFn: getCategories,
        refetchOnMount: false,
        staleTime: 60 * 60 * 1000,
    });
    if (isLoading)
        return _jsx(Loading, {});
    return (_jsx(_Fragment, { children: _jsxs("section", { className: "my-8   hidden lg:block", children: [_jsx("h2", { className: "mb-5 text-lg text-gray-600 font-semibold ", children: "Shop Popular Categories" }), _jsx(Swiper, { slidesPerView: 6, loop: true, children: data.data.data.map((category) => _jsxs(SwiperSlide, { children: [_jsx("div", { className: "h-64", children: _jsx("img", { className: "w-full h-full object-cover", src: category.image, alt: "" }) }), _jsx("h3", { className: "mt-2", children: category.name })] }, category.id)) })] }) }));
}
