import { Link } from 'react-router-dom';
import isMobile from '@utils/isMobile';
import { QRCodeSVG } from 'qrcode.react';
import WeChatIcon from '@assets/weChat.svg';
import { showModal } from '@components/showModal';
import { useCallback } from 'react';
import { isProduction } from '@utils/consts';

const ModalContent: React.FC<{ activityId: string }> = ({ activityId }) => {
  const link = isProduction ? `https://apps.nftrainbow.cn/?activity_id=${activityId}` : `http://devapps.nftrainbow.cn/?activity_id=${activityId}`;
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-[8px] flex flex-row justify-center">
        <img src={WeChatIcon} className="w-[28px] md:w-[28px] h-[28px] md:h-[28px] mr-[10px] md:mr-[10px]" />
        <span>微信扫一扫</span>
      </div>
      <QRCodeSVG value={link} className="w-[192px] md:w-[192px] h-[192px] md:h-[192px] md:mb-[30px]" />
    </div>
  );
};

const ShareButton: React.FC<{ activityId: string }> = ({ activityId }) => {
  const handleShare = useCallback(() => {
    showModal({ content: <ModalContent activityId={activityId} />, className: 'w-[320px] md:w-[320px]' });
  }, []);
  
  if (isMobile) {
    return (
      <Link
        to={`share/?activity_id=${activityId}`}
        className="mt-[24px] md:mt-[12px] flex justify-center items-center h-[104px] md:h-[54px] w-[654px] md:w-[300px] border border-[#6953EF] rounded-[8px] md:rounded-[4px] text-[32px] md:text-[16px] font-medium leading-[40px] md:leading-[22px] text-[#6953EF]"
      >
        分享
      </Link>
    );
  } else {
    return (
      <button
        onClick={handleShare}
        className="mt-[24px] md:mt-[12px] flex justify-center items-center h-[104px] md:h-[54px] w-[654px] md:w-[300px] border border-[#6953EF] rounded-[8px] md:rounded-[4px] text-[32px] md:text-[16px] font-medium leading-[40px] md:leading-[22px] text-[#6953EF]"
      >
        分享
      </button>
    );
  }
};

export default ShareButton;
