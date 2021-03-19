import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb, Button, Col } from "antd";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebaseConfig";

const Navbar = ({ changeMenu }) => {
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((usu) => {
      if (usu) {
        setUser(usu.email);
      }
    });
  }, []);

  const Logout = () => {
    auth.signOut();
    setUser(null);
    history.push("/");
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[`${changeMenu}`]}
    >
      <Menu.Item key="1">
        <Link to="/"> Inicio</Link>
      </Menu.Item>
      {!user ? (
        <Menu.Item key="2">
          <Link to="/login"> Login</Link>
        </Menu.Item>
      ) : null}
      {user ? (
        <Menu.Item key="3">
          <Link to="/admin"> Admin</Link>
        </Menu.Item>
      ) : null}

      {user ? (
        <Button type="primary" danger onClick={() => Logout()}>
          Cerrar Sesión
        </Button>
      ) : null}
    </Menu>
  );
};

export default Navbar;
