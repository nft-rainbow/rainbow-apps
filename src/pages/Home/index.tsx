import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import cx from 'clsx';
import ClipBoard from '@assets/clipboard.svg';
import useClipboard from 'react-use-clipboard';
import useActivityId from '@hooks/useActivityId';
import useInTranscation from '@hooks/useInTranscation';
import { useRefreshPoapConfig, usePoapConfig, handleClaim as _handleClaim } from '@services/poap';
import AuthConnectButton from '@modules/AuthConnectButton';
import { ShareButton } from '@modules/ShareButton';
import Tooltip from '@components/Tooltip';

const ClaimButton: React.FC<{ poapConf: ReturnType<typeof usePoapConfig> }> = ({ poapConf }) => {
  const activityId = useActivityId()!;
  const navigate = useNavigate();
  const refreshPoapConfig = useRefreshPoapConfig(activityId);

  const { inTranscation, execTranscation: handleClaim } = useInTranscation(_handleClaim);
  return (
    <button
      onClick={() => handleClaim({ activityId, navigate, refreshPoapConfig })}
      className={cx(
        'mt-[60px] flex justify-center items-center h-[104px] w-[654px] bg-[#6953EF] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#ffffff]',
        !(poapConf && poapConf?.count > 0) && 'opacity-30 pointer-events-none',
        inTranscation && 'pointer-events-none'
      )}
    >
      {inTranscation ? '领取中...' : '领取'}
    </button>
  );
};

const Home: React.FC = () => {
  const activityId = useActivityId()!;
  const poapConf = usePoapConfig(activityId);
  const [isCopied, copy] = useClipboard(poapConf?.contract_address ?? '', { successDuration: 1000 });

  const transferDate = useCallback((timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`
  }, [])

  return (
    <div className="px-[48px] pt-[42px] flex flex-col justify-start">
      <div className="relative w-[654px] h-[654px]">
        <img
          alt="activity picture"
          src={poapConf?.activity_picture_url}
          className="absolute w-[654px] h-[654px] border-[8px] border-[#ffffff] pointer-events-none"
          draggable={false}
        />
        <div className="m-[24px] px-[16px] flex flex-row justify-center items-center w-fit h-[48px] rounded-tl-[24px] rounded-tr-[4px] rounded-br-[24px] rounded-bl-[4px] text-[24px] leading-[32px] text-[#FFFFFF] bg-[#05001F] opacity-70">
          {(!poapConf?.max_mint_count || poapConf.max_mint_count === -1) ? '不限量' : poapConf?.max_mint_count}
        </div>
      </div>
      <div className="mt-[42px] flex flex-row w-fit h-[40px] text-[26px] leading-[34px]">
        <div className="px-[12px] flex flex-row justify-center items-center h-[40px] rounded-tl-[20px] rounded-bl-[4px] bg-[#6953EF] text-[#ffffff]">已领取</div>
        <div className="px-[12px] flex flex-row justify-center items-center min-w-[102px] h-[40px] border border-[#6953EF] rounded-tr-[4px] rounded-br-[20px] text-center align-middle text-[#6953EF]">
          {poapConf?.mintedCount}
        </div>
      </div>
      <p className="mt-[24px] text-[28px] leading-[36px] font-medium text-[#37334C]">合约地址</p>
      <div className="mt-[12px] flex flex-row items-center text-[#696679]">
        <p className="text-[24px] leading-[32px]">{poapConf?.contract_address}</p>
        <Tooltip content="复制成功" visible={isCopied}>
          <img src={ClipBoard} alt="clipboard logo" className="ml-[8px] w-[32px] h-[32px] cursor-pointer" onClick={copy} />
        </Tooltip>
      </div>
      <p className="mt-[42px] text-[40px] leading-[48px] font-semibold text-[#05001F]">{poapConf?.name}</p>
      <p className="mt-[24px] text-[28px] text-[#696679] leading-[36px]" dangerouslySetInnerHTML={{ __html: poapConf?.description ?? '' }}></p>
      <p className="mt-[24px] text-[24px] leading-[32px] text-[#696679]">
        开始时间: <span>{(!poapConf?.start_time || poapConf?.start_time == -1) ? '不限' : transferDate(poapConf.start_time)}</span>
      </p>
      {poapConf?.end_time && (
        <p className="text-[24px] leading-[32px] text-[#696679]">
          结束时间: <span>{(!poapConf?.end_time || poapConf?.end_time == -1) ? '不限' : transferDate(poapConf.end_time)}</span>
        </p>
      )}
      <p className="mt-[32px] text-[28px] leading-[32px] text-[#37334C] align-middle">
        可领取 <span className="text-[#6953EF] font-medium">{!!poapConf && poapConf.count > 0 ? poapConf.count : 0}</span> 次
      </p>
      <div className="flex flex-col items-center">
        <AuthConnectButton type="rectangle">
          <ClaimButton poapConf={poapConf} />
        </AuthConnectButton>
        <ShareButton type="home" />
        <a href={'https://app.anyweb.cc/#/pages/index/home'} target="_blank" className="mt-[42px] text-[28px] leading-[36px] text-[#6953EF] border-b-2 border-[#6953EF]">
          去 Anyweb 查看&gt;
        </a>
      </div>
    </div>
  );
};
export default Home;
