import SideBar from "../sider";
import logo from "../../assets/logo.png"

function Header() {
  return (
    <>
      <div className="bg-[#ffffff] fixed top-0 z-[1000] w-full drop-shadow-lg">
        <div className="flex justify-between items-center h-[50px]  pl-[15px] pr-[15px] border-b border-[#ebebeb]">
          <a
            href="/"
          >
            <img src={logo} alt="" className="h-[20px]"/>
          </a>
          <SideBar/>
        </div>
      </div>
    </>
  );
}

export default Header;
