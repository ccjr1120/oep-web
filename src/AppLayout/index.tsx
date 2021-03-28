import { Layout } from "antd";
import MyHeader from "./Header";
import MySidebar from "./Sidebar";
import Main from "./Main";
import "./index.scss";

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
    </Layout>
  );
};

export default AppLayout;
