import { atom } from "recoil";

const userAtom = atom({
    key: "userAtom",
    default: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        role: ''
    }
});

export default userAtom;