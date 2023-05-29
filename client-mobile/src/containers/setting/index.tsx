import { useState } from "react";
import leftLayout from "../../assets/left-layout.png";
import rightLayout from "../../assets/right-layout.png";
export enum Layout {
  RIGHT = "right",
  LEFT = "left",
}
function SettingPageContainer() {
  const [layout, setLayout] = useState(
    localStorage.getItem("layout") ?? Layout.RIGHT
  );
  return (
    <div className="pt-[20px] px-[15px]">
      <div className="text-center text-[1.5rem] mb-[20px]">Setting</div>
      <div className="text-center mb-[20px] text-[1.2rem] text-[#666]">
        Change control layout
      </div>
      <div
        className="mx-auto flex max-sm:flex-col justify-center sm:gap-[40px] gap-[20px] 
      items-center w-full mb-[20px] lg:w-[1004px]
      "
      >
        <div
          className={`w-[300px] h-[165px] rounded-xl drop-shadow-lg ${
            layout === Layout.LEFT ? "border-[3px] border-[#597b68]" : ""
          }`}
          style={{
            background: `url(${leftLayout}) center/cover`,
          }}
          onClick={() => {
            setLayout(Layout.LEFT);
            localStorage.setItem("layout", Layout.LEFT);
          }}
        ></div>
        <div
          className={`w-[300px] h-[165px] rounded-xl drop-shadow-lg ${
            layout === Layout.RIGHT ? "border-[3px] border-[#597b68]" : ""
          }`}
          style={{
            background: `url(${rightLayout}) center/cover`,
          }}
          onClick={() => {
            setLayout(Layout.RIGHT);
            localStorage.setItem("layout", Layout.RIGHT);
          }}
        ></div>
      </div>
    </div>
  );
}
export default SettingPageContainer;
