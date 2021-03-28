import { FunctionComponent } from "react";
import AccountManage from "../pages/system/AccountManage";
import MenuManage from "../pages/system/MenuManage";

export interface IRoute {
  path: String;
  component: FunctionComponent;
  name: String;
}

const routes: Array<IRoute> = [
  {
    path: "/menuManage",
    component: MenuManage,
    name: "菜单管理",
  },
  {
    path: "/accountManage",
    component: AccountManage,
    name: "账号管理",
  },
];

export default routes;
