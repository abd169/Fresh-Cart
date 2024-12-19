import axios from "axios";
import  { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
export default function Categryslider() {
   
    async  function getCategories(){
        const options={
            url:"https://ecommerce.routemisr.com/api/v1/categories",
            method:"GET",
        };
        return axios.request(options);

    }
    let {data, isLoading, isError, isFetched, isFetching} = useQuery({
      queryKey: [
        "Categryslide"
      ],
      queryFn: getCategories,
      refetchOnMount: false,
      staleTime: 60 *60 * 1000,

    });
   if(isLoading) return <Loading />
  return (
    <>
      
      <section className="my-8   hidden lg:block">
        <h2 className="mb-5 text-lg text-gray-600 font-semibold ">Shop Popular Categories</h2>
       <Swiper slidesPerView={6} loop={true}>
        {data.data.data.map((category)=> <SwiperSlide key={category.id}>
            <div className="h-64"><img className="w-full h-full object-cover" src={category.image} alt="" /></div>
            <h3  className="mt-2">{category.name}</h3>
        </SwiperSlide>)}
        </Swiper>
      </section>
    </>
  )
}
