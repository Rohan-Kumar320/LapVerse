import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { getSellerProduct } from "../../services/sellerProductService";
import SellerProductGallery from "../components/SellerProduct/SellerProductGallery";
import SellerProductInfo from "../components/SellerProduct/SellerProductInfo";
import SellerProductSpecifications from "../components/SellerProduct/SellerProductSpecifications";
import SellerProductActions from "../components/SellerProduct/SellerProductActions";

const SellerProductDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [product, setProduct] =
    useState(null);

  //----------------------------------------------------

  useEffect(() => {

    loadProduct();

  }, []);

  //----------------------------------------------------

  const loadProduct = async () => {

    try {

      setLoading(true);

      const data =
        await getSellerProduct(id);

      setProduct(data);

    }

    catch (error) {

      toast.error(
        "Unable to load product."
      );

      navigate("/seller/products");

    }

    finally {

      setLoading(false);

    }

  };

  //----------------------------------------------------

  if (loading) {

    return (

      <div className="text-center py-24">

        Loading Product...

      </div>

    );

  }

  if (!product) return null;

  //----------------------------------------------------

  const handleDelete = () => {

  console.log("Delete Product");

};

return (

<div className="space-y-8">

    <div
        className="
            grid
            gap-8
            xl:grid-cols-2
        "
    >

        <SellerProductGallery
            images={product.images}
        />

        <SellerProductInfo
            product={product}
        />

    </div>

    <SellerProductSpecifications
        product={product}
    />

    <SellerProductActions
    product={product}
    setProduct={setProduct}
    onDelete={handleDelete}
/>

</div>
);
};

export default SellerProductDetails;