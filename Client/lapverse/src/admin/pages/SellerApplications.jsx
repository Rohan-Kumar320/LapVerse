import { useEffect, useState, useCallback } from "react";
import { getSellerApplications } from "../services/adminSellerService";
import SellerApplicationsTable from "../components/sellerApplication/SellerApplicationsTable";
import SellerApplicationDetailsDrawer from "../components/sellerApplication/SellerApplicationDetailsDrawer";
import RejectSellerModal from "../components/sellerApplication/RejectSellerModal";
import ApproveSellerModal from "../components/sellerApplication/ApproveSellerModal";
import RestoreSellerRoleModal from "../components/sellers/RestoreSellerRoleModal";

const SellerApplications = () => {


    const [restoreOpen, setRestoreOpen] = useState(false);

    const [selectedApplication,setSelectedApplication]=useState(null);

const [detailsOpen,setDetailsOpen]=useState(false);

const [approveOpen,setApproveOpen]=useState(false);

const [rejectOpen,setRejectOpen]=useState(false);
    const [

        applications,

        setApplications,

    ] = useState([]);

    const [

        loading,

        setLoading,

    ] = useState(false);

    const [

        filters,

        setFilters,

    ] = useState({

        search: "",

        status: "",

    });

    const fetchApplications = useCallback(

        async () => {

            try {

                setLoading(true);

                const data =

                    await getSellerApplications(

                        filters

                    );

                setApplications(

                    data.applications || []

                );

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoading(false);

            }

        },

        [filters]

    );

    useEffect(() => {

        fetchApplications();

    }, [fetchApplications]);

    
    const pendingApplications = applications.filter(

    application =>

        application.status === "pending"

);

const applicationHistory = applications.filter(

    application =>

        application.status !== "pending"

);


    return (
        <>
{/* Pending */}

<div className="space-y-5">

    <div>

        <h2 className="text-2xl font-black text-slate-900">

            Pending Applications

        </h2>

        <p className="text-slate-500">

            Applications waiting for review

        </p>

    </div>

      <SellerApplicationsTable

    applications={pendingApplications}

    onView={(application)=>{

        setSelectedApplication(application);

        setDetailsOpen(true);

    }}

    onApprove={(application)=>{

        setSelectedApplication(application);

        setApproveOpen(true);

    }}

    onReject={(application)=>{

        setSelectedApplication(application);

        setRejectOpen(true);

    }}

    onRestore={(application) => {

    setSelectedApplication(application);

    setRestoreOpen(true);

}}

/>


</div>

{/* History */}

<div className="mt-12 space-y-5">

    <div>

        <h2 className="text-2xl font-black text-slate-900">

            Application History

        </h2>

        <p className="text-slate-500">

            Approved and rejected applications

        </p>

    </div>

            <SellerApplicationsTable

    applications={applicationHistory}

    onView={(application)=>{

        setSelectedApplication(application);

        setDetailsOpen(true);

    }}

    onApprove={(application)=>{

        setSelectedApplication(application);

        setApproveOpen(true);

    }}

    onReject={(application)=>{

        setSelectedApplication(application);

        setRejectOpen(true);

    }}

    onRestore={(application) => {

    setSelectedApplication(application);

    setRestoreOpen(true);

}}
    

/>


</div>

<SellerApplicationDetailsDrawer

    open={detailsOpen}

    application={selectedApplication}

    onClose={() => {

        setDetailsOpen(false);

        setSelectedApplication(null);

    }}

    onApprove={(application) => {

        setSelectedApplication(application);

        setDetailsOpen(false);

        setApproveOpen(true);

    }}

    onReject={(application) => {

        setSelectedApplication(application);

        setDetailsOpen(false);

        setRejectOpen(true);

    }}

/>

<ApproveSellerModal

    open={approveOpen}

    application={selectedApplication}

    onClose={() => {

        setApproveOpen(false);

        setSelectedApplication(null);

    }}

    onUpdated={(updatedApplication) => {

        setApplications(prev =>

            prev.map(item =>

                item._id === updatedApplication._id

                    ? updatedApplication

                    : item

            )

        );

    }}

/>

<RejectSellerModal

    open={rejectOpen}

    application={selectedApplication}

    onClose={() => {

        setRejectOpen(false);

        setSelectedApplication(null);

    }}

    onUpdated={(updatedApplication) => {

        setApplications(prev =>

            prev.map(item =>

                item._id === updatedApplication._id

                    ? updatedApplication

                    : item

            )

        );

    }}

/>

<RestoreSellerRoleModal

    open={restoreOpen}

    seller={selectedApplication}

    onClose={() => {

        setRestoreOpen(false);

        setSelectedApplication(null);

    }}

    onUpdated={() => {

        fetchApplications();

    }}

/>

</>
    );

};

export default SellerApplications;