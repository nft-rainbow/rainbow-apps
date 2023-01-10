import React, { useCallback, useEffect } from "react"
import { fetchApi } from "@utils/fetch/fetchApi"
import { usePoapConfig } from "@hooks/usePoapConfig"
const HomeShareButton: React.FC = () => {
  return <button className="mt-[24px] flex justify-center items-center h-[104px] w-[654px] border border-[#6953EF] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#6953EF]">分享</button>
}
const SuccessShareButton: React.FC = () => {
  return <button className="mt-[24px] flex justify-center items-center h-[104px] w-[654px] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#ffffff] bg-[#6953EF]">分享</button>
}

const ShareButtonDic = {
  "home": HomeShareButton,
  "success": SuccessShareButton
}

export const ShareButton: React.FC<{ type: "home" | "success" }> = ({ type }) => {
  const { poapDetail } = usePoapConfig()
  const postNewYear = async () => {
    try {
      const res = await fetchApi({
        path: 'poap/config',
        method: 'POST',
        params: {
          ...poapDetail
        }
      })
      console.log('res', res)
    } catch (err) {
      console.log(err)
    }
    debugger
  }
  useEffect(() => {
    postNewYear();
  }, [poapDetail])
  const ShareBtn = ShareButtonDic[type]
  return <><ShareBtn /></>
}