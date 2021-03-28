import { Layout, Progress } from "antd";
import MyHeader from "./Header";
import MySidebar from "./Sidebar";
import Main from "./Main";
import "./index.scss";
import { CSSProperties, useState } from "react";

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const [horizonPosition, setHorizonPosition] = useState({ right: "100%" });
  const loadStyle: CSSProperties = {
    height: "1px",
    position: "fixed",
    top: 0,
    ...horizonPosition,
    zIndex: 1024,
    transition: "10s",
  };
  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <Progress
        showInfo={false}
        style={loadStyle}
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
        percent={100}
      />
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
