import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const studentIdRoleState = atom({
	key: "studentIdRoleState",
	default: "",
	effects_UNSTABLE: [persistAtom],
});
