import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userNameState = atom({
	key: "userNameState",
	default: "",
	effects_UNSTABLE: [persistAtom],
});
