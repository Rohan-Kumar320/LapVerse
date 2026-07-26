import { useSeller } from "../../../context/SellerContext";

import BecomeSellerCard from "./BecomeSellerCard";
import PendingSellerCard from "./PendingSellerCard";
import RejectedSellerCard from "./RejectedSellerCard";
import ApprovedSellerCard from "./ApprovedSellerCard";

const Settings = () => {

  const {

    applicationStatus,

  } = useSeller();

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">

          Settings

        </h1>

        <p className="mt-2 text-text-secondary">

          Manage your account preferences.

        </p>

      </div>

      {applicationStatus ===
        "not_applied" && (

        <BecomeSellerCard />

      )}

      {applicationStatus ===
        "pending" && (

        <PendingSellerCard />

      )}

      {applicationStatus ===
        "rejected" && (

        <RejectedSellerCard />

      )}

      {applicationStatus ===
        "approved" && (

        <ApprovedSellerCard />

      )}

    </div>

  );

};

export default Settings;