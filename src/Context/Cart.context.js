var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";
export const CartContext = createContext(null);
export default function CartProvider({ children }) {
    const { token } = useContext(UserContext);
    const [cartInfo, setCartInfo] = useState(null);
    // بيانات الماركات
    const [brands, setBrands] = useState([]);
    const [brandsLoading, setBrandsLoading] = useState(false);
    const [brandsError, setBrandsError] = useState(null);
    // جلب الماركات
    function fetchBrands() {
        return __awaiter(this, void 0, void 0, function* () {
            setBrandsLoading(true);
            setBrandsError(null);
            try {
                const baseUrl = "https://ecommerce.routemisr.com";
                const url = `${baseUrl}/api/v1/brands`;
                const { data } = yield axios.get(url); // استخدم الرابط النهائي
                console.log(data);
                setBrands(data.data); // Assuming the API returns brands in `data.data`
            }
            catch (error) {
                setBrandsError("خطأ في جلب الماركات.");
                console.error(error);
            }
            finally {
                setBrandsLoading(false);
            }
        });
    }
    // جلب الماركات عند التحميل
    useEffect(() => {
        fetchBrands();
    }, []);
    // الوظائف الخاصة بالسلة (كما هي)
    function addProductToCart(_a) {
        return __awaiter(this, arguments, void 0, function* ({ productId }) {
            let toastId = toast.loading("Adding Product.....");
            try {
                const options = {
                    url: "https://ecommerce.routemisr.com/api/v1/cart",
                    method: "POST",
                    headers: {
                        token,
                    },
                    data: {
                        productId,
                    },
                };
                let { data } = yield axios.request(options);
                if (data.status === "success") {
                    toast.success(data.message);
                    getCartProducts();
                }
            }
            catch (error) {
                console.log(error);
            }
            finally {
                toast.dismiss(toastId);
            }
        });
    }
    function getCartProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    url: "https://ecommerce.routemisr.com/api/v1/cart",
                    method: "GET",
                    headers: {
                        token,
                    },
                };
                let { data } = yield axios.request(options);
                console.log(data);
                setCartInfo(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    function removeProductFromCart(_a) {
        return __awaiter(this, arguments, void 0, function* ({ productId }) {
            let toastId = toast.loading("Deleting Product.....");
            try {
                const options = {
                    url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                    method: "DELETE",
                    headers: {
                        token,
                    },
                };
                let { data } = yield axios.request(options);
                if (data.status === "success") {
                    toast.success("Product has Deleted");
                    setCartInfo(data);
                }
            }
            catch (error) {
                console.log(error);
            }
            finally {
                toast.dismiss(toastId);
            }
        });
    }
    function clearCart() {
        return __awaiter(this, void 0, void 0, function* () {
            let toastId = toast.loading("Clear Cart.....");
            try {
                const options = {
                    url: "https://ecommerce.routemisr.com/api/v1/cart",
                    method: "DELETE",
                    headers: {
                        token,
                    },
                };
                let { data } = yield axios.request(options);
                if (data.message === "success") {
                    toast.success("Cart has cleared");
                    setCartInfo({
                        numOfCartItems: 0,
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
            finally {
                toast.dismiss(toastId);
            }
        });
    }
    function updateCounte(_a) {
        return __awaiter(this, arguments, void 0, function* ({ productId, count }) {
            try {
                const options = {
                    url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                    method: "PUT",
                    headers: {
                        token,
                    },
                    data: {
                        count,
                    },
                };
                let { data } = yield axios.request(options);
                if (data.status === "success") {
                    setCartInfo(data);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    return (_jsx(CartContext.Provider, { value: {
            addProductToCart,
            getCartProducts,
            removeProductFromCart,
            clearCart,
            updateCounte,
            cartInfo,
            brands, // بيانات الماركات
            brandsLoading, // حالة التحميل
            brandsError, // الأخطاء
            fetchBrands, // وظيفة جلب الماركات
        }, children: children }));
}
