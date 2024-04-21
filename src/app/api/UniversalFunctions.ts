import axios from './api';

const getUser = async (token:string) => {
    const response = await axios.get(`/user/get-user`, {
        headers: {
            "Content-Type" : "application/json" ,
            Authorization: `Bearer ${token}`
        }
    });

    const data = response.data;

    return data.user;
}

export { getUser };
