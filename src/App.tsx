import React, { FC } from "react";
import { Layout } from "antd";
import "./App.scss";

const { Header, Sider, Content } = Layout;
const layoutStyle: React.CSSProperties = {
  height: "100%",
};

const App: FC = () => (
  <div className="App">
    <Layout style={layoutStyle}>
      <Sider collapsed={true}>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
      </Layout>
    </Layout>
  </div>
);

export default App;
