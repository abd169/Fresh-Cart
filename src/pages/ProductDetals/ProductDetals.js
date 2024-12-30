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
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Cart from "../../components/Cart/Cart";
import useOline from "../../hooks/useOnline";
import { Helmet } from "react-helmet";
export default function ProductDetails() {
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);
    const [error, setError] = useState(null); // لمعالجة الأخطاء
    const { id } = useParams();
    const { addProductToCart } = useContext(CartContext);
    function getProductDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
                    method: "GET",
                };
                const { data } = yield axios.request(options);
                setProductDetails(data.data);
            }
            catch (error) {
                setError("Failed to load product details. Please try again later.");
                console.error(error);
            }
        });
    }
    function getRelatedProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!((_a = productDetails === null || productDetails === void 0 ? void 0 : productDetails.category) === null || _a === void 0 ? void 0 : _a._id))
                return; // التأكد من وجود `category`
            try {
                const options = {
                    url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
                    method: "GET",
                };
                const { data } = yield axios.request(options);
                setRelatedProducts(data.data);
            }
            catch (error) {
                setError("Failed to load related products. Please try again later.");
                console.error(error);
            }
        });
    }
    useEffect(() => {
        getProductDetails();
    }, [id]);
    useEffect(() => {
        if (productDetails) {
            getRelatedProducts();
        }
    }, [productDetails]);
    if (error) {
        return _jsx("div", { className: "text-red-500", children: error }); // عرض رسالة الخطأ
    }
    let isOnline = useOline();
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "ProductDetails" }) }), productDetails ? (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: productDetails.title }) }), _jsxs("section", { className: "grid grid-cols-1 md:grid-cols-12 gap-6 w-full", children: [_jsx("div", { className: "col-span-5", children: _jsx(ReactImageGallery, { showPlayButton: false, items: productDetails.images.map((image) => ({
                                        original: image,
                                        thumbnail: image,
                                    })) }) }), _jsxs("div", { className: "col-span-7 mr-5 ml-5 space-y-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-600", children: productDetails.title }), _jsx("h3", { className: "font-semibold text-primary-600", children: productDetails.category.name })] }), _jsx("p", { className: "text-gray-400", children: productDetails.description }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-xl font-semibold text-primary-800", children: [productDetails.price, " L.E"] }), _jsxs("div", { className: "flex items-center", children: [_jsx("i", { className: "mr-2 text-yellow-500 fa-solid fa-star" }), _jsx("span", { children: productDetails.ratingsAverage })] })] }), isOnline && (_jsx("button", { onClick: () => addProductToCart({ productId: id }), className: "w-full font-semibold text-white btn bg-primary-500 hover:bg-primary-600", children: "Add To Cart" }))] })] }), _jsxs("section", { className: "mt-12", children: [_jsx("h2", { className: "mb-6 text-2xl text-gray-800 text-center", children: "Related Products" }), relatedProducts ? (_jsx(Swiper, { spaceBetween: 15, loop: true, breakpoints: {
                                    340: { slidesPerView: 1 },
                                    640: { slidesPerView: 2 },
                                    768: { slidesPerView: 4 },
                                    1024: { slidesPerView: 6 },
                                }, children: relatedProducts.map((product) => (_jsx(SwiperSlide, { children: _jsx(Cart, { productInfo: product }) }, product._id))) })) : (_jsx(Loading, {}))] })] })) : (_jsx(Loading, {}))] }));
}
