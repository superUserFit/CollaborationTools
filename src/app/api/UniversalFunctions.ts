import axios from "axios";
import { backend } from "./api";
import useShowToast from "../hooks/useShowToast";


const getUser = async (token:string) => {
    const showToast = useShowToast();
    try {
        const response = await axios.get(`${backend}/api/user/get-user`, {
            headers: {
                "Content-Type" : "application/json" ,
                Authorization: `Bearer ${token}`
            }
        });

        const data = response.data;
        return data.user;
    } catch (error) {
        console.error(error);
        showToast('Error', 'Error while fetching user', 'error');
    }
}

export { getUser };
