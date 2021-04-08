import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppLayout from "./AppLayout/index";
import zhCN from "antd/lib/locale/zh_CN";
import "./App.scss";
import { ConfigProvider } from "antd";
import Login from "./pages/login";

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route path="/app" component={AppLayout}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </Router>
    </ConfigProvider>
  );
};

export default App;
