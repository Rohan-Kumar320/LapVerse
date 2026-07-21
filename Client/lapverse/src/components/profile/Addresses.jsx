import { useEffect, useState } from "react";
import {
  FiMapPin,
  FiPlus,
} from "react-icons/fi";


import AddressCard from "./AddressCard";
import AddressModal from "./AddressModal";
import { getAddresses } from "../../services/userService";

const Addresses = () => {

  const [addresses, setAddresses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [editingAddress, setEditingAddress] =
    useState(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {

    try {

      const data =
        await getAddresses();

      setAddresses(
        data.addresses
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handleAdd = () => {

    setEditingAddress(null);

    setShowModal(true);

  };

  const handleEdit = (address) => {

    setEditingAddress(address);

    setShowModal(true);

  };

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold">

            My Addresses

          </h2>

          <p className="mt-2 text-text-secondary">

            Manage your delivery addresses.

          </p>

        </div>

        <button
          onClick={handleAdd}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-primary
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:scale-105
          "
        >
          <FiPlus />

          Add Address

        </button>

      </div>
            {loading ? (

        <div className="rounded-3xl border border-border bg-card p-10 text-center">

          Loading addresses...

        </div>

      ) : addresses.length === 0 ? (

        <div
          className="
            rounded-3xl
            border-2
            border-dashed
            border-border
            bg-card
            px-8
            py-20
            text-center
          "
        >

          <div
            className="
              mx-auto
              mb-6
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-primary/10
              text-primary
            "
          >
            <FiMapPin size={34} />
          </div>

          <h3 className="text-2xl font-semibold">

            No addresses yet

          </h3>

          <p className="mt-3 text-text-secondary">

            Save your delivery addresses to make
            checkout faster and easier.

          </p>

          <button
            onClick={handleAdd}
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-primary
              px-6
              py-3
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-105
            "
          >
            <FiPlus />

            Add First Address

          </button>

        </div>

      ) : (

        <div
          className="
            grid
            gap-6
            lg:grid-cols-2
          "
        >

          {addresses.map((address) => (

            <AddressCard
              key={address._id}
              address={address}
              refreshAddresses={loadAddresses}
              onEdit={() =>
                handleEdit(address)
              }
            />

          ))}

        </div>

      )}

      <AddressModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingAddress(null);
        }}
        address={editingAddress}
        refreshAddresses={loadAddresses}
      />

    </div>
  );
};

export default Addresses;