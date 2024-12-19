import  {useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

import {UserContext} from "../../Context/User.context"
import { Helmet } from "react-helmet";
export default function Login() {
  let {setToken} =useContext(UserContext)

  const navigate = useNavigate()
  const [passwordandEmailErro,setpasswordandEmailErro] = useState(null)

  const [showPassword, setShowPassword] = useState(false);

  const passwordRijex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
 

  const validationSchema = object({
    email: string().required('Email is Required').email("Email is invalid"),
    password: string().required("Password is required")
      .matches(passwordRijex, "Minimum eight characters, at least one uppercase English letter, one lowercase English letter, one number and one special character"),
  });

  async function sendDataLogin(values) {
    const loadingId = toast.loading("Witing ...")
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
       console.log(data)
        if(data.message === "success"){
         localStorage.setItem("token",data.token)
          setToken(data.token)
        toast.success("Welcame User");
        setTimeout(()=>{
          navigate("/")
        }, 2000)
        }
    } catch (error) {
      toast.error(error.response.message)
      setpasswordandEmailErro(error.response.message)
    }
    finally{
      toast.dismiss(loadingId);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: sendDataLogin
  });

  return (
    <>
    <Helmet>
      <title>Login</title>
    </Helmet>
      <h1 className="text-xl text-slate-700 font-semibold mb-5"><i className="fa-regular fa-circle-user mr-2"></i>Register Now</h1>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
       
      

        
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
          {passwordandEmailErro && (<p className="text-red-500 mt-1 text-sm">*{passwordandEmailErro}</p>)}
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
        <button type="submit" className="btn w-full text-sm uppercase bg-primary-700 hover:bg-primary-900 text-white font-semibold">
          Login
        </button>
      </form>
    </>
  );
}
