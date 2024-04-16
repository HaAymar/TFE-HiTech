import { atom, RecoilState } from "recoil";

// Définissez l'état userIdState pour stocker l'identifiant de l'utilisateur
export const userIdState: RecoilState<number | null> = atom({
	key: "userIdState",
	default: (() => {
		const item = localStorage.getItem("userId");
		return item ? parseInt(item, 10) : null;
	})(),
	effects_UNSTABLE: [
		({ onSet, setSelf }) => {
			onSet((newValue) => {
				console.log(`setUserId: ${newValue}`); // Affiche la nouvelle valeur dans la console
				if (newValue !== null) {
					localStorage.setItem("userId", newValue.toString());
				} else {
					localStorage.removeItem("userId");
				}
			});
			// Si nécessaire, vous pouvez utiliser setSelf ici pour initialiser ou réinitialiser l'état
		},
	],
});
