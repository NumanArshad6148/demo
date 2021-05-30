import React from "react";
import { Layout } from "antd";
import PrivateRoutes from "./privateRoutes";
import HeaderComponent from "../common/header";

const { Footer, Content } = Layout;

const LayoutContainer: React.FC = (): JSX.Element => (
  <Layout className="layout">
    <HeaderComponent />
    <Content
      style={{ padding: "20px", marginTop: 64, backgroundColor: "white" }}
    >
      {/* <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb> */}
      <PrivateRoutes />
    </Content>
    {/* <Footer style={{ textAlign: "center" }}>
      Ant Design ©2018 Created by Ant UED
    </Footer> */}
  </Layout>
);

export default LayoutContainer;
