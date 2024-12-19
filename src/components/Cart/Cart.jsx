import React from 'react'
import { CartContext } from "../../Context/Cart.context"
import { useContext } from "react"
import { Link } from 'react-router-dom';
export default function Cart({productInfo}) {
    const {imageCover,title,price,category,ratingsAverage,description,id} = productInfo;
    let {addProductToCart} = useContext(CartContext )
  return (
    <div>
      <div className="overflow-hidden rounded-lg shadow-lg cart ">
        <div className='relative'>
        <img src={imageCover} alt="aus" />
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full gap-2 transition-opacity duration-300 bg-black opacity-0 layer hover:opacity-100 bg-opacity-15">
        <div className="flex items-center justify-center w-10 h-10 text-sm text-white transition-transform duration-300 rounded-full cursor-pointer icon hover:rotate-6 hover:scale-110 bg-primary-900">
                <i className="fa-solid fa-heart"></i>
            </div>
            
            <div
            onClick={()=>{
              addProductToCart({productId:id})}}  className="flex items-center justify-center w-10 h-10 text-sm text-white transition-transform duration-300 rounded-full cursor-pointer icon hover:rotate-6 hover:scale-110 bg-primary-900">
                <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <Link to={`/Product/${id}`} className="flex items-center justify-center w-10 h-10 text-sm text-white transition-transform duration-300 rounded-full cursor-pointer icon hover:rotate-6 hover:scale-110 bg-primary-900">
                <i className="fa-solid fa-eye"></i>
            </Link>
        </div>
        </div>
        <div className="p-4 space-y-3 cart-body">
            <header>
                <h3 className="text-lg font-semibold text-gray-600 line-clamp-1">{title}</h3>
                <h4 className="text-sm font-semibold text-primary-500">{category.name}</h4>
            </header>
           <p className="text-sm text-gray-400 line-clamp-2"> {description}</p>
           <div className='flex items-center justify-between'>
            <span>{price} L.E</span>
            <div>
                <i className="mr-1 text-yellow-500 fa-solid fa-star"></i>
                <span>{ratingsAverage}</span>
            </div>
           </div>
        </div>
      </div>
    </div>
  )
}
