import { Button, Drawer, Menu, MenuProps } from "antd";
import { useState } from "react";
import {
  MenuOutlined,
  HomeOutlined,
  RobotOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { authService } from "../../services/auth";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key = "",
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label: (
      <a href={`/${key}`} className="font-semibold text-[18px] !text-[#888]">
        {label}
      </a>
    ),
    type,
  } as MenuItem;
}
function SideBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  const items: MenuProps["items"] = [
    getItem("Home", "", <HomeOutlined className="!text-[24px]" />),

    getItem("About us", "about", <RobotOutlined className="!text-[24px]" />),

    getItem("Setting", "setting", <SettingOutlined className="!text-[24px]" />),
  ];
  return (
    <div>
      <Button
        className="text-black bg-white border-[2px] flex items-center"
        onClick={showDrawer}
      >
        <MenuOutlined />
      </Button>
      <Drawer
        width={250}
        title="Hello Group B"
        placement="right"
        onClose={closeDrawer}
        open={visible}
        bodyStyle={{
          paddingLeft: "0px",
          paddingRight: "0px",
        }}
      >
        <div className="h-full flex flex-col justify-between">
          <Menu
            onClick={onClick}
            style={{ width: 250 }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
          <div className="px-[15px]">
            <Button
              type="link"
              className="w-full h-fit text-white text-[18px] font-semibold bg-[#d97878]"
              onClick={() => {
                authService.logout()
              }}
            >
              <a href="/login">Logout</a>
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default SideBar;
