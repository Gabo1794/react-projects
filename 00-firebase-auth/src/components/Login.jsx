import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Row, Col, message } from "antd";
import { auth } from "../firebaseConfig";

import { useHistory } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgError, setMsgError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (msgError) {
      message.error(msgError);
      setMsgError(null);
    }
  }, [msgError]);

  const onFinish = (values: any) => {
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        message.success("Usuario creado");
        history.push("/");
        setPassword("");
        setEmail("");
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          setMsgError("Formato de Email incorrecto");
        }

        if (err.code === "auth/weak-password") {
          setMsgError("La contraseña debe de ser de almenos 6 caracteres.");
        }
      });
  };

  //   const onFinishFailed = (errorInfo: any) => {

  //   };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const LoginFirebaseUser = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        history.push("/");
        console.log(res);
      })
      .catch((err) => {
        //auth/user-not-found
        //auth/wrong-password
        if (err.code === "auth/user-not-found") {
          setMsgError("Usuario no registrado");
        }

        if (err.code === "auth/wrong-password") {
          setMsgError("La contraseña es incorrecta.");
        }
      });
  };

  return (
    <Row>
      <Col span={24}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Correo"
            name="email"
            rules={[
              {
                required: true,
                message: "Introduce el correo",
              },
              {
                type: "email",
                message: "Introduce un email valido",
              },
            ]}
          >
            <Input value={email} onChange={(e) => onChangeEmail(e)} />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              {
                required: true,
                message: "Ingresa tu contraseña",
              },
              {
                maxLength: "6",
                message: "Debes ingresar una contraseña de minimo 6 caracteres",
              },
            ]}
          >
            <Input.Password
              value={password}
              onChange={(e) => onChangePassword(e)}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button block type="seconday" htmlType="submit">
              Registrar usuario
            </Button>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button block type="primary" onClick={() => LoginFirebaseUser()}>
              Iniciar sesion
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
