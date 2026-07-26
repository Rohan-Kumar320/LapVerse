import { useEffect, useState } from "react";

import {
  FiPackage,
  FiCpu,
  FiDollarSign,
  FiImage,
  FiFileText,
} from "react-icons/fi";

import { toast } from "react-toastify";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getSellerProduct,
  updateSellerProduct,
} from "../../services/sellerProductService";

import ProductSection from "../components/ProductSection";

import ProductBasicInfo from "../components/ProductBasicInfo";
import ProductSpecifications from "../components/ProductSpecifications";
import ProductPricing from "../components/ProductPricing";
import ProductDescription from "../components/ProductDescription";
import ProductImages from "../components/ProductImages";

const EditProduct = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [errors, setErrors] =
    useState({});

  const [deletedImages, setDeletedImages] =
    useState([]);

  const [images, setImages] =
    useState([]);

  const [formData, setFormData] =
    useState({

      title: "",

      brand: "",

      model: "",

      category: "",

      price: "",

      discount: 0,

      processor: "",

      ram: "",

      storage: "",

      gpu: "",

      screenSize: "",

      battery: "",

      description: "",

      condition: "New",

      stock: 1,

    });

  //----------------------------------------------------

  useEffect(() => {

    loadProduct();

  }, [id]);

  //----------------------------------------------------

  const loadProduct = async () => {

    try {

      setPageLoading(true);

      const product =
        await getSellerProduct(id);

      setFormData({

        title:
          product.title,

        brand:
          product.brand,

        model:
          product.model,

        category:
          product.category,

        price:
          product.price,

        discount:
          product.discount,

        processor:
          product.processor,

        ram:
          product.ram,

        storage:
          product.storage,

        gpu:
          product.gpu,

        screenSize:
          product.screenSize,

        battery:
          product.battery,

        description:
          product.description,

        condition:
          product.condition,

        stock:
          product.stock,

      });

      setImages(

        product.images.map(

          (image) => ({

            id:
              image.public_id,

            url:
              image.url,

            public_id:
              image.public_id,

            existing: true,

          })

        )

      );

    }

    catch (error) {

      toast.error(

        "Unable to load product."

      );

      navigate("/seller/products");

    }

    finally {

      setPageLoading(false);

    }

  };

  //----------------------------------------------------

const handleChange = (e) => {

  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  // Clear validation error for the edited field
  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));

};

    //----------------------------------------------------

const handleImageChange = (files) => {

  setImages(files);

  setErrors((prev) => ({

    ...prev,

    images: "",

  }));

}; 

const removeExistingImage = (
  public_id
) => {

  setDeletedImages((prev) => [

    ...prev,

    public_id,

  ]);

  setImages((prev) =>

    prev.filter(

      (image) =>

        image.public_id !== public_id

    )

  );

};

//----------------------------------------------------

  const calculateCompletion =
    () => {

      const required = [

        "title",

        "brand",

        "model",

        "category",

        "price",

        "processor",

        "ram",

        "storage",

        "gpu",

        "screenSize",

        "battery",

        "description",

      ];

      let completed = 0;

      required.forEach((field) => {

        if (formData[field]) {

          completed++;

        }

      });

      if (images.length > 0) {

        completed++;

      }

      return Math.round(

        (completed / (required.length + 1)) *

          100

      );

    };

  //----------------------------------------------------

const validateForm = () => {

  const newErrors = {};

  if (!formData.title.trim())
    newErrors.title = "Title is required";

  if (!formData.brand.trim())
    newErrors.brand = "Brand is required";

  if (!formData.model.trim())
    newErrors.model = "Model is required";

  if (!formData.category)
    newErrors.category = "Select a category";

  if (!formData.price || Number(formData.price) <= 0)
    newErrors.price = "Enter a valid price";

  if (!formData.processor.trim())
    newErrors.processor = "Processor is required";

  if (!formData.ram)
    newErrors.ram = "RAM is required";

  if (!formData.storage)
    newErrors.storage = "Storage is required";

  if (!formData.gpu.trim())
    newErrors.gpu = "GPU is required";

  if (!formData.screenSize)
    newErrors.screenSize = "Screen size is required";

  if (!formData.battery)
    newErrors.battery = "Battery capacity is required";

  if (!formData.description.trim())
    newErrors.description = "Description is required";

  if (images.length === 0)
    newErrors.images = "Upload at least one image";

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;

};

