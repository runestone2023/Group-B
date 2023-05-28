import { Button, ButtonProps } from "antd";
import { ReactNode } from "react";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  CaretLeftOutlined,
} from "@ant-design/icons";
type Props = {
  child?: ReactNode;
} & ButtonProps;
function MvButton({ className, child, ...props }: Props) {
  return (
    <Button
      className={`w-[50px] h-[50px] bg-[#404d6d] border-0 text-white text-[1.5rem] p-0 flex items-center justify-center ${className}`}
      {...props}
    >
      {child}
    </Button>
  );
}
type MvProps = {
  onForward: any;
  onBackward: any;
  onTurnLeft: any;
  onTurnRight: any;
  disabled?: boolean;
};
function MvGroupButton({
  onForward,
  onBackward,
  onTurnLeft,
  onTurnRight,
  disabled = false,
}: MvProps) {
  return (
    <div className="relative">
      {disabled && (
        <div className="absolute inset-0 bg-[#ebebeb33] z-[1000]"></div>
      )}
      <div className="grid grid-cols-3 w-fit h-fit gap-0 drop-shadow-lg">
        <div></div>
        <MvButton
          className="rounded-b-[0px]"
          child={<CaretUpOutlined />}
          onClick={onForward}
        />
        <div></div>
        <MvButton
          className="rounded-r-[0px]"
          child={<CaretLeftOutlined />}
          onClick={onTurnLeft}
        />
        <div className="bg-[#404d6d]"></div>
        <MvButton
          className="rounded-l-[0px]"
          child={<CaretRightOutlined />}
          onClick={onTurnRight}
        />
        <div></div>
        <MvButton
          className="rounded-t-[0px]"
          child={<CaretDownOutlined />}
          onClick={onBackward}
        />
        <div></div>
      </div>
    </div>
  );
}
export default MvGroupButton;
