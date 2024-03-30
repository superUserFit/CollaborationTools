import { atom } from "recoil";
import Cookies from "js-cookies";

const tokenAtom = atom({
	key: "tokenAtom",
	default: JSON.parse(Cookies.getItem("Infollective")),
});

export default tokenAtom;
