import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import sliderImage1 from "../../assets/images/slider-image-1.jpeg";
import sliderImage2 from "../../assets/images/slider-image-2.jpeg";
import sliderImage3 from "../../assets/images/slider-image-3.jpeg";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
export default function Homeslider() {
    return (_jsxs("section", { className: 'grid grid-cols-12 mb-8', children: [_jsx("div", { className: "col-span-8", children: _jsxs(Swiper, { slidesPerView: 1, loop: true, children: [_jsx(SwiperSlide, { children: _jsx("img", { className: 'w-full h-full object-cover', src: sliderImage3, alt: "" }) }), _jsx(SwiperSlide, { children: _jsx("img", { className: 'w-full h-full object-cover', src: sliderImage3, alt: "" }) }), _jsx(SwiperSlide, { children: _jsx("img", { className: 'w-full h-full object-cover', src: sliderImage3, alt: "" }) })] }) }), _jsxs("div", { className: "col-span-4", children: [_jsx("img", { className: "w-full object-cover", src: sliderImage1, alt: "" }), _jsx("img", { className: "w-full   overflow-hidden", src: sliderImage2, alt: "" })] })] }));
}
