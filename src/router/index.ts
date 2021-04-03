import { FunctionComponent } from "react";
import questionBank from "../pages/questionBank";
import AccountManage from "../pages/system/AccountManage";
import MenuManage from "../pages/system/MenuManage";

export interface IRoute {
  path: String;
  component: FunctionComponent;
  name: String;
}

const routes: Array<IRoute> = [
  {
    path: "/questionBank",
    component: questionBank,
    name: "题库管理",
  },
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
