import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { atom, useSetRecoilState } from "recoil";
import { setRecoil } from "recoil-nexus";
import { fetchApi } from "@utils/fetch/fetchApi";
import Cover from "@assets/cover.png";
import { useAccount } from "@services/account";

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
	command?: string;
	sharer?: "";
}

//TODO: TODELETE
const PoapConfigDefault = {
	cover: Cover,
	claimed: "100,123",
	address: "cfx:acc0kdpwsfj6uc2bx6hxfu972jkej96wxu4fvsaa4s",
	name: "大展鸿🐰 - 新年元素",
	description:
		"这里是 Desc：每天免费领取 1 个，邀请好友还..集齐 5 款不同的新年元素，可合成典藏款 POAP ",
	date: "2021.01.16",
	endData: "2023.01.22",
	link: "https://app.anyweb.cc/#/pages/index/home",
	available: 3,
};

export const poapConfigState = atom<PoapConfig>({
	key: "poapConfigState",
	default: PoapConfigDefault,
});

export const usePoapConfig = () => {
	const setPoapConfigState = useSetRecoilState(poapConfigState);
	const [searchParams, setSearchParams] = useSearchParams();
	const account = useAccount();
	//TODO: TO BE CORRECTED
	const activityId = searchParams.get("activity_id");
	const sharer = searchParams.get("sharer");
	const setConfig = useCallback(async (activityId: string) => {
		try {
			const res: any = await fetchApi({
				path: `poap/activity/${activityId}`,
				method: "GET",
				params: { id: activityId },
			});
			const resAccount: any = await fetchApi({
				path: `poap/count/${account}/${activityId}`,
				method: "GET",
				params: { activity_id: activityId, address: account },
			});
			if (res.code !== 200||resAccount!==200) return;
			setPoapConfigState({
				cover: res.metadata_uri,
				claimed: res.amount,
				address: res.contract_address,
				name: res.name,
				description: res.description,
				date: res.start_time,
				endData: res.end_time,
				link: "https://app.anyweb.cc/#/pages/index/home",
				available: resAccount.count,
			});
		} catch (err) {
			console.log(err);
		}
	}, []);
	useEffect(() => {}, []);
};
