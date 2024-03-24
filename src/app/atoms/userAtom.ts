import { atom } from "recoil";
import Cookies from "js-cookies";

const userAtom = atom({
	key: "userAtom",
	default: JSON.parse(Cookies.getItem("Infollective")),
});

export default userAtom;
