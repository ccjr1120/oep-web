import { FunctionComponent } from "react";
import ExamManage from "../pages/examManage";
import MyExam from "../pages/myExam";
import PersonalCenter from "../pages/personal";
import QuestionBank from "../pages/questionBank";
import BankEdit from "../pages/questionBank/edit";
import StartExam from "../pages/startExam";
import AccountManage from "../pages/system/AccountManage";
import MenuManage from "../pages/system/MenuManage";

export interface IRoute {
  path: String;
  component: FunctionComponent;
  name: String;
}

const routes: Array<IRoute> = [
  {
    path: "/app/questionBank",
    component: QuestionBank,
    name: "题库管理",
  },
  {
    path: "/app/bankEdit",
    component: BankEdit,
    name: "题库编辑",
  },
  {
    path: "/app/startExam",
    component: StartExam,
    name: "参与一场考试",
  },
  { path: "/app/examManage", component: ExamManage, name: "考试管理" },
  {
    path: "/app/menuManage",
    component: MenuManage,
    name: "菜单管理",
  },
  {
    path: "/app/accountManage",
    component: AccountManage,
    name: "账号管理",
  },
  {
    path: "/app/myExam",
    component: MyExam,
    name: "账号管理",
  },
  {
    path: "/app/personal",
    component: PersonalCenter,
    name: "个人信息",
  },
];

export default routes;
