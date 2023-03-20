interface LabelProp {
  amount?: number;
}

export const Label: React.FC<LabelProp> = ({ amount }) => {
  if (!amount) {
    return (
      <div className="m-[24px] md:m-[12px] px-[16px] md:px-[8px] min-w-[104px] md:min-w-[52px] inline-flex flex-row justify-center items-center h-[48px] md:h-[24px] rounded-tl-[24px] md:rounded-tl-[12px] rounded-tr-[4px] md:rounded-tr-[2px] rounded-br-[24px] md:rounded-br-[12px] rounded-bl-[4px] md:rounded-bl-[2px] text-[24px] md:text-[12px] leading-[32px] md:leading-[16px] text-[#FFFFFF] bg-[#05001F] opacity-70">
        不限量
      </div>
    );
  }
  return (
    <div className="m-[24px] md:m-[12px] flex flex-row w-fit text-[24px] md:text-[12px] leading-[32px] md:leading-[16px]">
      <div className="px-[16px] md:px-[8px] flex flex-row justify-center items-center h-[48px] md:h-[24px] rounded-tl-[24px] md:rounded-tl-[12px] rounded-bl-[4px] md:rounded-bl-[2px] bg-[#05001F] text-[#ffffff]  opacity-70">
        限量
      </div>
      <div className="px-[16px] md:px-[8px] flex flex-row justify-center items-center h-[48px] md:h-[24px] border border-[#05001F] rounded-tr-[4px] md:rounded-tr-[2px] rounded-br-[24px] md:rounded-br-[12px] text-center align-middle text-[#05001F] z-20">
        {amount}
      </div>
    </div>
  );
};

export default Label;
