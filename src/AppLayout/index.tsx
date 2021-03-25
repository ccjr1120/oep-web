import { Layout } from "antd";
import MySidebar from "./Sidebar";

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <Sider>
        <MySidebar />
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
