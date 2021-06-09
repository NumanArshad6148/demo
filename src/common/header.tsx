import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import { clearUser } from "../utils/functions";

const HeaderComponent: FC = (): ReactElement => {
  const { SubMenu } = Menu;
  const { Header } = Layout;

  console.log("header component ");
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <Menu
        mode="horizontal"
        theme="dark"
        defaultSelectedKeys={["courses"]}
        style={{ display: "flex" }}
      >
        <SubMenu key="courses" title="Manage Courses">
          <Menu.Item key="newCourse">
            <Link to="/courses/new">Create Course</Link>
          </Menu.Item>
          <Menu.Item key="courses">
            <Link to="/courses">View Courses</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="memoize">
          <Link to="/memoize">Memoize</Link>
        </Menu.Item>
        <Menu.Item key="autors">
          <Link to="/authors">Authors</Link>
        </Menu.Item>
        <Menu.Item
          key="logout"
          onClick={clearUser}
          style={{ marginLeft: "auto" }}
        >
          <Link to="/login">Logout</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
