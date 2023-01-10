import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
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
	sharer?: string;
	poapDetail: any;
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
	poapDetail: null,
	available: 1,
};

export const poapConfigState = atom<PoapConfig>({
	key: "poapConfigState",
	default: PoapConfigDefault,
});

export const useGetPoapConfig = () => {
	const setPoapConfigState = useSetRecoilState(poapConfigState);
	const [searchParams, setSearchParams] = useSearchParams();
	const account = useAccount();
	//TODO: TO BE CORRECTED
	const activityId = searchParams.get("activity_id");
	// const sharer = searchParams.get("sharer");
	const setConfig = useCallback(async (activityId: string | number) => {
		try {
			const res1: any = await fetchApi({
				path: `poap/activity/${activityId}`,
				method: "GET",
			});
			const res2: any = await fetchApi({
				path: `poap/count/${account}/${activityId}`,
				method: "GET",
			});
			Promise.all([res1, res2]).then((res: any) => {
				//TODO:
				if (!res || res.code || res.code == 0) return;
				debugger;
				setPoapConfigState({
					cover: res[0].activity_picture_url,
					limitation: res[0].max_mint_count,
					claimed: res[0].amount,
					address: res[0].contract_address,
					name: res[0].name,
					description: res[0].description,
					date: res[0].start_time,
					endData: res[0].end_time,
					link: "https://app.anyweb.cc/#/pages/index/home",
					poapDetail: res[0],
					available: res[1].count,
					// sharer: sharer ?? "",
				});
			});
		} catch (err) {
			console.log(err);
		}
	}, []);
	useEffect(() => {
		//TODO: setConfig(activityId)
		setConfig(4);
	}, [account, activityId]);
};

export const usePoapConfig = () => {
	useRecoilValue(poapConfigState);
};
