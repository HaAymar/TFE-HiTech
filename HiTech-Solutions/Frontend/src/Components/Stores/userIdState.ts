import { atom, RecoilState } from "recoil";

export const userIdState: RecoilState<number | null> = atom({
	key: "userIdState",
	default: (() => {
		const item = localStorage.getItem("userId");
		return item ? parseInt(item, 10) : null;
	})(),
	effects_UNSTABLE: [
		({ onSet, setSelf }) => {
			onSet((newValue) => {
				console.log(`setUserId: ${newValue}`);
				if (newValue !== null) {
					localStorage.setItem("userId", newValue.toString());
				} else {
					localStorage.removeItem("userId");
				}
			});
		},
	],
});
