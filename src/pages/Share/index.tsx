import useActivityId from '@hooks/useActivityId';

const SharePage: React.FC = () => {
  const activityId = useActivityId()!;
  return (
    <>
      <img
        src={`https://nft-rainbow.oss-cn-hangzhou.aliyuncs.com/service/activity/${activityId}.png`}
        className="fixed top-0 right-0 bottom-0 left-0 w-screen h-screen z-[1000]"
        draggable={false}
      />
    </>
  );
};

export default SharePage;
