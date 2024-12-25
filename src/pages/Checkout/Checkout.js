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
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/Cart.context";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/User.context";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import * as Yup from "yup"; // لإضافة التحقق من صحة الحقول
import { Helmet } from "react-helmet";
export default function Checkout() {
    var _a, _b, _c, _d, _e, _f;
    const { cartInfo } = useContext(CartContext);
    const { token } = useContext(UserContext);
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState(null);
    // التحقق من صحة حقل الموبايل والمدينة باستخدام Yup
    const validationSchema = Yup.object({
        shippingAddress: Yup.object({
            city: Yup.string()
                .min(3, "المدينة يجب أن تكون مكونة من 3 أحرف على الأقل")
                .required("المدينة مطلوبة"),
            phone: Yup.string()
                .matches(/^(010|011|012)\d{8}$/, "رقم الهاتف يجب أن يبدأ بـ 010 أو 011 أو 012 ويتكون من 11 رقمًا")
                .required("رقم الهاتف مطلوب"),
            details: Yup.string()
                .required("تفاصيل العنوان مطلوبة"),
        }),
    });
    // دالة إنشاء الطلب نقدي
    function createCashOrder(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const loadingId = toast.loading("We are creating your order ....");
            try {
                const options = {
                    url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
                    method: "POST",
                    headers: {
                        token,
                    },
                    data: values,
                };
                let { data } = yield axios.request(options);
                if (data.status === "success") {
                    toast.success("Your order has been created");
                    setTimeout(() => {
                        navigate("/allorders");
                    }, 20);
                }
            }
            catch (error) {
                toast.error(error);
            }
            finally {
                toast.dismiss(loadingId);
            }
        });
    }
    // دالة إنشاء الدفع عبر الإنترنت
    function createOnlinePayment(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const loadingId = toast.loading("We are creating your order ....");
            try {
                const options = {
                    url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
                    method: "POST",
                    headers: {
                        token,
                    },
                    data: values,
                };
                let { data } = yield axios.request(options);
                if (data.status === "success") {
                    toast.success("Wetengi ...");
                    setTimeout(() => {
                        location.href = data.session.url;
                    }, 2000);
                }
            }
            catch (error) {
                toast.error(error);
            }
            finally {
                toast.dismiss(loadingId);
            }
        });
    }
    const formik = useFormik({
        initialValues: {
            shippingAddress: {
                details: "",
                phone: "",
                city: "",
            },
        },
        validationSchema, // إضافة التحقق من صحة الحقول
        onSubmit: (values) => {
            if (paymentMethod == "cash")
                createCashOrder(values);
            else
                createOnlinePayment(values);
        },
    });
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Checkout" }) }), _jsxs("section", { children: [_jsx("h1", { className: "text-xl text-gray-600 font-semibold mb-6", children: "Shopping Address" }), _jsxs("form", { className: "space-y-3", onSubmit: formik.handleSubmit, children: [_jsxs("div", { className: "city", children: [_jsx("input", { type: "text", name: "shippingAddress.city", className: "from-control w-full pr-10", placeholder: "City", value: formik.values.shippingAddress.city, onChange: formik.handleChange, onBlur: formik.handleBlur }), ((_a = formik.touched.shippingAddress) === null || _a === void 0 ? void 0 : _a.city) && ((_b = formik.errors.shippingAddress) === null || _b === void 0 ? void 0 : _b.city) && (_jsx("div", { className: "text-red-500 text-sm", children: formik.errors.shippingAddress.city }))] }), _jsxs("div", { className: "phone", children: [_jsx("input", { type: "tel", name: "shippingAddress.phone", className: "from-control w-full pr-10", placeholder: "Phone", value: formik.values.shippingAddress.phone, onChange: formik.handleChange, onBlur: formik.handleBlur }), ((_c = formik.touched.shippingAddress) === null || _c === void 0 ? void 0 : _c.phone) && ((_d = formik.errors.shippingAddress) === null || _d === void 0 ? void 0 : _d.phone) && (_jsx("div", { className: "text-red-500 text-sm", children: formik.errors.shippingAddress.phone }))] }), _jsxs("div", { className: "details", children: [_jsx("textarea", { name: "shippingAddress.details", className: "from-control w-full pr-10", placeholder: "Details", value: formik.values.shippingAddress.details, onChange: formik.handleChange, onBlur: formik.handleBlur }), ((_e = formik.touched.shippingAddress) === null || _e === void 0 ? void 0 : _e.details) && ((_f = formik.errors.shippingAddress) === null || _f === void 0 ? void 0 : _f.details) && (_jsx("div", { className: "text-red-500 text-sm", children: formik.errors.shippingAddress.details }))] }), _jsxs("div", { className: "space-x-3", children: [_jsx("button", { onClick: () => { setPaymentMethod("cash"); }, type: "submit", className: "btn bg-blue-500 hover:bg-blue-600 text-white font-semibold", children: "Cash Order" }), _jsx("button", { onClick: () => { setPaymentMethod("online"); }, type: "submit", className: "btn bg-lime-500 hover:bg-lime-600 text-white font-semibold", children: "Online Payment" })] })] })] })] }));
}
