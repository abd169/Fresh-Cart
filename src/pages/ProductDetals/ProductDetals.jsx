import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Cart from "../../components/Cart/Cart";
import useOline from "../../hooks/useOnline";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [error, setError] = useState(null); // لمعالجة الأخطاء
  const { id } = useParams();
  const { addProductToCart } = useContext(CartContext);

  async function getProductDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      setProductDetails(data.data);
    } catch (error) {
      setError("Failed to load product details. Please try again later.");
      console.error(error);
    }
  }

  async function getRelatedProducts() {
    if (!productDetails?.category?._id) return; // التأكد من وجود `category`
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      setRelatedProducts(data.data);
    } catch (error) {
      setError("Failed to load related products. Please try again later.");
      console.error(error);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  useEffect(() => {
    if (productDetails) {
      getRelatedProducts();
    }
  }, [productDetails]);

  if (error) {
    return <div className="text-red-500">{error}</div>; // عرض رسالة الخطأ
  }

  let isOnline = useOline()
  return (
    <>
    <Helmet>
      <title>ProductDetails</title>
    </Helmet>
      {productDetails ? (
        <>
        <Helmet>
          <title>{productDetails.title}</title>
        </Helmet>
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
            <div className="col-span-5">
              <ReactImageGallery
                showPlayButton={false}
                items={productDetails.images.map((image) => ({
                  original: image,
                  thumbnail: image,
                }))}
              />
            </div>
            <div className="col-span-7 mr-5 ml-5 space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-600">
                  {productDetails.title}
                </h2>
                <h3 className="font-semibold text-primary-600">
                  {productDetails.category.name}
                </h3>
              </div>
              <p className="text-gray-400">{productDetails.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-primary-800">
                  {productDetails.price} L.E
                </span>
                <div className="flex items-center">
                  <i className="mr-2 text-yellow-500 fa-solid fa-star"></i>
                  <span>{productDetails.ratingsAverage}</span>
                </div>
              </div>
              {isOnline && (
                <button
                onClick={() => addProductToCart({ productId: id })}
                className="w-full font-semibold text-white btn bg-primary-500 hover:bg-primary-600"
              >
                Add To Cart
              </button>
              )}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="mb-6 text-2xl text-gray-800 text-center">Related Products</h2>
            {relatedProducts ? (
              <Swiper
                spaceBetween={15}
                loop={true}
                breakpoints={{
                  340: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 6 },
                }}
              >
                {relatedProducts.map((product) => (
                  <SwiperSlide key={product._id}>
                    <Cart productInfo={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Loading />
            )}
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
