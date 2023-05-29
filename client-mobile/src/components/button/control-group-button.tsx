import { Button, ButtonProps, Spin } from "antd";
import { ReactNode, useState } from "react";
import { LoadingOutlined, SmileOutlined } from "@ant-design/icons";
import { controlService } from "../../services/control";
type Props = {
  child?: ReactNode;
} & ButtonProps;
function CtrlButton({ className = "", child = "", ...props }: Props) {
  return (
    <Button
      className={`h-[100px] w-[100px] rounded-full border-0 text-white text-[1.2rem] font-bold p-0 ${className}`}
      {...props}
    >
      {child}
    </Button>
  );
}
type CtrlProps = {
  disabled?: boolean;
};
enum ControlStatus {
  GRABBING = 1,
  RELEASING = 0,
}
function CtrlGroupButton({ disabled = false }: CtrlProps) {
  const [status, setStatus] = useState<ControlStatus>(ControlStatus.RELEASING);
  const [loading, setLoading] = useState(false);
  const ReleaseHandler = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      //await controlService.control(false);
      setStatus(ControlStatus.RELEASING);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const GrabHandler = async () => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      //await controlService.control(true);

      setStatus(ControlStatus.GRABBING);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const antIcon = (
    <SmileOutlined
      style={{
        fontSize: "3rem",
        color: "white",
      }}
      spin
    />
  );
  return (
    <div className="relative">
      {disabled && (
        <div className="absolute inset-0 bg-[#ebebeb33] z-[1000]"></div>
      )}
      <div>
        {status === ControlStatus.RELEASING && (
          <CtrlButton
            className="bg-[#d97878] drop-shadow-lg"
            child={loading ? <Spin indicator={antIcon} /> : "GRAB"}
            onClick={GrabHandler}
          />
        )}
        {status === ControlStatus.GRABBING && (
          <CtrlButton
            className="bg-[#587b69] drop-shadow-lg"
            child={loading ? <Spin indicator={antIcon} /> : "RELEASE"}
            onClick={ReleaseHandler}
          />
        )}
      </div>
    </div>
  );
}
export default CtrlGroupButton;
