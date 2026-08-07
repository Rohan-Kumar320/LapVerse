import axios from "axios";

const API = axios.create({

    baseURL:
        import.meta.env.VITE_API_URL,

});

export const adminLogin = async (
    credentials
) => {

    const { data } = await API.post(

        "/admin/login",

        credentials

    );

    return data;

};