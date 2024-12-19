import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { Link } from 'react-router-dom';
import { CartContext } from "../../Context/Cart.context"
import { useContext } from "react"
import { Helmet } from "react-helmet";
export default function ProductCart() {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let {addProductToCart} = useContext(CartContext )
  // جلب البيانات من الـ API
  async function getProducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/products",
        method: "GET",
      };
      const { data } = await axios.request(options);
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  // التحقق من تحميل البيانات
  if (isLoading) return <Loading />;

  return (
    <>
    <Helmet>
      <title>Products</title>
    </Helmet>
    <div className="container mx-auto my-6">
      <div className="grid grid-cols-12 gap-4">
        {products &&
          products.map((product) => {
            const {id, images, title, price, category, ratingsAverage } = product;
            return (
              <div
                key={id}
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
              >
                <div className="overflow-hidden shadow-lg">
                  <div className="relative">
                    <img
                      src={images?.[0] || "default-image.jpg"}
                      className="w-full"
                      alt={title || "Product"}
                    />
                    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full gap-2 transition-opacity duration-300 bg-black opacity-0 layer hover:opacity-100 bg-opacity-15">
                      <div className="flex items-center justify-center w-10 h-10 text-sm text-white transition-transform duration-300 rounded-full cursor-pointer icon hover:rotate-6 hover:scale-110 bg-primary-900">
                        <i className="fa-solid fa-heart"></i>
                      </div>
                      <div
            onClick={()=>{
              addProductToCart({productId:id})}}  className="flex items-center justify-center w-10 h-10 text-sm text-white transition-transform duration-300 rounded-full cursor-pointer icon hover:rotate-6 hover:scale-110 bg-primary-900">
                <i className="fa-solid fa-cart-shopping"></i>
            </div>
                      <div className="flex items-center justify-center w-10 h-10 text-sm text-white transition-transform duration-300 rounded-full cursor-pointer icon hover:rotate-6 hover:scale-110 bg-primary-900">
                      <Link to={`/Product/${id}`} className="flex items-center justify-center w-10 h-10 text-sm text-white transition-transform duration-300 rounded-full cursor-pointer icon hover:rotate-6 hover:scale-110 bg-primary-900">
                <i className="fa-solid fa-eye"></i>
            </Link>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-primary-800">{category?.name || "Category"}</h3>
                    <h2 className="text-lg font-semibold line-clamp-2">
                      {title || "Product Title"}
                    </h2>
                    <div className="flex items-center justify-between mt-3">
                      <span>{price ? `${price} L.E` : "N/A"}</span>
                      <div className="flex items-center gap-1">
                        <i className="text-yellow-500 fa-solid fa-star"></i>
                        <span>{ratingsAverage || "0.0"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
    </>
  );
}
