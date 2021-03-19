import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";

import { store } from "../firebaseConfig";
import UsersTable from "./Users/UsersTable";

const Admin = () => {
  const [users, setUsers] = useState(null);
  const [user, setUser ] = useState(null);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(null);

  useEffect(async () => {
      if(users == null)
        await getUsers();
  }, [users]);

  const initialValues = {
    user: {
      name: "",
      email: "",
      age: "",
      website: "",
      introduction: "",
    },
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = async (values) => {
    try {
      const data = await store.collection("USERS").add(values.user);
      
      message.success('Usuario registrado');
      
      getUsers();
      
      const dataForm = {
        user:{
            name: '',
            email: '',
            age: '',
            website: '',
            introduction: ''
        }
    }
    form.setFieldsValue(dataForm);   
    setUser(null)
    setIsEditing(null)       
    } catch (e) {
      console.log(e);
      setUser(null)
      setIsEditing(null)
    } 
  };

  const onFinishUpdate = async(values) => {
    try {
        const data = await store.collection("USERS").doc(user.key).set(values.user);
        
        message.success('Usuario actualizado');
        
        getUsers();
        
        const dataForm = {
          user:{
              name: '',
              email: '',
              age: '',
              website: '',
              introduction: ''
          }
      }
      form.setFieldsValue(dataForm);          
      setUser(null)
      setIsEditing(null)
      } catch (e) {
        console.log(e);
        setUser(null)
        setIsEditing(null)
      } 
  };

  const getUsers = async () => {
      try{
        const { docs } = await store.collection("USERS").get();

        const usersData = docs.map((item) => ({ Id: item.id, ...item.data() }));
        setUsers(usersData);  
        console.log(usersData);
    }
      catch(e){
        console.log(e)
      }
  };

  const deleteUser = async (Id) => {
    try{
        await store.collection('USERS').doc(Id).delete();
        getUsers();
    }
    catch(e){
        console.log(e);
    }
  };


  const updateUser = async (Id) => {
    // de esta manera obtenemos la informacion del usuario sobre el state que que tiene todos los datos.
    // const user = users.find(element => element.Id = Id);
    // console.log(user);
    setIsEditing(true);

    try{
        // se implementa el metodo para aprender a utilizar firebase
        const user = await store.collection('USERS').doc(Id).get();
        const userData = {
            key: Id,
            ...user.data()
        }
        setUser(userData)

        const dataForm = {
            user:{
                name: userData.name,
                email: userData.email,
                age: userData.age,
                website: userData.website,
                introduction: userData.introduction
            }
        }
        form.setFieldsValue(dataForm);             
   
    }
    catch(e){
        console.log(e);
    }
  };
  

  return (
    <div>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={isEditing == null || !isEditing ? onFinish : onFinishUpdate}
        validateMessages={validateMessages}
        initialValues={initialValues}
        form={form}
      >
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[
            {
              type: "number",
              min: 0,
              max: 99,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={["user", "website"]} label="Website">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "introduction"]} label="Introduction">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button block type="primary" htmlType="submit">
            {isEditing == null || !isEditing ? "Registrar" : "Editar Usuario"}
          </Button>
        </Form.Item>
      </Form>

      <h2>Lista de usuarios</h2>
      {
          users ? (
            <UsersTable users={users} deleteUser={deleteUser} updateUser={updateUser}/>
          ) : null
      }
    </div>
  );
};

// const AdminForm = Form.create()(Admin);
// ReactDOM.render(<AdminForm />, mountNode);
export default Admin;
