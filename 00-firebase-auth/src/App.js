import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import Index from "./components/Index";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

const { Header, Content, Footer } = Layout;

const App = () => {
  const [changeMenu, setChangeMenu] = useState("1");

  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Navbar 
            changeMenu={changeMenu}
          />
        </Header>
        <Content style={{ padding: "50px 50px" }}>
          <Switch>
            <Route exact path="/" component={Index}></Route>
            <Route path="/admin" component={Admin}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
