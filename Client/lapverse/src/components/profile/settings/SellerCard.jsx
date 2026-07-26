import { useState } from "react";

import { useSeller } from "../../../context/SellerContext";

import BecomeSellerCard from "./BecomeSellerCard";
import PendingSellerCard from "./PendingSellerCard";
import RejectedSellerCard from "./RejectedSellerCard";
import ApprovedSellerCard from "./ApprovedSellerCard";
import SellerApplicationModal from "./SellerApplicationModal";

const SellerCard = () => {

  const {

    applicationStatus,

    application,

    isSeller,

    activeMode,

    changeMode,

    refreshSeller,

  } = useSeller();

  const [showModal, setShowModal] =
    useState(false);

  return (

    <>

      {applicationStatus === "not_applied" && (

        <BecomeSellerCard

          onApply={() =>
            setShowModal(true)
          }

        />

      )}

      {applicationStatus === "pending" && (

        <PendingSellerCard

          application={application}

        />

      )}

      {applicationStatus === "rejected" && (

        <RejectedSellerCard

          application={application}

          onApplyAgain={() =>
            setShowModal(true)
          }

        />

      )}

      {applicationStatus === "approved" &&
        isSeller && (

        <ApprovedSellerCard

          activeMode={activeMode}

          onModeChange={changeMode}

        />

      )}

      <SellerApplicationModal

        open={showModal}

        onClose={() =>
          setShowModal(false)
        }

        onSuccess={() => {

          setShowModal(false);

          refreshSeller();

        }}

      />

    </>

  );

};

export default SellerCard;