import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";
export interface MenuType {
  path?: String;
  name: String;
  children?: Array<MenuType>;
}

const menuList: Array<MenuType> = [
  {
    name: "系统设置",
    children: [
      {
        path: "/menuManage",
        name: "菜单管理",
      },
      {
        path: "/accountManage",
        name: "账号管理",
      },
    ],
  },
];

const loopMenu = (menuList: Array<MenuType>) => {
  return menuList.map((menu, i) => {
    let firstStyle = i === 0 ? { marginTop: 0 } : {};
    if (menu) {
      if (menu.children) {
        return (
          <SubMenu key={i} title={menu.name}>
            {loopMenu(menu.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item style={firstStyle} key={i}>
          <Link to={`${menu.path}`}>{menu.name}</Link>
        </Menu.Item>
      );
    }
    return "";
  });
};

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
        {loopMenu(menuList)}
      </Menu>
    </div>
  );
};

export default MySidebar;
