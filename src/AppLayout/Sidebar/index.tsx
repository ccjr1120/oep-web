import { Menu } from "antd";
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const MySidebar = () => {
  return (
    <div style={{ height: "100%" }}>
      <div style={{ height: "64px", textAlign: "center", lineHeight: "64px" }}>
        <span style={{ color: "#fff", fontSize: "20px" }}>在线考试系统</span>
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        style={{ height: "calc(100% - 64px)" }}
      >
        <Menu.Item style={{ marginTop: 0 }} key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined />}>
          Option 3
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="系统管理">
          <Menu.Item key="9"> 菜单管理</Menu.Item>
          <Menu.Item key="10">账号管理</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default MySidebar;
