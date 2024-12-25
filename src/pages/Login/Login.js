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
import { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/User.context";
import { Helmet } from "react-helmet";
export default function Login() {
    let { setToken } = useContext(UserContext);
    const navigate = useNavigate();
    const [passwordandEmailErro, setpasswordandEmailErro] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const passwordRijex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    const validationSchema = object({
        email: string().required('Email is Required').email("Email is invalid"),
        password: string().required("Password is required")
            .matches(passwordRijex, "Minimum eight characters, at least one uppercase English letter, one lowercase English letter, one number and one special character"),
    });
    function sendDataLogin(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const loadingId = toast.loading("Witing ...");
            try {
                const options = {
                    url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
                    method: "POST",
                    data: values,
                };
                let { data } = yield axios.request(options);
                console.log(data);
                if (data.message === "success") {
                    localStorage.setItem("token", data.token);
                    setToken(data.token);
                    toast.success("Welcame User");
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                }
            }
            catch (error) {
                toast.error(error.response.message);
                setpasswordandEmailErro(error.response.message);
            }
            finally {
                toast.dismiss(loadingId);
            }
        });
    }
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: sendDataLogin
    });
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Login" }) }), _jsxs("h1", { className: "text-xl text-slate-700 font-semibold mb-5", children: [_jsx("i", { className: "fa-regular fa-circle-user mr-2" }), "Register Now"] }), _jsxs("form", { className: "space-y-3", onSubmit: formik.handleSubmit, children: [_jsxs("div", { className: "email", children: [_jsx("input", { className: "from-control w-full", type: "email", placeholder: "Add Email Address", value: formik.values.email, onChange: formik.handleChange, onBlur: formik.handleBlur, name: "email" }), formik.errors.email && formik.touched.email && (_jsxs("p", { className: "text-red-500 mt-1 text-sm", children: ["*", formik.errors.email] })), passwordandEmailErro && (_jsxs("p", { className: "text-red-500 mt-1 text-sm", children: ["*", passwordandEmailErro] }))] }), _jsxs("div", { className: "password", children: [_jsxs("div", { className: "relative w-full", children: [_jsx("input", { className: "from-control w-full pr-10", type: showPassword ? "text" : "password", placeholder: "Add Password", value: formik.values.password, onChange: formik.handleChange, onBlur: formik.handleBlur, name: "password" }), _jsx("i", { className: `fa ${showPassword ? "fa-eye" : "fa-eye-slash"} absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`, onClick: () => setShowPassword(!showPassword) })] }), formik.errors.password && formik.touched.password && (_jsxs("p", { className: "text-red-500 mt-1 text-sm", children: ["*", formik.errors.password] }))] }), _jsx("button", { type: "submit", className: "btn w-full text-sm uppercase bg-primary-700 hover:bg-primary-900 text-white font-semibold", children: "Login" })] })] }));
}
