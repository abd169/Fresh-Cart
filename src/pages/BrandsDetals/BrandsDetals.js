var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";
import Loading from "../../components/Loading/Loading";
import Cart from "../../components/Cart/Cart";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Helmet } from "react-helmet";
export default function BrandDetails() {
    const [brandDetails, setBrandDetails] = useState(null);
    const [brandProducts, setBrandProducts] = useState([]);
    const { id } = useParams(); // الحصول على الـ id من الرابط
    const { addProductToCart } = useContext(CartContext);
    function getBrandDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
                    method: "GET"
                };
                let { data } = yield axios.request(options);
                setBrandDetails(data.data);
                console.log(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    function getBrandProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    url: `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,
                    method: "GET"
                };
                let { data } = yield axios.request(options);
                setBrandProducts(data.data);
                console.log(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    useEffect(() => {
        getBrandDetails();
        getBrandProducts();
    }, [id]);
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "BrandDetails" }) }), _jsx("div", { className: "container mx-auto my-8 space-x-8 bg-inherit", children: brandDetails ? (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: brandDetails.name }) }), _jsx("img", { src: brandDetails.image, alt: brandDetails.name, className: "h-40 mx-auto mb-20 mt-10 " }), _jsx("h2", { className: "text-xl font-semibold mb-8 text-center bg-primary-900 text-white", children: "BrandProducts" }), brandProducts.length > 0 ? (_jsx(Swiper, { loop: true, pagination: { clickable: true }, spaceBetween: 15, breakpoints: {
                                340: { slidesPerView: 1 },
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 4 },
                                1024: { slidesPerView: 6 },
                            }, children: brandProducts.map((product) => (_jsx(SwiperSlide, { children: _jsx(Cart, { productInfo: product }) }, product._id))) })) : (_jsx("p", { children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0646\u062A\u062C\u0627\u062A \u0644\u0647\u0630\u0647 \u0627\u0644\u0645\u0627\u0631\u0643\u0629." }))] })) : (_jsx(Loading, {})) })] }));
}
