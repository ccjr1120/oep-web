import Avatar from "antd/lib/avatar/avatar";
import { Dropdown, Menu, message } from "antd";
import { useHistory } from "react-router";
import { fetchByBody } from "../../api/api";
import store from "../../store";
const DropAvatar = () => {
  const history = useHistory();
  const session: any = sessionStorage.getItem("user")!;
  const avatarUrl = "http://localhost:8080" + JSON.parse(session).avatarUrl;
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
      <Avatar
        src={
          store.getState().avatarUrl !== ""
            ? store.getState().avatarUrl
            : avatarUrl
        }
        size={42}
      />
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
