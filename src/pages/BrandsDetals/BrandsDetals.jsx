import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";
import Loading from "../../components/Loading/Loading";
import Cart from "../../components/Cart/Cart";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Helmet } from "react-helmet";
export default function BrandDetails() {
  const [brandDetails, setBrandDetails] = useState(null);
  const [brandProducts, setBrandProducts] = useState([]);
  const { id } = useParams(); // الحصول على الـ id من الرابط
  const { addProductToCart } = useContext(CartContext);

  async function getBrandDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
        method: "GET"
      };
      let { data } = await axios.request(options);
      setBrandDetails(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBrandProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,
        method: "GET"
      };
      let { data } = await axios.request(options);
      setBrandProducts(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBrandDetails();
    getBrandProducts();
  }, [id]);

  return (
    <>
      <Helmet>
      <title>BrandDetails</title>
    </Helmet>
    <div className="container mx-auto my-8 space-x-8 bg-inherit">
      {brandDetails ? (
        <>
          
          <Helmet>
      <title>{brandDetails.name}</title>
    </Helmet>
          <img
            src={brandDetails.image}
            alt={brandDetails.name}
            className="h-40 mx-auto mb-20 mt-10 "
          />
          
          <h2 className="text-xl font-semibold mb-8 text-center bg-primary-900 text-white">BrandProducts</h2>
          {brandProducts.length > 0 ? (
            <Swiper 
            loop={true}
            pagination={{ clickable: true }}
            spaceBetween={15}
            breakpoints={{
              340: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
             >
              {brandProducts.map((product) => (
                <SwiperSlide key={product._id}>
                  <Cart productInfo={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>لا توجد منتجات لهذه الماركة.</p>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
    </>
  );
}
