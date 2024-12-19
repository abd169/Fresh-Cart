import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import Loading from "../../components/Loading/Loading";
import { CartContext } from "../../Context/Cart.context";
import { Helmet } from "react-helmet";

export default function BrandsPage() {
  const { brands, loading, error } = useContext(CartContext)
  const [searchTerm, setSearchTerm] = useState("");
  
  // فلترة الماركات بناءً على البحث
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
   <>
    <Helmet>
      <title>Brandes</title>
    </Helmet>
    <div className="container bg-slate-100 mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">تصفح الماركات</h1>

      {/* شريط البحث */}
      <input
        type="text"
        placeholder="ابحث عن ماركة..."
        className="border  p-2 mb-4 w-full from-control"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* شبكة عرض الماركات */}
      <div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-8 w-full">
      {filteredBrands.map((brand) => (
  <div key={brand.id} className="border p-4 text-center">
     <Link to={`/Brand/${brand._id}`}>
    <img
      src={brand.image} 
      alt={brand.brand_name} 
      className="h-20 mx-auto mb-2"
    /></Link>
    <h3 className="text-lg font-semibold">{brand.name}</h3> 
    <h2>{brand.slug}</h2>
  </div>
))}

      </div>
    </div>
   </>
  );
}
