import { atom } from "recoil";
import Cookies from "js-cookies";

const tokenAtom = atom({
	key: "tokenAtom",
	default: Cookies.getItem("Infollective")
});

export default tokenAtom;
