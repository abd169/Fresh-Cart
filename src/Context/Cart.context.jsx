import { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(UserContext);
  const [cartInfo, setCartInfo] = useState(null);

  // بيانات الماركات
  const [brands, setBrands] = useState([]);
  const [brandsLoading, setBrandsLoading] = useState(false);
  const [brandsError, setBrandsError] = useState(null);

  // جلب الماركات
  async function fetchBrands() {
    setBrandsLoading(true);
    setBrandsError(null);
    try {
        const baseUrl = "https://ecommerce.routemisr.com";
        const url = `${baseUrl}/api/v1/brands`;
        
        const { data } = await axios.get(url); // استخدم الرابط النهائي
        console.log(data);
        setBrands(data.data); // Assuming the API returns brands in `data.data`
    } catch (error) {
        setBrandsError("خطأ في جلب الماركات.");
        console.error(error);
    } finally {
        setBrandsLoading(false);
    }
}

  // جلب الماركات عند التحميل
  useEffect(() => {
    fetchBrands();
  }, []);

  // الوظائف الخاصة بالسلة (كما هي)
  async function addProductToCart({ productId }) {
    let toastId = toast.loading("Adding Product.....");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success(data.message);
        getCartProducts();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function getCartProducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
      setCartInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductFromCart({ productId }) {
    let toastId = toast.loading("Deleting Product.....");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Product has Deleted");
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function clearCart() {
    let toastId = toast.loading("Clear Cart.....");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("Cart has cleared");
        setCartInfo({
          numOfCartItems: 0,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function updateCounte({ productId, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getCartProducts,
        removeProductFromCart,
        clearCart,
        updateCounte,
        cartInfo,
        brands, // بيانات الماركات
        brandsLoading, // حالة التحميل
        brandsError, // الأخطاء
        fetchBrands, // وظيفة جلب الماركات
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
