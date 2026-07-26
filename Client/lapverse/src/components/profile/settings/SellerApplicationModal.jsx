import { useState } from "react";

import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiUser,
  FiBriefcase,
  FiShoppingBag,
} from "react-icons/fi";

import { toast } from "react-toastify";

import { useSeller } from "../../../context/SellerContext";

import Input from "./Input";
import { FaStore } from "react-icons/fa";
import TextArea from "./TextArea";

const TOTAL_STEPS = 3;

const SellerApplicationModal = ({
  open,
  onClose,
  onSuccess,
}) => {

  const {
    submitApplication,
  } = useSeller();

  const [step, setStep] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      sellerType: "",

      storeName: "",

      phone: "",

      city: "",

      storeAddress: "",

      businessDescription: "",

      cnic: "",

    });

  if (!open) return null;

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const nextStep = () => {

    if (step === 1) {

      if (!formData.sellerType) {

        toast.warning(
          "Please select seller type."
        );

        return;

      }

    }

    if (step === 2) {

      if (

        !formData.storeName ||

        !formData.phone ||

        !formData.city

      ) {

        toast.warning(
          "Please complete all fields."
        );

        return;

      }

    }

    setStep(step + 1);

  };

  const previousStep = () => {

    setStep(step - 1);

  };

  const handleSubmit = async () => {

    if (

      !formData.storeAddress || !formData.businessDescription ||

      !formData.cnic

    ) {

      toast.warning(
        "Please complete all fields."
      );

      return;

    }

    try {

      setLoading(true);

      const result =
        await submitApplication(
          formData
        );

      if (result.success) {

        onSuccess();

      }

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-md
        p-5
      "
    >

      <div
        className="
          w-full
          max-w-3xl
          overflow-hidden
          rounded-3xl
          border
          border-border
          bg-card
          shadow-2xl
        "
      >

        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-border
            px-8
            py-6
          "
        >

          <div>

            <h2 className="text-2xl font-bold">

              Seller Application

            </h2>

            <p className="mt-2 text-sm text-text-secondary">

              Complete the information below
              to become a verified seller.

            </p>

          </div>

          <button

            onClick={onClose}

            className="
              rounded-xl
              p-2
              transition
              hover:bg-background
            "

          >

            <FiX size={22} />

          </button>

        </div>

        {/* Progress */}

        <div className="px-8 pt-8">

          <div className="flex items-center">

            {[1,2,3].map((item,index)=>(

              <>

                <div

                  className={`
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    font-semibold

                    ${
                      item<=step

                      ? "border-primary bg-primary text-white"

                      : "border-border"

                    }
                  `}

                >

                  {item<step
                    ? <FiCheck/>
                    : item}

                </div>

                {index!==2 && (

                  <div

                    className={`
                      h-1
                      flex-1

                      ${
                        item<step

                        ? "bg-primary"

                        : "bg-border"

                      }
                    `}

                  />

                )}

              </>

            ))}

          </div>

        </div>

        {/* Body */}

        <div className="min-h-[420px] px-8 py-10">
                      {step === 1 && (

            <div className="space-y-8">

              <div>

                <h3 className="text-2xl font-bold">

                  Choose Seller Type

                </h3>

                <p className="mt-2 text-sm text-text-secondary">

                  Select the type of account
                  you want.

                </p>

              </div>

              <div className="grid gap-6 md:grid-cols-2">

                <button

                  type="button"

                  onClick={()=>

                    setFormData({

                      ...formData,

                      sellerType:"Individual",

                    })

                  }

                  className={`
                    rounded-3xl
                    border
                    p-8
                    text-left
                    transition

                    ${
                      formData.sellerType==="Individual"

                      ? "border-primary bg-primary/5"

                      : "border-border hover:border-primary"

                    }
                  `}

                >

                  <FiUser
                    size={34}
                    className="text-primary"
                  />

                  <h4 className="mt-6 text-lg font-bold">

                    Individual

                  </h4>

                  <p className="mt-3 text-sm leading-7 text-text-secondary">

                    Sell products as an
                    individual.

                  </p>

                </button>

                <button

                  type="button"

                  onClick={()=>

                    setFormData({

                      ...formData,

                      sellerType:"Business",

                    })

                  }

                  className={`
                    rounded-3xl
                    border
                    p-8
                    text-left
                    transition

                    ${
                      formData.sellerType==="Business"

                      ? "border-primary bg-primary/5"

                      : "border-border hover:border-primary"

                    }
                  `}

                >

                  <FiBriefcase
                    size={34}
                    className="text-primary"
                  />

                  <h4 className="mt-6 text-lg font-bold">

                    Business

                  </h4>

                  <p className="mt-3 text-sm leading-7 text-text-secondary">

                    Registered company or store.

                  </p>

                </button>

              </div>

            </div>

          )}
                  {step===2 &&(

          <div className="space-y-7">

            <div>

              <h3 className="text-2xl font-bold">

                Store Information

              </h3>

              <p className="mt-2 text-sm text-text-secondary">

                Tell us about your store.

              </p>

            </div>

            <Input
              label="Store Name"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
            />

            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />

          </div>

        )}
                {step === 3 && (

          <div className="space-y-7">

            <div>

              <h3 className="text-2xl font-bold">

                Verification Details

              </h3>

              <p className="mt-2 text-sm text-text-secondary">

                These details will be reviewed by our
                administrators before your seller account
                is approved.

              </p>

            </div>

            <Input
              label="Business Address"
              name="address"
              value={formData.storeAddress}
              onChange={handleChange}
              placeholder="Enter your complete address"
            />

            <label>Business Description</label>

<TextArea
  label="Business Description"
  name="businessDescription"
  value={formData.businessDescription}
  onChange={handleChange}
  maxLength={300}
  placeholder="Tell us about your business. Mention what products you sell, your specialization, and what customers can expect from your store."
/>
<div className="text-right text-xs text-text-secondary">

{formData.businessDescription.length}/300

</div>

            <Input
              label="CNIC Number"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              placeholder="42101-1234567-1"
            />

            <div
              className="
                rounded-2xl
                border
                border-primary/20
                bg-primary/5
                p-5
              "
            >

              <div className="flex gap-4">

                <FaStore
                  size={22}
                  className="mt-1 text-primary"
                />

                <div>

                  <h4 className="font-semibold">

                    Verification Notice

                  </h4>

                  <p className="mt-3 text-sm leading-7 text-text-secondary">

                    Your application will be manually
                    reviewed by the LapVerse team.

                    <br /><br />

                    Approval usually takes between
                    24–48 hours.

                  </p>

                </div>

              </div>

            </div>

          </div>

        )}

        </div>

        {/* Footer */}

        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-border
            px-8
            py-6
          "
        >

          <button

            type="button"

            onClick={
              step === 1
                ? onClose
                : previousStep
            }

            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-border
              px-6
              py-3
              text-sm
              font-medium
              transition
              hover:bg-background
            "

          >

            <FiChevronLeft />

            {step === 1
              ? "Cancel"
              : "Previous"}

          </button>

          <div className="flex items-center gap-3">

            <span className="text-sm text-text-secondary">

              Step {step} of {TOTAL_STEPS}

            </span>

            {step !== TOTAL_STEPS ? (

              <button

                type="button"

                onClick={nextStep}

                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-primary
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:scale-[1.02]
                "

              >

                Next

                <FiChevronRight />

              </button>

            ) : (

              <button

                type="button"

                disabled={loading}

                onClick={handleSubmit}

                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-primary
                  px-7
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:scale-[1.02]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "

              >

                {loading
                  ? "Submitting..."
                  : "Submit Application"}

              </button>

            )}

          </div>

        </div>

      </div>

    </div>

  );

};

export default SellerApplicationModal;