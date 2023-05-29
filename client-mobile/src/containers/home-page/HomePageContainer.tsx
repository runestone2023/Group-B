import CtrlButton from "../../components/button/control-group-button";
import MvGroupButton from "../../components/button/mv-group-button";
import StatusCard, { BotStatus } from "../../components/card/status-card";
import SwitchCard, { Mode } from "../../components/card/switch-mode-card";
import titleBackground from "../../assets/title-background.jpg";
import { useContext, useState } from "react";
import { Layout } from "../setting";
import { moveService } from "../../services/movement";
import { NotificationContext } from "../../components/notification";
enum Drive {
  Clockwise = 2,
  Forward = 1,
  Stop = 0,
  Backward = -1,
  CounterClockwise = -2,
}

function HomePageContainer() {
  const [mode, setMode] = useState(Mode.MANUAL);
  const [status, setStatus] = useState(BotStatus.SLEEPING);
  const { setNotification } = useContext(NotificationContext);
  const onBackward = async () => {
    try {
      const res = await moveService.drive(Drive.Backward);
      if (!res) {
        setNotification({
          type: "error",
          message: "Error",
          description: "Something Wrong",
        });
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  const onForward = async () => {
    try {
      const res = await moveService.drive(Drive.Forward);
      if (!res) {
        setNotification({
          type: "error",
          message: "Error",
          description: "Something Wrong",
        });
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  const onTurnLeft = async () => {
    try {
      const res = await moveService.drive(Drive.Clockwise);
      if (!res) {
        setNotification({
          type: "error",
          message: "Error",
          description: "Something Wrong",
        });
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  const onTurnRight = async () => {
    try {
      const res = await moveService.drive(Drive.CounterClockwise);
      if (!res) {
        setNotification({
          type: "error",
          message: "Error",
          description: "Something Wrong",
        });
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  const layout = localStorage.getItem("layout") ?? Layout.RIGHT;
  return (
    <>
      <div
        className="bg-[#fff] sm:bg-[#ebebeb] lg:bg-[#fff] "
        style={{ height: "calc(100vh - 50px)" }}
      >
        <div className="px-[15px] pt-[5px] h-full relative flex flex-col max-sm:justify-between">
          <div>
            <div
              className="text-center mt-[15px] mb-[30px] sm:mt-[0px] sm:mb-[0px] lg:mt-[15px] lg:mb-[30px] p-[10px] rounded-lg bg-[#eee] lg:w-[1004px] mx-auto"
              style={{
                background: `linear-gradient(rgba(160,160,160,0.8), rgba(160,160,160,0.8)),url(${titleBackground}) center/cover`,
              }}
            >
              <h1
                className="text-[1.75rem] text-white"
                style={{ fontFamily: "'Ubuntu', sans-serif" }}
              >
                HelperBot Mark II
              </h1>
            </div>
            <div
              className="grid grid-cols-2 sm:hidden lg:grid mx-auto max-[320px]:flex max-[320px]:flex-col justify-center sm:justify-between sm:gap-[40px] gap-[10px] 
      items-center w-full mb-[20px] lg:w-[1004px]
      "
            >
              <StatusCard
                className="col-span-1 w-full min-h-[150px] drop-shadow-lg"
                status={status}
                setStatus={setStatus}
              />
              <SwitchCard
                className="col-span-1 w-full min-h-[150px] drop-shadow-lg"
                mode={mode}
                setMode={setMode}
              />
            </div>
          </div>
          <div
            className={`max-sm:mb-[30px] mx-auto flex ${
              layout === Layout.RIGHT ? "flex-row-reverse" : "flex-row"
            } max-[320px]:flex-col-reverse justify-center sm:justify-between 
          max-[640px]:gap-[40px] max-[320px]:gap-[10px] items-center w-full p-[20px] rounded-lg
          bg-[#ebebeb] sm:bg-[transparent] lg:bg-[#ebebeb] lg:w-[1004px] min-[720px]:px-[40px]
      `}
          >
            <MvGroupButton
              onBackward={onBackward}
              onForward={onForward}
              onTurnLeft={onTurnLeft}
              onTurnRight={onTurnRight}
              disabled={mode === Mode.AUTO}
            />
            <div className="hidden sm:grid sm:grid-cols-2 lg:hidden w-[50%] mx-auto justify-center items-center p-[10px] rounded-lg bg-[#fff] gap-[10px] shadow-inner">
              <StatusCard
                className="col-span-1 w-full border-0 bg-[#f8f8f8]"
                status={status}
                setStatus={setStatus}
              />
              <SwitchCard
                className="col-span-1 w-full border-0 bg-[#f8f8f8]"
                mode={mode}
                setMode={setMode}
              />
            </div>
            <CtrlButton disabled={mode === Mode.AUTO} />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default HomePageContainer;
