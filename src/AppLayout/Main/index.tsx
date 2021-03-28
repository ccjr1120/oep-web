import { Route, Switch } from "react-router";
import routes from "../../router/index";

const Main = () => {
  return (
    <div className="page-container">
      <Switch>
        {routes.map((item, i) => {
          return (
            <Route
              key={i}
              path={`${item.path}`}
              component={item.component}
              exact
            ></Route>
          );
        })}
      </Switch>
    </div>
  );
};

export default Main;
