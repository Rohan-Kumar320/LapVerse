import adminApi from "./adminApi";

export const getSellerApplications = async (params = {}) => {

    const { data } = await adminApi.get(

        "/seller/admin/applications",

        {

            params,

        }

    );

    return data;

};

export const getSellerApplication = async (id) => {

    const { data } = await adminApi.get(

        `/seller/admin/applications/${id}`

    );

    return data.application;

};

export const approveSellerApplication = async (id) => {

    const { data } = await adminApi.put(

        `/seller/admin/applications/${id}/approve`

    );

    return data.application;

};

export const rejectSellerApplication = async (

    id,

    reason

) => {

    const { data } = await adminApi.put(

        `/seller/admin/applications/${id}/reject`,

        {

            reason,

        }

    );

    return data.application;

};


export const getSellers = async (params = {}) => {

    const { data } = await adminApi.get(
        "/admin/sellers",
        {
            params,
        }
    );

    return data;

};

export const getSellerCities = async () => {

    const { data } = await adminApi.get(

        "/admin/sellers/cities"

    );

    return data.cities;

};

export const removeSellerRole = async (id, reason) => {

    const { data } = await adminApi.put(

        `/seller/admin/${id}/remove-role`,

        {

            reason,

        }

    );

    return data.user;

};

export const restoreSellerRole = async (
    id,
    reason
) => {

    const { data } = await adminApi.put(

        `/seller/admin/applications/${id}/restore-role`,

        { reason }

    );
    return data.seller;

};