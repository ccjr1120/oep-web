import { Menu } from "antd";
import { Link } from "react-router-dom";
import routes, { IRoute } from "../../router/index";


const loopMenu = (routes: Array<IRoute>) => {
  return routes.map((route, i) => {
    let firstStyle = i === 0 ? { marginTop: 0 } : {};
    if (route) {
      return (
        <Menu.Item style={firstStyle} key={i}>
          <Link to={`${route.path}`}>{route.name}</Link>
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
        {loopMenu(routes)}
      </Menu>
    </div>
  );
};

export default MySidebar;
