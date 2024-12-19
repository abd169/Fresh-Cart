import axios from "axios";
import  { useEffect, useState } from "react";
// Import Swiper React components
;

// Import Swiper styles

import Loading from "../../components/Loading/Loading"
import { Helmet } from "react-helmet";
export default function Categrys() {
 
    const [categories,setCategories] = useState(null)
    async  function getCategories(){
        try {
          const options={
            url:"https://ecommerce.routemisr.com/api/v1/categories",
            method:"GET",
        };
        const {data} = await axios.request(options);
        console.log(data)
        setCategories(data.data)
        } catch (error) {
          console.log(error)
        }
    }
    useEffect(()=>{
        getCategories()
    },[])
  return (
    <>
      <Helmet>
      <title>Categories</title>
      </Helmet>
      <section className="my-8 hidden lg:block">
  <h2 className="mb-5 text-lg text-gray-600 font-semibold">
    Shop Popular Categories
  </h2>
  {!categories ? (
    <Loading />
  ) : (
    categories.length > 0 ? (
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <div className="h-64">
              <img
                className="w-full h-full object-cover"
                src={category.image} // افترض أن الحقل موجود
                alt={category.name}
              />
            </div>
            <h3 className="mt-2 text-center">{category.name}</h3>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500">لا توجد فئات متاحة حاليًا.</p>
    )
  )}
</section>


    </>
  )
}
