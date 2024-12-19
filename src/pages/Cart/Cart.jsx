import { useContext, useEffect } from "react"
import { CartContext } from "../../Context/Cart.context"
import Loading from "../../components/Loading/Loading"
import Cartitem from "../../components/Cartitem/Cartitem"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet";
export default function Cart() {
   let{getCartProducts,cartInfo,clearCart} = useContext(CartContext)
    useEffect(()=>{
        getCartProducts()
    }, [])
  return (
    <>
    <Helmet>
      <title>Cart</title>
    </Helmet>
      {cartInfo === null ?( <Loading/> ): (
        <section>
          <div className="flex items-center gap-5"><i className="text-3xl fa-brands fa-opencart"></i>
          <h2 className="relative text-xl font-semibold text-slate-600 pl-4 before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2">Your Shopping Cart</h2>
          </div>
        {cartInfo.numOfCartItems === 0 ? <div className="flex flex-col items-center justify-center gap-3 p-6 mt-6 bg-gray-100 rounded-md shadow">
          <h2>Oops! Yourcart is empty. Start shopping now by clicking the
           button below and find something you love!</h2>
           <Link to="/" className="text-white btn bg-primary-600 hover:bg-primary-700">Back to Home</Link>
           </div> :(
           <>
             <div className="mt-8 space-y-4">
          {cartInfo.data.products.map((product)=> <Cartitem key={product._id} productInfo={product}/>)}
        </div>
         <div className="flex items-center justify-between mt-5">
         <p className="text-xl"><i className="mr-2 text-xl fa-solid fa-dollar-sign text-primary-600"></i> Your Total Cart Price <span className="font-bold text-primary-600">{cartInfo.data.totalCartPrice}</span> </p>
         <bitton
         onClick={clearCart}
         className='text-white bg-red-500 cursor-pointer btn hover:bg-red-600'><i className="mr-2 cursor-pointer fa-solid fa-trash"></i>
          Clear Cart</bitton>
         </div>
         <Link 
              to="/checkout"
              className="btn bg-primary-500 hover:bg-primary-600 text-white inline-block w-full text-center mt-8">
            Next Step (Payment)
         </Link>
           </>
    )}
        </section>)}
    </>
  );
}


