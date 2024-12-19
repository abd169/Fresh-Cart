import amazone from "../../assets/images/amazon-pay.png"
import amercan from "../../assets/images/American-Express-Color.png"
import master from "../../assets/images/mastercard.webp"
import paypal from "../../assets/images/paypal.png"
import getapple from "../../assets/images/get-apple-store.png"
import googleplay from "../../assets/images/get-google-play.png"
export default function Footer() {
  return (
    
      <footer className='bg-slate-100 py-8'>
      <div className='container space-y-4'>
       <header>
         <h2 className='text-xl text-slate-800 font-semibold'>Get the FreshCart App</h2>
       <p className='text-slate-400'>We Will Send You a Link, Open it your on phone to dowenload the App</p>
       </header>
       <div className='flex gap-2'>
        <input className='from-control grow' type="email" placeholder="Email Address"/>
        <button className='btn text-sm uppercase bg-primary-800 hover:bg-primary-900 text-white font-semibold'>Share App Link</button>
       </div>
       <div className='flex justify-between items-center py-4 border-y-2 border-slate-300 border-opacity-50'>
        <div className="payment-partners flex gap-3 items-center ">
          <h3 className='text-slate-400 font-semibold'>payment partners</h3>
          <img className='w-24' src={amazone} alt='amazone'/>
          <img className='w-24' src={amercan} alt='amercan'/>
          <img className='w-20' src={master} alt='master'/>
          <img className='w-24' src={paypal} alt='paypal'/>
        </div>
        <div className="downlode flex gap-3 items-center">
        <img className='w-24' src={getapple} alt='getapple'/>
        <img className='w-[108px]' src={googleplay} alt='googleplay'/>
        </div>
       </div>
      </div>
    </footer>
    
  )
}