const handleSubmit = async () => {

  if (!validateForm()) {

    toast.error(
      "Please complete all required fields."
    );

    return;

  }

  try {

    setLoading(true);

    const data = new FormData();

    Object.entries(formData).forEach(

      ([key, value]) => {

        data.append(key, value);

      }

    );

    // Upload ONLY newly added images

    images
      .filter(
        (image) => !image.existing
      )
      .forEach((image) => {

        data.append(
          "images",
          image.file
        );

      });

    // Send deleted image ids

    deletedImages.forEach((id) => {

      data.append(
        "deletedImages",
        id
      );

    });

    const response =
      await updateSellerProduct(
        id,
        data
      );

    toast.success(
      response.message
    );

    navigate(
      "/seller/products"
    );

  }

  catch (error) {

    toast.error(

      error.response?.data?.message ||

      error.response?.data?.errors?.[0]?.msg ||

      "Unable to update product."

    );

  }

  finally {

    setLoading(false);

  }

};

if (pageLoading) {

  return (

    <div className="flex h-[70vh] items-center justify-center">

      <div className="text-lg font-semibold">

        Loading Product...

      </div>

    </div>

  );

}
//----------------------------------------------------
  return (

    <div className="space-y-8">

      {/* Page Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            Edit Product

          </h1>

          <p className="mt-2 text-text-secondary">

            Update your product information.

          </p>

        </div>

      </div>

      {/* Progress */}

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-border
          bg-card
          shadow-sm
        "
      >

        <div className="p-7">

          <div className="mb-4 flex items-center justify-between">

            <h3 className="font-semibold">

              Product Completion

            </h3>

            <span className="font-bold text-primary">

              {calculateCompletion()}%

            </span>

          </div>

          <div
            className="
              h-3
              overflow-hidden
              rounded-full
              bg-background
            "
          >

            <div

              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-primary
                to-blue-600
                transition-all
                duration-500
              "

              style={{
                width: `${calculateCompletion()}%`,
              }}

            />

          </div>

        </div>

      </div>

      {/* Images */}

      <ProductSection

        title="Product Images"

        subtitle="Upload up to five images"

        icon={<FiImage size={24} />}

        color="blue"

      >

        <ProductImages

          images={images}

          setImages={handleImageChange}

          removeExistingImage={removeExistingImage}

          errors={errors}

        />

      </ProductSection>

      {/* Basic Info */}

      <ProductSection

        title="Basic Information"

        subtitle="General information"

        icon={<FiPackage size={24} />}

        color="indigo"

      >

        <ProductBasicInfo

          formData={formData}

          handleChange={handleChange}
          errors={errors}


        />

      </ProductSection>

      {/* Specifications */}

      <ProductSection

        title="Specifications"

        subtitle="Technical details"

        icon={<FiCpu size={24} />}

        color="purple"

      >

        <ProductSpecifications

          formData={formData}

          handleChange={handleChange}

          errors={errors}

        />

      </ProductSection>

      {/* Pricing */}

      <ProductSection

        title="Pricing"

        subtitle="Price & inventory"

        icon={<FiDollarSign size={24} />}

        color="emerald"

      >

        <ProductPricing

          formData={formData}

          handleChange={handleChange}

          errors={errors}

        />

      </ProductSection>

      {/* Description */}

      <ProductSection

        title="Description"

        subtitle="Tell buyers about your laptop"

        icon={<FiFileText size={24} />}

        color="orange"

      >

        <ProductDescription

          formData={formData}

          handleChange={handleChange}

          errors={errors}

        />

      </ProductSection>

      {/* Footer */}

      <div className="flex justify-end gap-4">

        <button

          onClick={() =>
            navigate(-1)
          }

          className="
            rounded-2xl
            border
            border-border
            px-6
            py-3
            font-semibold
          "

        >

          Cancel

        </button>

        <button

          disabled={loading}

          onClick={handleSubmit}

className={`

  rounded-2xl
  px-8
  py-3
  font-semibold
  text-white
  shadow-lg
  transition

  ${loading

    ? "cursor-not-allowed bg-gray-400"

    : "bg-gradient-to-r from-primary to-blue-600 hover:scale-[1.02]"

  }

`}
        >

{loading

  ? "Updating Product..."

  : "Save Changes"}

        </button>

      </div>

    </div>

  );

};

export default EditProduct;