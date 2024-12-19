import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Login from '../Login/Login';
import { Helmet } from "react-helmet";
export default function Signup() {
  const navigate = useNavigate()
  const [accountExistErro,setAccountExistErro] = useState()

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

  async function sendDataToRegister(values) {
    const loadingId = toast.loading("Witing ...")
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      let { data } = await axios(options);
      if(data.message === "success"){
        setTimeout(()=>{
          navigate("/Login")
        }, 200)
        toast.dismiss(loadingId);
        toast.success("User create successfully");
      }
    } catch (error) {
      toast.error(error.response.data.message)
      setAccountExistErro(error.response.data.message)
    }
    finally{
      toast.dismiss(loadingId);
    }
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

  return (
    <>
    <Helmet>
      <title>Sign up</title>
    </Helmet>
      <h1 className="text-xl text-slate-700 font-semibold mb-5"><i className="fa-regular fa-circle-user mr-2"></i>Register Now</h1>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
       
        <div className="name">
          <input
            className="from-control w-full"
            type="text"
            placeholder="Type your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
          />
          {formik.errors.name && formik.touched.name && (<p className="text-red-500 mt-1 text-sm">*{formik.errors.name}</p>)}
        </div>

        
        <div className="email">
          <input
            className="from-control w-full"
            type="email"
            placeholder="Add Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />
          {formik.errors.email && formik.touched.email && (<p className="text-red-500 mt-1 text-sm">*{formik.errors.email}</p>)}
          {accountExistErro && (<p className="text-red-500 mt-1 text-sm">*{accountExistErro}</p>)}
        </div>

        
        <div className="password">
        <div className="relative w-full">
  <input
    className="from-control w-full pr-10"
    type={showPassword ? "text" : "password"} 
    placeholder="Add Password"
    value={formik.values.password}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    name="password"
  />
  <i 
    className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"} absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`}
    onClick={() => setShowPassword(!showPassword)}
  ></i>
</div>

         
          {formik.errors.password && formik.touched.password && (<p className="text-red-500 mt-1 text-sm">*{formik.errors.password}</p>)}
        </div>

       
        <div className="rePassword">
          <input
            className="from-control w-full"
            type={showPassword ? "text" : "password"}  
            placeholder="Add RePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword && (<p className="text-red-500 mt-1 text-sm">*{formik.errors.rePassword}</p>)}
        </div>

       
        <div className="phone">
          <input
            className="from-control w-full"
            type="text"
            placeholder="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone && (<p className="text-red-500 mt-1 text-sm">*{formik.errors.phone}</p>)}
        </div>

        <button type="submit" className="btn w-full text-sm uppercase bg-primary-700 hover:bg-primary-900 text-white font-semibold">
          Sign Up
        </button>
      </form>
    </>
  );
}
