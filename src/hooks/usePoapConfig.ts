import { atom, useRecoilValue, useRecoilState } from "recoil";

export interface PoapConfig {
	cover: any;
	claimed: string;
	address: string;
	name: string;
	description: string;
	date: string;
	endData?: string;
	limitation?: number;
	link: string;
	available: number;
}

const poapConfig = atom<PoapConfig | null>({
	key: "poapConfig",
	default: null,
});
