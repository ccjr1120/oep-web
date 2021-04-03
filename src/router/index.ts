import { FunctionComponent } from "react";
import QuestionBank from "../pages/questionBank";
import EditBank from "../pages/questionBank/editBank";
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
    component: QuestionBank,
    name: "题库管理",
  },
  {
    path: "/editBank",
    component: EditBank,
    name: "题库编辑",
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
