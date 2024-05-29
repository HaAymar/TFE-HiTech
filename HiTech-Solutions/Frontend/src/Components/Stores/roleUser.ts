import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const userRoleState = atom({
	key: "userRoleState",
	default: "",
	effects_UNSTABLE: [persistAtom],
});
