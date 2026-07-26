import { useState } from "react";
import {
  FiPackage,
  FiCpu,
  FiDollarSign,
  FiImage,
  FiFileText,
} from "react-icons/fi";

import { toast } from "react-toastify";
import { createProduct } from "../../services/sellerProductService";
import { useNavigate } from "react-router-dom";

import ProductSection from "../components/ProductSection";

import ProductBasicInfo from "../components/ProductBasicInfo";
import ProductSpecifications from "../components/ProductSpecifications";
import ProductPricing from "../components/ProductPricing";
import ProductDescription from "../components/ProductDescription";
import ProductImages from "../components/ProductImages";

const AddProduct = () => {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

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

    const [errors, setErrors] = useState({});

  //----------------------------------------------------

const handleChange = (e) => {

  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

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

    images.forEach((image) => {

      data.append(
        "images",
        image.file
      );

    });

    const response =
      await createProduct(data);

    toast.success(
      response.message
    );

    setFormData({
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

setImages([]);
setErrors({});

    navigate("/seller/products");

  }

  catch (error) {

toast.error(
  error.response?.data?.message ||
  error.response?.data?.errors?.[0]?.msg ||
  "Unable to create product."
);
  }

  finally {

    setLoading(false);

  }

};
  //----------------------------------------------------

  return (

    <div className="space-y-8">

      {/* Page Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            Add New Product

          </h1>

          <p className="mt-2 text-text-secondary">

            Create a new listing for your
            store.

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

  ? "Uploading Product..."

  : "Publish Product"}

        </button>

      </div>

    </div>

  );

};

export default AddProduct;