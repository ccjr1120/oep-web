import Avatar from "antd/lib/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";

const dropAvatar = () => {
  const dropMenu = (
    <Menu>
      <Menu.Item>我的消息</Menu.Item>
      <Menu.Item>退出</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={dropMenu}>
      <Avatar size={42} icon={<UserOutlined />} />
    </Dropdown>
  );
};

const MyHeader = () => {
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <div style={{ position: "absolute", right: 0 }}>{dropAvatar()}</div>
    </div>
  );
};

export default MyHeader;
