import cx from 'clsx';
import { useForm, FieldValues } from 'react-hook-form';
import useActivityId from '@hooks/useActivityId';
import useInTranscation from '@hooks/useInTranscation';
import { usePoapConfig, handleClaim as _handleClaim, getTransaction } from '@services/poap';
import { showModal, hideModal } from '@components/showModal';
import { useCallback } from 'react';
import { getHash } from '@services/poap/getHash';

interface ModalContentProps {
  activityId: string;
}

const ModalContent: React.FC<ModalContentProps> = ({ activityId }) => {
  const {
    register,
    handleSubmit: withForm,
    formState: { errors },
  } = useForm();
  const { inTranscation, execTranscation: handleClaim } = useInTranscation(_handleClaim);

  const handleSubmit = useCallback(async (data: FieldValues) => {
    const { command } = data;
    await handleClaim({ activityId, command });
    hideModal();
  }, []);
  return (
    <form onSubmit={withForm((data) => handleSubmit(data))} className="flex flex-col items-center px-[20px] md:px-[24px]">
      <div className="mt-[16px] md:mt-[16px] mb-[48px] md:mb-[24px] text-[32px] md:text-[20px] leading-[40px] md:leading-[28px] font-medium text-[#05001F]">请输入领取口令</div>
      <input
        {...register('command', { required: true })}
        className={cx(
          'py-[30px] md:py-[15px] md:px-[12px] w-full border-[1.36px] md:border-[1px] border-[#E6E6E9] rounded-[8px] md:rounded-[4px] text-[#37334C] text-[32px] md:text-[16px] leading-[40px] md:leading-[22px] text-center font-semibold',
          errors.command?.type === 'required' && 'border-red-500'
        )}
      />
      <button className="mt-[48px] md:mt-[32px] mb-[32px] md:mb-[32px] flex justify-center items-center h-[104px] md:h-[54px] w-full bg-[#6953EF] rounded-[8px] md:rounded-[4px] text-[32px] md:text-[16px] font-medium leading-[40px] md:leading-[22px] text-[#ffffff]">
        {inTranscation ? '领取中...' : '确认'}
      </button>
    </form>
  );
};

export const ClaimButton: React.FC<{ commandNeeded: boolean }> = ({ commandNeeded }) => {
  const activityId = useActivityId()!;
  const { value: poapConf, loading } = usePoapConfig(activityId);
  const { inTranscation, execTranscation: handleClaim } = useInTranscation(_handleClaim);
  const handleOnClaim = useCallback(() => {
    if (commandNeeded) {
      showModal({ content: <ModalContent activityId={activityId} />, className: 'top-[22%] md:top-0 w-[654px] md:w-[480px] max-w-[654px] md:max-w-[480px]' });
      return;
    }
    handleClaim({ activityId }).then(() => {
      let id = getTransaction()?.id;
      localStorage.setItem('claim_id', id !== undefined ? id.toString() : '');
      const getHashURL = setInterval(() => {
        getHash({ activityId, id: localStorage.getItem('claim_id') })
          .then((res: any) => {
            if (res.hash) {
              localStorage.setItem('hash', res.hash);
              clearInterval(getHashURL);
            }
          }).catch(() => {
            clearInterval(getHashURL);
          })
      }, 3000)
      return () => { clearInterval(getHashURL) };
    });
  }, [commandNeeded]);

  return (
    <button
      onClick={handleOnClaim}
      className={cx(
        'mt-[60px] md:mt-[24px] flex justify-center items-center h-[104px] md:h-[54px] w-[654px] md:w-[300px] bg-[#6953EF] rounded-[8px] md:rounded-[4px] text-[32px] md:text-[16px] font-medium leading-[40px] md:leading-[22px] text-[#ffffff]',
        //TODO:comment 2 lines below to test command button
        (loading || !(poapConf && poapConf?.count && (poapConf.count > 0 || poapConf.count === -1))) && 'opacity-30 pointer-events-none',
        inTranscation && 'pointer-events-none'
      )}
    >
      {loading ? '获取数据中...' : inTranscation ? '领取中...' : '领取'}
    </button>
  );
};
