import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const teacherIdRoleState = atom({
	key: "teacherIdRoleState",
	default: "",
	effects_UNSTABLE: [persistAtom],
});
