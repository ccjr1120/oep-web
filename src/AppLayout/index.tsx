import { Layout } from "antd";
import MyHeader from "./Header";
import MySidebar from "./Sidebar";
import Main from "./Main";
import "./index.scss";
import { useEffect } from "react";

const { Header, Sider, Content } = Layout;

const AppLayout = ({ history }: any) => {
  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      history.push("/login");
    }
  }, [history]);
  return (
    <Layout style={{ width: "100%", minHeight: "100vh" }}>
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
