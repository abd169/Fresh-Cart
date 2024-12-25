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
import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Login from '../Login/Login';
import { Helmet } from "react-helmet";
export default function Signup() {
    const navigate = useNavigate();
    const [accountExistErro, setAccountExistErro] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const passwordRijex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    const phoneRijex = /^01[0125][0-9]{8}$/;
    const validationSchema = object({
        name: string().required("Name is Required").min(3, "Name must be at least 3 characters").max(25, "Name can not be more than 25 characters"),
        email: string().required('Email is Required').email("Email is invalid"),
        password: string().required("Password is required")
            .matches(passwordRijex, "Minimum eight characters, at least one uppercase English letter, one lowercase English letter, one number and one special character"),
        rePassword: string().required("Confirm password is required")
            .oneOf([ref("password")], "Confirm password should be the same password"),
        phone: string().required("Phone is required")
            .matches(phoneRijex, "Sorry, We Accept Egyptian Phone Numbers Only")
    });
    function sendDataToRegister(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const loadingId = toast.loading("Witing ...");
            try {
                const options = {
                    url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
                    method: "POST",
                    data: values,
                };
                let { data } = yield axios(options);
                if (data.message === "success") {
                    setTimeout(() => {
                        navigate("/Login");
                    }, 200);
                    toast.dismiss(loadingId);
                    toast.success("User create successfully");
                }
            }
            catch (error) {
                toast.error(error.response.data.message);
                setAccountExistErro(error.response.data.message);
            }
            finally {
                toast.dismiss(loadingId);
            }
        });
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        validationSchema,
        onSubmit: sendDataToRegister
    });
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Sign up" }) }), _jsxs("h1", { className: "text-xl text-slate-700 font-semibold mb-5", children: [_jsx("i", { className: "fa-regular fa-circle-user mr-2" }), "Register Now"] }), _jsxs("form", { className: "space-y-3", onSubmit: formik.handleSubmit, children: [_jsxs("div", { className: "name", children: [_jsx("input", { className: "from-control w-full", type: "text", placeholder: "Type your name", value: formik.values.name, onChange: formik.handleChange, onBlur: formik.handleBlur, name: "name" }), formik.errors.name && formik.touched.name && (_jsxs("p", { className: "text-red-500 mt-1 text-sm", children: ["*", formik.errors.name] }))] }), _jsxs("div", { className: "email", children: [_jsx("input", { className: "from-control w-full", type: "email", placeholder: "Add Email Address", value: formik.values.email, onChange: formik.handleChange, onBlur: formik.handleBlur, name: "email" }), formik.errors.email && formik.touched.email && (_jsxs("p", { className: "text-red-500 mt-1 text-sm", children: ["*", formik.errors.email] })), accountExistErro && (_jsxs("p", { className: "text-red-500 mt-1 text-sm", children: ["*", accountExistErro] }))] }), _jsxs("div", { className: "password", children: [_jsxs("div", { className: "relative w-full", children: [_jsx("input", { className: "from-control w-full pr-10", type: showPassword ? "text" : "password", placeholder: "Add Password", value: formik.values.password, onChange: formik.handleChange, onBlur: formik.handleBlur, name: "password" }), _jsx("i", { className: `fa ${showPassword ? "fa-eye" : "fa-eye-slash"} absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`, onClick: () => setShowPassword(!showPassword) })] }), formik.errors.password && formik.touched.password && (_jsxs("p", { className: "text-red-500 mt-1 text-sm", children: ["*", formik.errors.password] }))] }), _jsxs("div", { className: "rePassword", children: [_jsx("input", { className: "from-control w-full", type: showPassword ? "text" : "password", placeholder: "Add RePassword", value: formik.values.rePassword, onChange: formik.handleChange, onBlur: formik.handleBlur, name: "rePassword" }), formik.errors.rePassword && formik.touched.rePassword && (_jsxs("p", { className: "text-red-500 mt-1 text-sm", children: ["*", formik.errors.rePassword] }))] }), _jsxs("div", { className: "phone", children: [_jsx("input", { className: "from-control w-full", type: "text", placeholder: "Phone Number", value: formik.values.phone, onChange: formik.handleChange, onBlur: formik.handleBlur, name: "phone" }), formik.errors.phone && formik.touched.phone && (_jsxs("p", { className: "text-red-500 mt-1 text-sm", children: ["*", formik.errors.phone] }))] }), _jsx("button", { type: "submit", className: "btn w-full text-sm uppercase bg-primary-700 hover:bg-primary-900 text-white font-semibold", children: "Sign Up" })] })] }));
}
