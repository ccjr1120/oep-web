import { Route, Switch } from "react-router";
import MenuManage from "../../pages/system/MenuManage";

const Main = () => {
  return (
    <div>
      <Switch>
        <Route path={`/menuManage`} exact component={MenuManage}></Route>
      </Switch>
    </div>
  );
};

export default Main;
