import axios from "axios";
import { backend } from "./api";

const getUser = async (token:string) => {
    const response = await axios.get(`${backend}/api/user/get-user`, {
        headers: {
            "Content-Type" : "application/json" ,
            Authorization: `Bearer ${token}`
        }
    });

    const data = response.data;

    return data.user;
}

export { getUser };
