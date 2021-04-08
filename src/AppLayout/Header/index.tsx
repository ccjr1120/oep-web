import Avatar from "antd/lib/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message } from "antd";
import { useHistory } from "react-router";
import { fetchByBody } from "../../api/api";

const DropAvatar = () => {
  const history = useHistory();
  const handleLogout = () => {
    fetchByBody("/logout", {}).then(() => {
      message.success("注销成功");
      history.push("/login");
    });
  };
  const dropMenu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          handleLogout();
        }}
      >
        退出
      </Menu.Item>
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
      <div style={{ position: "absolute", right: 0 }}>{DropAvatar()}</div>
    </div>
  );
};

export default MyHeader;
