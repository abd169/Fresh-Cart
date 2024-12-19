import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/User.context";
import { jwtDecode } from "jwt-decode";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { token } = useContext(UserContext);
  let { id } = jwtDecode(token);

  async function getUserOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    setOrders(data);
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
    <Helmet>
      <title>Orders</title>
    </Helmet>
    <div className="flex items-center gap-5"><i className="text-3xl fa-brands fa-opencart"></i>
          <h2 className="relative text-xl font-semibold text-slate-600 pl-4 before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2">Your Orders</h2>
          </div>
      {orders ? (
        orders.length === 0 ? ( // التحقق إذا كان عدد الطلبات صفر
          <div className="flex flex-col items-center justify-center gap-3 p-6 mt-6 bg-gray-100 rounded-md shadow">
            <h2>
              Oops! Your Not Orders. Start shopping now by clicking the
              button below and find something you love!
            </h2>
            <Link
              to="/"
              className="text-white btn bg-primary-600 hover:bg-primary-700"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <section className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="orders p-4 border-2 border-gray-500 border-opacity-25 rounded-lg"
              >
                <header className="flex justify-between items-center">
                  <div>
                    <h2 className="text-gray-500">Order ID</h2>
                    <span className="text-lg font-semibold text-gray-700">
                      {order.id}
                    </span>
                  </div>
                  <div className="space-x-4">
                    {order.isPaid ? (
                      <span className="font-cairo mx-2 inline-block px-3 py-1 bg-lime-500 text-white rounded-full">
                        تم الدفع
                      </span>
                    ) : (
                      <span className="font-cairo mx-2 inline-block px-3 py-1 bg-red-500 text-white rounded-full">
                        غير مدفوع
                      </span>
                    )}
                    {order.isDelivered ? (
                      <span className="font-cairo inline-block px-3 py-1 bg-lime-500 text-white rounded-full">
                        تم التوصيل
                      </span>
                    ) : (
                      <span className="font-cairo inline-block px-3 py-1 bg-blue-500 text-white rounded-full">
                        قيد التوصيل
                      </span>
                    )}
                  </div>
                </header>

                <div className="grid mt-4 md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {order.cartItems.map((product) => (
                    <div
                      key={product._id}
                      className="product-item border-2 border-gray-400 border-opacity-30 p-4 rounded-lg"
                    >
                      <img
                        className="w-full"
                        src={product.product.imageCover}
                        alt=""
                      />
                      <h3 className="text-lg font-semibold line-clamp-2">
                        <Link to={`/product/${product.product.id}`}>
                          {product.product.title}
                        </Link>
                      </h3>
                      <div className="flex justify-between items-center mt-2">
                        <p className="mx-1 font-bold text-slate-800">
                          <span className="font-bold underline mx-1">
                            Count:
                          </span>
                          {product.count}
                        </p>
                        <span className="mx-1 font-bold text-primary-800">
                          {product.price} L.E
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-lg mt-4">
                  Your Total Order Price{" "}
                  <span className="mx-1 font-bold text-primary-800">
                    {order.totalOrderPrice}
                  </span>
                  L.E
                </p>
              </div>
            ))}
          </section>
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
