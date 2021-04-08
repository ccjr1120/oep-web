import {
  BrowserRouter as Router,
  Redirect,
  Route,
} from "react-router-dom";
import AppLayout from "./AppLayout/index";
import zhCN from "antd/lib/locale/zh_CN";
import "./App.scss";
import { ConfigProvider } from "antd";
import Login from "./pages/login";

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Redirect
          to={{
            pathname: "/app",
          }}
        />
        <Route path="/app" component={AppLayout}></Route>
        <Route path="/login" component={Login}></Route>
      </Router>
    </ConfigProvider>
  );
};

export default App;
