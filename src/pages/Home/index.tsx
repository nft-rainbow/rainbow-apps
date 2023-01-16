import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import cx from 'clsx';
import ClipBoard from '@assets/clipboard.svg';
import useClipboard from 'react-use-clipboard';
import useActivityId from '@hooks/useActivityId';
import useInTranscation from '@hooks/useInTranscation';
import { usePoapConfig, handleClaim as _handleClaim } from '@services/poap';
import { transferDate } from '@utils/transferDate';
import AuthConnectButton from '@modules/AuthConnectButton';
import { ShareButton } from '@modules/ShareButton';
import Spin from '@components/Spin';
import Tooltip from '@components/Tooltip';

const Home: React.FC = () => {
  const activityId = useActivityId()!;
  const { value: poapConf, loading } = usePoapConfig(activityId);
  const [isCopied, copy] = useClipboard('poapConf?.contract_address' ?? '', { successDuration: 1000 });

  return (
    <div className="px-[48px] pt-[42px] flex flex-col justify-start">
      <div className="relative w-[654px] h-[654px]">
        {loading && (
          <div className="absolute w-[654px] h-[654px] border-[8px] border-[#ffffff] pointer-events-none">
            <Spin className="absolute text-[60px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        )}
        {!loading && poapConf?.activity_picture_url && (
          <img
            alt="activity picture"
            src={poapConf.activity_picture_url}
            className="absolute w-[654px] h-[654px] border-[8px] border-[#ffffff] pointer-events-none"
            draggable={false}
          />
        )}
        {/* <div className="m-[24px] px-[16px] min-w-[140px] inline-flex flex-row justify-center items-center h-[48px] rounded-tl-[24px] rounded-tr-[4px] rounded-br-[24px] rounded-bl-[4px] text-[24px] leading-[32px] text-[#FFFFFF] bg-[#05001F] opacity-70">
          {loading ? '...' : !poapConf?.max_mint_count || poapConf.max_mint_count === -1 ? '不限量' : poapConf?.max_mint_count}
        </div> */}
      </div>
      <div className="mt-[42px] flex flex-row w-fit h-[40px] text-[26px] leading-[34px]">
        <div className="px-[12px] flex flex-row justify-center items-center h-[40px] rounded-tl-[20px] rounded-bl-[4px] bg-[#6953EF] text-[#ffffff]">已领取</div>
        <div className="px-[12px] flex flex-row justify-center items-center min-w-[102px] h-[40px] border border-[#6953EF] rounded-tr-[4px] rounded-br-[20px] text-center align-middle text-[#6953EF]">
          {loading ? '...' : poapConf?.mintedCount}
        </div>
      </div>
      <p className="mt-[24px] text-[28px] leading-[36px] font-medium text-[#37334C]">合约地址</p>
      <div className="mt-[12px] flex flex-row items-center text-[#696679]">
        <p className="text-[24px] leading-[32px]">{loading ? '...' : `${poapConf?.contract_address}`}</p>

        {!loading && poapConf?.contract_address && (
          <Tooltip content="复制成功" visible={isCopied}>
            <img src={ClipBoard} alt="clipboard logo" className="ml-[8px] w-[32px] h-[32px] cursor-pointer" onClick={copy} />
          </Tooltip>
        )}
      </div>

      <p className="mt-[42px] text-[40px] leading-[48px] font-semibold text-[#05001F]">{loading ? '...' : poapConf?.name}</p>
      <p className="mt-[24px] flex flex-col text-[28px] text-[#696679] leading-[36px] desc" dangerouslySetInnerHTML={{ __html: loading ? '...' : poapConf?.description ?? '' }}></p>
      <p className="mt-[24px] text-[24px] leading-[32px] text-[#696679]">
        开始时间: <span>{loading ? '...' : !poapConf?.start_time || poapConf?.start_time == -1 ? '不限' : transferDate(poapConf.start_time)}</span>
      </p>
      {(loading || poapConf?.end_time) && (
        <p className="text-[24px] leading-[32px] text-[#696679]">
          结束时间: <span>{loading ? '...' : !poapConf?.end_time || poapConf?.end_time == -1 ? '不限' : transferDate(poapConf.end_time)}</span>
        </p>
      )}
      <p className="mt-[32px] text-[28px] leading-[32px] text-[#37334C] align-middle">
        可领取 <span className="text-[#6953EF] font-medium mx-[2px]">{loading ? '...' : !!poapConf && poapConf.count && poapConf.count > 0 ? poapConf.count : 0}</span> 次
      </p>

      <div className="flex flex-col items-center">
        <AuthConnectButton type="rectangle">
          <ClaimButton />
        </AuthConnectButton>
        <ShareButton type="home" />
        <a href={'https://app.anyweb.cc/#/pages/index/home'} target="_blank" className="mt-[42px] text-[28px] leading-[36px] text-[#6953EF] border-b-2 border-[#6953EF]">
          去 Anyweb 查看&gt;
        </a>
      </div>
    </div>
  );
};

const ClaimButton: React.FC = () => {
  const activityId = useActivityId()!;
  const { value: poapConf, loading } = usePoapConfig(activityId);
  const navigate = useNavigate();

  const { inTranscation, execTranscation: handleClaim } = useInTranscation(_handleClaim);
  return (
    <button
      onClick={() => handleClaim({ activityId, navigate })}
      className={cx(
        'mt-[60px] flex justify-center items-center h-[104px] w-[654px] bg-[#6953EF] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#ffffff]',
        (loading || !(poapConf && poapConf?.count && poapConf.count > 0)) && 'opacity-30 pointer-events-none',
        inTranscation && 'pointer-events-none'
      )}
    >
      {loading ? '获取数据中...' : inTranscation ? '领取中...' : '领取'}
    </button>
  );
};

export default Home;
