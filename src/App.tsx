import { BrowserRouter as Router, Route } from "react-router-dom";
import AppLayout from "./AppLayout/index";
import zhCN from "antd/lib/locale/zh_CN";
import "./App.scss";
import { ConfigProvider } from "antd";

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Route path="/" component={AppLayout}></Route>
      </Router>
    </ConfigProvider>
  );
};

export default App;
