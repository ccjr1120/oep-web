import { FunctionComponent, lazy, LazyExoticComponent } from "react";

export interface IRoute {
  path: String;
  component: LazyExoticComponent<FunctionComponent>;
  name: String;
}

const routes: Array<IRoute> = [
  {
    path: "/menuManage",
    component: lazy(() => import("../pages/system/MenuManage/index")),
    name: "菜单管理",
  },
  {
    path: "/accountManage",
    component: lazy(() => import("../pages/system/AccountManage/index")),
    name: "账号管理",
  },
];

export default routes;
