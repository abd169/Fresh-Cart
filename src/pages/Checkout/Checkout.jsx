import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/Cart.context";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/User.context";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import * as Yup from "yup"; // لإضافة التحقق من صحة الحقول
import { Helmet } from "react-helmet";

export default function Checkout() {
  const { cartInfo } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null);

  // التحقق من صحة حقل الموبايل والمدينة باستخدام Yup
  const validationSchema = Yup.object({
    shippingAddress: Yup.object({
      city: Yup.string()
        .min(3, "المدينة يجب أن تكون مكونة من 3 أحرف على الأقل")
        .required("المدينة مطلوبة"),
      phone: Yup.string()
        .matches(
          /^(010|011|012)\d{8}$/,
          "رقم الهاتف يجب أن يبدأ بـ 010 أو 011 أو 012 ويتكون من 11 رقمًا"
        )
        .required("رقم الهاتف مطلوب"),
      details: Yup.string()
        .required("تفاصيل العنوان مطلوبة"),
    }),
  });

  // دالة إنشاء الطلب نقدي
  async function createCashOrder(values) {
    const loadingId = toast.loading("We are creating your order ....");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Your order has been created");
        setTimeout(() => {
          navigate("/allorders");
        }, 20);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      toast.dismiss(loadingId);
    }
  }

  // دالة إنشاء الدفع عبر الإنترنت
  async function createOnlinePayment(values) {
    const loadingId = toast.loading("We are creating your order ....");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Wetengi ...");
        setTimeout(() => {
          location.href = data.session.url;
        }, 2000);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      toast.dismiss(loadingId);
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema, // إضافة التحقق من صحة الحقول
    onSubmit: (values) => {
      if (paymentMethod == "cash") createCashOrder(values);
      else createOnlinePayment(values);
    },
  });

  return (
    <>
    <Helmet>
      <title>Checkout</title>
    </Helmet>
      <section>
        <h1 className="text-xl text-gray-600 font-semibold mb-6">Shopping Address</h1>
        <form className="space-y-3" onSubmit={formik.handleSubmit}>
          <div className="city">
            <input
              type="text"
              name="shippingAddress.city"
              className="from-control w-full pr-10"
              placeholder="City"
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // أضفنا حدث onBlur للتحقق عند الخروج من الحقل
            />
            {formik.touched.shippingAddress?.city && formik.errors.shippingAddress?.city && (
              <div className="text-red-500 text-sm">{formik.errors.shippingAddress.city}</div>
            )}
          </div>

          <div className="phone">
            <input
              type="tel"
              name="shippingAddress.phone"
              className="from-control w-full pr-10"
              placeholder="Phone"
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // أضفنا حدث onBlur للتحقق عند الخروج من الحقل
            />
            {formik.touched.shippingAddress?.phone && formik.errors.shippingAddress?.phone && (
              <div className="text-red-500 text-sm">{formik.errors.shippingAddress.phone}</div>
            )}
          </div>

          <div className="details">
            <textarea
              name="shippingAddress.details"
              className="from-control w-full pr-10"
              placeholder="Details"
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // أضفنا حدث onBlur للتحقق عند الخروج من الحقل
            ></textarea>
            {formik.touched.shippingAddress?.details && formik.errors.shippingAddress?.details && (
              <div className="text-red-500 text-sm">{formik.errors.shippingAddress.details}</div>
            )}
          </div>

          <div className="space-x-3">
            <button
              onClick={() => { setPaymentMethod("cash"); }}
              type="submit"
              className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            >
              Cash Order
            </button>
            <button
              onClick={() => { setPaymentMethod("online"); }}
              type="submit"
              className="btn bg-lime-500 hover:bg-lime-600 text-white font-semibold"
            >
              Online Payment
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
