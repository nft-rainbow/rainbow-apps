import { useAccount } from '@services/account';
import { useRefreshPoapConfig } from '@services/poap';
import { fetchApi } from '@utils/fetch/fetchApi';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useActivityId from './useActivityId';

const useInClaiming = <T extends () => void | Promise<any> | null | undefined>() => {
  const [inTranscation, setInTranscation] = useState(false);
  const account = useAccount()!;
  const activityId = useActivityId()!;
  const navigate = useNavigate();
  const refreshPoapConfig = useRefreshPoapConfig(activityId);

  const handleClaim = useCallback(async () => {
    try {
      const res = await fetchApi({
        path: 'poap/h5',
        method: 'POST',
        params: {
          activity_id: parseInt(activityId),
          user_address: account,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const execTranscation = useCallback(async () => {
    try {
      setInTranscation(true);
      await handleClaim();
      setInTranscation(false);
      refreshPoapConfig();
      navigate(`/success?activity_id=${activityId}`);
    } catch (_) {
      setInTranscation(false);
    }
  }, [handleClaim]) as T;

  return { inTranscation, execTranscation };
};

export default useInClaiming;
