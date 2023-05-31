import { Button, Card, CardProps } from "antd";
import React, { useContext, useState } from "react";
import { RobotOutlined, UserOutlined } from "@ant-design/icons";
import { controlService } from "../../services/control";
import { NotificationContext } from "../notification";
export enum Mode {
  AUTO = 0,
  MANUAL = 1,
}
type Props = {
  mode?: Mode;
  setMode?: any;
} & CardProps;
const modeTextArr = ["Auto", "Manual"];
const modeIconArr = [RobotOutlined, UserOutlined];
function SwitchCard({ className, mode = Mode.MANUAL, setMode }: Props) {
  const [loading, setLoading] = useState(false);
  const {setNotification} = useContext(NotificationContext)
  const onModeChange = async () => {
    setLoading(true);
    try {
      const res = await controlService.control(mode === Mode.AUTO);
      if (!res) {
        setNotification({
          type: "error",
          message: "Error",
          description: "Something Wrong",
        });
      }else{
        setMode(1 - mode);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  return (
    <Card
      className={`${className} text-[#474a4f]`}
      bodyStyle={{ padding: "12px", height: "150px" }}
    >
      <div className="grid grid-cols-4 gap-4 items-start h-full">
        <div className="col-span-4 min-[1024px]:col-span-3 flex flex-col justify-between h-full">
          <div className="text-[1.5rem] sm:text-[1.2rem] lg:text-[1.5rem] font-semibold mb-[10px] flex sm:flex-col-reverse justify-between sm:items-center items-start">
            <span className="sm:text-center">
              {modeTextArr[mode] + " Mode"}
            </span>
            <div className="hidden max-lg:inline-flex items-center text-center text-[2rem] ml-[0.25rem]">
              {React.createElement(modeIconArr[mode])}
            </div>
          </div>
          <div className="w-full">
            <Button
              className="w-full font-semibold bg-[#dcba8d] text-white hover:text-white "
              onClick={onModeChange}
              loading={loading}
            >
              SWITCH
            </Button>
          </div>
        </div>
        <div className="max-[1024px]:hidden col-span-1 flex items-center justify-center text-[4rem]">
          {React.createElement(modeIconArr[mode])}
        </div>
      </div>
    </Card>
  );
}
export default SwitchCard;
