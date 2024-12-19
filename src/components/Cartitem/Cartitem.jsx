import React, { useContext } from 'react'
import { CartContext } from '../../Context/Cart.context';
import { Link } from 'react-router-dom';
export default function Cartitem({productInfo}) {
  const {price,count,product} = productInfo;
  const {title,imageCover,category,id} = product;
  let {removeProductFromCart,updateCounte} = useContext(CartContext)
  return (
    <>
      <div className='flex gap-2'>
      <div className="flex items-center justify-between px-6 py-3 bg-gray-100 rounded-lg grow">
        <img className='object-cover w-24 h-24 border-4 border-white rounded-full' src={imageCover} alt={title} />
        <h3 className='text-lg font-semibold text-gray-700'><Link to={`/product/${id}`}>{title}</Link></h3>
        <h4 className='text-lg font-semibold text-gray-700'>{category.name}</h4>
        <div className="flex items-center gap-5 count">
            <span className='text-lg font-bold text-gray-600'>{count}</span>
            <div className="space-y-2 icons">
                <div className="flex items-center justify-center w-6 h-6 text-white bg-gray-700 rounded-full cursor-pointer"
                onClick={()=>{
                  updateCounte({productId:id,count:count + 1})
                }}
                >
                    <i className="fa-solid fa-plus"></i>
                </div>
                <div className="flex items-center justify-center w-6 h-6 text-white bg-gray-700 rounded-full cursor-pointer minus "
                onClick={()=>{
                  updateCounte({productId:id,count:count - 1})
                }}>
                <i className="fa-solid fa-minus"></i>
                </div>
            </div>
        </div>
        <span>{price} L.E</span>
      </div>
      <button
      onClick={()=>{
        removeProductFromCart({productId:id})
      }}
      className='p-3 transition-colors duration-300 bg-gray-100 rounded-md hover:bg-gray-200'><i className="fa-solid fa-xmark"></i></button>
      </div>
    </>
  )
}
