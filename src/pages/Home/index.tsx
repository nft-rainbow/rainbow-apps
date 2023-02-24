import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import ClipBoard from '@assets/clipboard.svg';
import useClipboard from 'react-use-clipboard';
import useActivityId from '@hooks/useActivityId';
import { usePoapConfig } from '@services/poap';
import { transferDate } from '@utils/transferDate';
import AuthConnectButton from '@modules/AuthConnectButton';
import { ClaimButton } from './ClaimButton';
import Tooltip from '@components/Tooltip';
import Spin from '@components/Spin';
import Label from '@components/Label';

const Home: React.FC = () => {
  const activityId = useActivityId()!;
  const { value: poapConf, loading } = usePoapConfig(activityId);
  const [isCopied, copy] = useClipboard(poapConf?.contract_address ?? '', { successDuration: 1000 });

  return (
    <div className="px-[48px] pt-[42px] flex flex-col items-start md:items-center">
      <div className="relative w-[654px] md:w-[300px] h-[654px] md:h-[300px]">
        {loading && (
          <div className="absolute w-[654px] md:w-[300px] h-[654px] md:h-[300px] border-[8px] border-[#ffffff] pointer-events-none">
            <Spin className="absolute text-[60px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        )}
        {!loading && poapConf?.activity_picture_url && (
          <img
            alt="activity picture"
            src={poapConf.activity_picture_url}
            className="absolute w-[654px] md:w-[300px] h-[654px] md:h-[300px] border-[8px] md:border-[4px] border-[#ffffff] pointer-events-none"
            draggable={false}
          />
        )}
        {loading ? '...' : !poapConf?.amount || poapConf.amount === -1 ? <Label /> : <Label amount={poapConf.amount} />}
      </div>
      <div className="mt-[42px] md:mt-[25px] flex flex-row w-fit h-[40px] md:h-[30px] text-[26px] md:text-[16px] leading-[34px] md:leading-[28px]">
        <div className="px-[12px] md:px-[8px] flex flex-row justify-center items-center h-[40px] md:h-[30px] rounded-tl-[20px] md:rounded-tl-[15px] rounded-bl-[4px] md:rounded-bl-[2px] bg-[#6953EF] text-[#ffffff]">
          已领取
        </div>
        <div className="px-[12px] md:px-[8px] flex flex-row justify-center items-center min-w-[102px] md:min-w-[64px] h-[40px] md:h-[30px] border border-[#6953EF] rounded-tr-[4px] md:rounded-tr-[2px] rounded-br-[20px] md:rounded-br-[15px] text-center align-middle text-[#6953EF]">
          {loading ? '...' : poapConf?.mintedCount}
        </div>
      </div>
      <div className="md:mt-[13px] flex flex-col md:flex-row">
        <p className="mt-[24px] md:mt-[0px] text-[28px] md:text-[14px] leading-[36px] md:leading-[18px] font-medium md:font-normal text-[#37334C] md:text-[#696679]">合约地址</p>
        <div className="mt-[12px] md:mt-[0px] flex flex-row items-center text-[#696679] md:text-[14px] md:leading-[18px]">
          <p className="text-[24px] md:text-[14px] leading-[32px] md:leading-[18px]">{loading ? '...' : `${poapConf?.contract_address}`}</p>

          {!loading && poapConf?.contract_address && (
            <Tooltip content="复制成功" visible={isCopied}>
              <img src={ClipBoard} alt="clipboard logo" className="ml-[8px] w-[32px] md:w-[16px] h-[32px] md:h-[16px] cursor-pointer" onClick={copy} />
            </Tooltip>
          )}
        </div>
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
        可领取{' '}
        <span className="text-[#6953EF] font-medium mx-[2px]">{loading ? '...' : !!poapConf && poapConf.count && poapConf.count === -1 ? '无限' : poapConf?.count ?? 0}</span> 次
      </p>
      <div className="flex flex-col items-center">
        <AuthConnectButton type="rectangle">
          <ClaimButton commandNeeded={!!poapConf?.command_needed} />
        </AuthConnectButton>
        <Link
          to={`share/?activity_id=${activityId}`}
          className="mt-[24px] flex justify-center items-center h-[104px] w-[654px] border border-[#6953EF] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#6953EF]"
        >
          分享
        </Link>
        <a href={'https://app.anyweb.cc/#/pages/index/home'} target="_blank" className="mt-[42px] text-[28px] leading-[36px] text-[#6953EF] border-b-2 border-[#6953EF]">
          去 Anyweb 查看&gt;
        </a>
      </div>
    </div>
  );
};

export default Home;
