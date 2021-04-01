import { Route } from "react-router";
import { IRoute } from "../router";

export interface AppRouteType {
  beforeEffact: Function;
  route: IRoute;
  afterEffact: Function;
}
/**
 * 尝试继承Route，从而实现路由的开始与结束方法
 */
export class AppRoute extends Route<any> {
  UNSAFE_componentWillMount() {
    this.props.beforeEffact();
  }
  componentDidMount() {
    this.props.afterEffact();
  }
}
