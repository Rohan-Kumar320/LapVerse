import { useEffect, useState } from "react";

import { getSellers, getSellerCities } from "../services/adminSellerService";


import SellersTable from "../components/sellers/SellersTable";
import SellerProfileDrawer from "../components/sellers/SellerProfileDrawer";
import DataToolbar from "../components/common/DataToolbar";
import SellerStats from "../components/sellers/SellerStats";
import SuspendUserModal from "../components/users/SuspendUserModal";
import { reactivateUser } from "../services/adminUserService";
import ReactivateUserModal from "../components/users/ReactivateUserModal";
import Pagination from "../components/common/Pagination";
import RemoveSellerRoleModal from "../components/sellers/RemoveSellerRoleModal";
import RestoreSellerRoleModal from "../components/sellers/RestoreSellerRoleModal";

const Sellers = () => {

    const [sellerStatus, setSellerStatus] = useState("approved");

    const [restoreOpen, setRestoreOpen] = useState(false);

    const [removeRoleOpen, setRemoveRoleOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [sellers, setSellers] = useState([]);

const [drawerOpen, setDrawerOpen] = useState(false);

const [suspendOpen, setSuspendOpen] = useState(false);

const [selectedSeller, setSelectedSeller] = useState(null);

const [reactivateOpen, setReactivateOpen] = useState(false);

const [search, setSearch] = useState("");
const [city, setCity] = useState("");

const [accountStatus, setAccountStatus] = useState("");

const [cities, setCities] = useState([]);

const [page, setPage] = useState(1);

const [pagination, setPagination] = useState({});

const fetchCities = async () => {

    try {

        const data = await getSellerCities();

        setCities(data);

    }

    catch (error) {

        console.error(error);

    }

};

    const fetchSellers = async () => {

        try {

            setLoading(true);

const data = await getSellers({
    search,
    city,
    accountStatus,
    sellerStatus,
    page,
});

setSellers(data.sellers);

setPagination(data.pagination);
        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

    fetchCities();

}, []);

   useEffect(() => {

    fetchSellers();

}, [search, city, accountStatus,page,sellerStatus]);

const handleSearch = (value) => {

    setSearch(value);

    setPage(1);

};

const handleCity = (value) => {

    setCity(value);

    setPage(1);

};

const handleStatus = (value) => {

    setAccountStatus(value);

    setPage(1);

};

    return (

        <div className="space-y-8">

<DataToolbar
    title="Seller Management"
    subtitle="Manage all approved sellers."
    loading={loading}
    search={search}
    onSearchChange={handleSearch}
    filters={[
        {
            name: "city",
            label: "City",
            value: city,
            onChange: handleCity,
            options: [

    {

        label: "All",

        value: "",

    },

    ...cities.map(city => ({

        label: city,

        value: city,

    })),

]
        },
        {
            name: "accountStatus",
            label: "Status",
            value: accountStatus,
            onChange: handleStatus,
            options: [
                { label: "All", value: "" },
                { label: "Active", value: "Active" },
                { label: "Suspended", value: "Suspended" },
                { label: "Deleted", value: "Deleted" },
            ],
        },
        {
    name: "sellerStatus",
    label: "Seller Status",
    value: sellerStatus,
    onChange: setSellerStatus,
    options: [
        {
            label: "Approved",
            value: "approved",
        },
        {
            label: "Revoked",
            value: "revoked",
        },
        {
            label: "All",
            value: "all",
        },
    ],
},
    ]}
/>
            <SellerStats

                sellers={sellers}

            />

<SellersTable
    sellers={sellers}
    refreshSellers={fetchSellers}
    onView={(seller) => {

        setSelectedSeller(seller);

        setDrawerOpen(true);

    }}

    onSuspend={(seller) => {

        setSelectedSeller(seller);

        setSuspendOpen(true);

    }}

onReactivate={(seller) => {
    setSelectedSeller(seller);
    setReactivateOpen(true);
}}

onRemoveRole={(seller) => {

    setSelectedSeller(seller);

    setRemoveRoleOpen(true);

}}

/>

<Pagination
    page={pagination.page || 1}
    pages={pagination.pages || 1}
    total={pagination.total || 0}
    limit={pagination.limit || 10}
    onPageChange={setPage}
/>

<SellerProfileDrawer

    open={drawerOpen}

    seller={selectedSeller}

    onClose={() => {

        setDrawerOpen(false);

        setSelectedSeller(null);

    }}

/>

<SuspendUserModal   

    open={suspendOpen}

    user={selectedSeller}

    onClose={() => {

        setSuspendOpen(false);

        setSelectedSeller(null);

    }}

    onUpdated={(updatedSeller) => {

        setSellers(prev =>

            prev.map(item =>

                item._id === updatedSeller._id

                    ? {

                        ...item,

                        ...updatedSeller,

                    }

                    : item

            )

        );

    }}

/>

<ReactivateUserModal
    open={reactivateOpen}
    user={selectedSeller}
    onClose={() => {
        setReactivateOpen(false);
        setSelectedSeller(null);
    }}
    onUpdated={(updatedSeller) => {
setSellers(prev =>
    prev.map(item =>
        item._id === updatedSeller._id
            ? {
                  ...item,
                  ...updatedSeller,
              }
            : item
    )
);
    }}
/>


<RemoveSellerRoleModal

    open={removeRoleOpen}

    seller={selectedSeller}

    onClose={() => {

        setRemoveRoleOpen(false);

        setSelectedSeller(null);

    }}

    onUpdated={() => {

        fetchSellers();

    }}

/>

<RestoreSellerRoleModal

    open={restoreOpen}

    seller={selectedSeller}

    onClose={() => {

        setRestoreOpen(false);

        setSelectedSeller(null);

    }}

    onUpdated={fetchSellers}

/>

        </div>

    );

};

export default Sellers;