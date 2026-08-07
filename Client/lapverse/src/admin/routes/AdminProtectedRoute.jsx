import {

    Navigate,

} from "react-router-dom";

import {

    useAdmin,

} from "../context/AdminContext";

const AdminProtectedRoute = ({

    children,

}) => {

    const {

        isAuthenticated,

        loading,

    } = useAdmin();

    if (loading)

        return null;

    if (!isAuthenticated)

        return (

            <Navigate

                to="/admin/login"

                replace

            />

        );

    return children;

};

export default AdminProtectedRoute;