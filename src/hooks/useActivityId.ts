import { useSearchParams } from 'react-router-dom';

const useActivityId = () => {
  const [searchParams] = useSearchParams();
  return searchParams.get('activity_id');
};

export default useActivityId;
