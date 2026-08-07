import {

    createContext,

    useContext,

    useEffect,

    useState,

} from "react";

import { adminLogin } from "../services/adminAuthService";

const AdminContext = createContext();

export const AdminProvider = ({

    children,

}) => {

    const [

        admin,

        setAdmin,

    ] = useState(null);

    const [

        loading,

        setLoading,

    ] = useState(true);

    useEffect(() => {

        const token =

            localStorage.getItem(

                "adminToken"

            );

        const savedAdmin =

            localStorage.getItem(

                "admin"

            );

        if (

            token &&

            savedAdmin

        ) {

            setAdmin(

                JSON.parse(savedAdmin)

            );

        }

        setLoading(false);

    }, []);

    const login = async (

        credentials

    ) => {

        const data =

            await adminLogin(

                credentials

            );

        localStorage.setItem(

            "adminToken",

            data.token

        );

        localStorage.setItem(

            "admin",

            JSON.stringify(

                data.admin

            )

        );

        setAdmin(

            data.admin

        );

        return data;

    };

    const logout = () => {

        localStorage.removeItem(

            "admin"

        );

        localStorage.removeItem(

            "adminToken"

        );

        setAdmin(null);

    };

    return (

        <AdminContext.Provider

            value={{

                admin,

                login,

                logout,

                loading,

                isAuthenticated:

                    !!admin,

            }}

        >

            {children}

        </AdminContext.Provider>

    );

};

export const useAdmin = () =>

    useContext(AdminContext);