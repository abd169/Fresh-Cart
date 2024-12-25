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
// import React,{useState,useEffect} from "react"
// import ProductCart from "../../components/productCart/ProductCart";
// import Loading from "../../components/Loading/Loading";
// import axios from 'axios';
// export default function Home() {
//   const [products, setProducts] = useState(null);
//  async  function getProducts(){
//     const options ={
//       url: "https://ecommerce.routemisr.com/api/v1/products",
//       method: "GET"
//     }
//     const {data} = await axios.request(options);
//     setProducts(data.data)
//   }
//   useEffect(()=>{
//     getProducts()
//   },[])
//   return (
//     <>
//       {products ? (
//         <div className="grid grid-cols-12 gap-4"> 
//         {products.map((product) =>(
//            <ProductCart productInfo={product} />
//         ))}
//         </div>
//       ):(
//        <Loading />
//       )}
//     </>
//   )
// }
import Card from "../../components/Cart/Cart";
import Loading from "../../components/Loading/Loading";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Homeslider from "../../components/Homeslider/Homeslider";
import Categryslider from "../../components/Categryslider/Categryslider";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
export default function Home() {
    function getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/products",
                method: "GET"
            };
            return axios.request(options);
        });
    }
    let { data, isLoading, isError } = useQuery({
        queryKey: [
            "products"
        ],
        queryFn: getProducts,
        staleTime: 6 * 60 * 60 * 1000,
        refetchInterval: 10000,
        retry: 3,
    });
    if (isLoading)
        return _jsx(Loading, {});
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Home" }) }), _jsx(Homeslider, {}), _jsx(Categryslider, {}), ": ", _jsx("div", { className: "grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 w-full ", children: data.data.data.map((product) => _jsx(Card, { productInfo: product }, product.id)) })] }));
}
