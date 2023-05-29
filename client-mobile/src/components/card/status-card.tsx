import { Button, Card, CardProps, Spin } from "antd";
import {
  SmileFilled,
  FrownFilled,
  MehFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

export enum BotStatus {
  RUNNING = 0,
  OUT_OF_BATTERY = 1,
  STUCK = 2,
  SLEEPING = 3,
}
const statusTextArr = ["Running", "Oout Of Battery", "Stuck", "Sleeping"];
const statusIconArr = [SmileFilled, FrownFilled, FrownFilled, MehFilled];
type Props = {
  status?: BotStatus;
  setStatus?: any;
} & CardProps;
function StatusCard({
  className,
  status = BotStatus.RUNNING,
  setStatus,
}: Props) {
  const [loading, setLoading] = useState(false);
  const onRefresh = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };
  const antIcon = (
    <ReloadOutlined
      style={{
        fontSize: "1.5rem",
        marginLeft: "0.25rem",
        color: "#999",
      }}
      spin
    />
  );
  return (
    <Card
      className={`${className} text-[#474a4f]`}
      bodyStyle={{ padding: "12px", height: "150px" }}
    >
      <div className="grid grid-cols-4 gap-4 items-start h-full">
        <div className="col-span-4 min-[1024px]:col-span-3 flex flex-col justify-between h-full">
          <div
            className={`text-[1.5rem] sm:text-[1.2rem] lg:text-[1.5rem] font-semibold mb-[10px] flex sm:flex-col-reverse justify-between sm:items-center items-start 
          ${
            status === BotStatus.SLEEPING
              ? ""
              : status === BotStatus.RUNNING
              ? "text-[#587b69]"
              : "text-[#d97878]"
          }
          `}
          >
            <span className="sm:text-center w-full">
              {statusTextArr[status]}
            </span>
            <div className="hidden max-lg:inline-flex items-center text-center text-[2rem] ml-[0.25rem]">
              {React.createElement(statusIconArr[status])}
            </div>
          </div>
          <div className="flex items-center max-lg:justify-between w-full">
            <div className="text-[1rem] font-semibold text-[#999] mr-[1rem]">
              Status
            </div>
            {loading ? (
              <Spin indicator={antIcon} />
            ) : (
              <Button
                className="border-0 p-0 inline-flex items-start h-fit ml-[0.25rem]"
                onClick={onRefresh}
              >
                <ReloadOutlined className="text-[1.5rem] font-semibold text-[#999]" />
              </Button>
            )}
          </div>
        </div>
        <div
          className={`max-[1024px]:hidden col-span-1 flex items-center justify-center text-[4rem] 
        ${
          status === BotStatus.SLEEPING
            ? ""
            : status === BotStatus.RUNNING
            ? "text-[#587b69]"
            : "text-[#d97878]"
        }`}
        >
          {React.createElement(statusIconArr[status])}
        </div>
      </div>
    </Card>
  );
}

export default StatusCard;
