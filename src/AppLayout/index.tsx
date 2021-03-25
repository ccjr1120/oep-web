import { Layout } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MyHeader from "./Header";
import MySidebar from "./Sidebar";
import Main from "./Main";
import MenuManage from "../pages/system/MenuManage";

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <Sider>
        <MySidebar />
      </Sider>
      <Layout>
        <Header>
          <MyHeader />
        </Header>
        <Content>
          <Main />
        </Content>
      </Layout>
      <Router>
        <Route path="/menuManage" component={MenuManage}></Route>
      </Router>
    </Layout>
  );
};

export default AppLayout;
