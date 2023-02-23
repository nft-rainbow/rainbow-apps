import { useNavigate } from 'react-router-dom';
import cx from 'clsx';
import { useForm, FieldValues } from 'react-hook-form';
import useActivityId from '@hooks/useActivityId';
import useInTranscation from '@hooks/useInTranscation';
import { usePoapConfig, handleClaim as _handleClaim } from '@services/poap';
import { showModal, hideModal } from '@components/showModal';
import { useCallback } from 'react';

const ModalContent: React.FC = () => {
  const {
    register,
    handleSubmit: withForm,
    formState: { errors },
  } = useForm();
  const activityId = useActivityId()!;
  const { value: poapConf, loading } = usePoapConfig(activityId);
  const navigate = useNavigate();
  const { inTranscation, execTranscation: handleClaim } = useInTranscation(_handleClaim);

  const handleSubmit = useCallback(async (data: FieldValues) => {
    const { command } = data;
    await handleClaim({ activityId, navigate, command });
    hideModal();
  }, []);
  return (
    <form onSubmit={withForm((data) => handleSubmit(data))} className="flex flex-col items-center px-[20px]">
      <div className="mt-[16px] mb-[48px] text-[32px] leading-[40px] font-medium">请输入领取口令</div>
      <input
        {...register('command', { required: true })}
        className={cx(
          'py-[30px] w-full border-[1.36px] border-[#E6E6E9] rounded-[8px] text-[#37334C] text-[32px] leading-[40px] font-semibold',
          errors.command?.type === 'required' && 'border-red-500'
        )}
      />
      <button
        type="submit"
        className={cx(
          'mt-[48px] mb-[32px] flex justify-center items-center h-[104px] w-full bg-[#6953EF] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#ffffff]',
          (loading || !(poapConf && poapConf?.count && poapConf.count > 0)) && 'opacity-30 pointer-events-none',
          inTranscation && 'pointer-events-none'
        )}
      >
        {loading ? '获取数据中...' : inTranscation ? '领取中...' : '确认'}
      </button>
    </form>
  );
};

export const ClaimButton: React.FC<{ command: string }> = ({ command }) => {
  const activityId = useActivityId()!;
  const { value: poapConf, loading } = usePoapConfig(activityId);
  const navigate = useNavigate();
  const { inTranscation, execTranscation: handleClaim } = useInTranscation(_handleClaim);
  const handleOnClaim = useCallback(() => {
    if (command) {
      showModal({ content: <ModalContent /> });
      return;
    }
    handleClaim({ activityId, navigate });
  }, [command, activityId, navigate]);

  return (
    <button
      onClick={() => handleOnClaim()}
      className={cx(
        'mt-[60px] flex justify-center items-center h-[104px] w-[654px] bg-[#6953EF] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#ffffff]',
        //TODO:comment 2 lines below to test command button
        (loading || !(poapConf && poapConf?.count && poapConf.count > 0)) && 'opacity-30 pointer-events-none',
        inTranscation && 'pointer-events-none'
      )}
    >
      {loading ? '获取数据中...' : inTranscation ? '领取中...' : '领取'}
      {/* TODO: To test command button  */}
      {'领取'}
    </button>
  );
};
