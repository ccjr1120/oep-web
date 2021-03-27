import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";
export interface MenuType {
  key: String;
  path?: String;
  name: String;
  children?: Array<MenuType>;
}

const menuList: Array<MenuType> = [
  {
    key: "a",
    name: "首页",
    path: "/overview",
  },
  {
    key: "b",
    name: "题库管理",
    path: "/questionBank",
  },
  {
    key: "c",
    name: "考试管理",
    path: "/questionBank",
  },
  {
    key: "d",
    name: "我的考试",
    path: "/questionBank",
  },
  {
    key: "e",
    name: "学生信息",
    path: "/questionBank",
  },
  {
    key: "f",
    name: "个人信息",
    path: "/questionBank",
  },
  {
    key: "z",
    name: "系统管理",
    children: [
      {
        key: "z1",
        path: "/menuManage",
        name: "菜单管理",
      },
      {
        key: "z2",
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
          <SubMenu key={`${menu.key}`} title={menu.name}>
            {loopMenu(menu.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item style={firstStyle} key={`${menu.key}`}>
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
