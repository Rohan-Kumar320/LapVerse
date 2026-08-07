import adminApi from "./adminApi";

export const getUsers = async (params = {}) => {

    const { data } = await adminApi.get(

        "/admin/users",

        {

            params,

        }

    );

    return data;

};

export const getUserDetails = async (id) => {

  const { data } = await adminApi.get(
    `/admin/users/${id}`
  );

  return data.user;

};

export const updateUser = async (

    id,

    userData

) => {

    const { data } = await adminApi.put(

        `/admin/users/${id}`,

        userData

    );

    return data.user;

};


export const updateUserAvatar = async (

    id,

    imageFile

) => {

    const formData = new FormData();

    formData.append(

        "avatar",

        imageFile

    );

    const { data } = await adminApi.put(

        `/admin/users/${id}/avatar`,

        formData,

        {

            headers: {

                "Content-Type":

                    "multipart/form-data",

            },

        }

    );

    return data.user;

};

export const suspendUser = async (

    id,

    suspensionData

)=>{

    const {data}=await adminApi.put(

        `/admin/users/${id}/suspend`,

        suspensionData

    );

    return data.user;

};

export const reactivateUser = async(id)=>{

    const {data}=await adminApi.put(

        `/admin/users/${id}/reactivate`

    );

    return data.user;

};

export const deleteUser = async (id) => {

    const { data } = await adminApi.put(

        `/admin/users/${id}/delete`

    );

    return data.user;

};

export const restoreUser = async (id) => {

    const { data } = await adminApi.put(

        `/admin/users/${id}/restore`

    );

    return data.user;

};