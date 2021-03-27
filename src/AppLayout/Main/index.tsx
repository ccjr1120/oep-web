import { Route, Switch } from "react-router";
import accountManage from "../../pages/system/AccountManage";
import MenuManage from "../../pages/system/MenuManage";

const Main = () => {
  return (
    <div className="page-container">
      <Switch>
        <Route path={`/menuManage`} exact component={MenuManage}></Route>
        <Route path={`/accountManage`} exact component={accountManage}></Route>
      </Switch>
    </div>
  );
};

export default Main;
