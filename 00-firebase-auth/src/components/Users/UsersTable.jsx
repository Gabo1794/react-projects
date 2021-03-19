import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button } from "antd";

const UsersTable = ({ users, deleteUser, updateUser }) => {
  const [usersData, setUsersData] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Web Site",
      dataIndex: "website",
      key: "website",
    },
    {
      title: "Introduction",
      dataIndex: "introduction",
      key: "introduction",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="link"
            primary
            onClick={() => updateUser(record.key) }
          >
            Actualizar
          </Button>            
          <Button
            type="link"
            danger
            onClick={() => deleteUser(record.key) }
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const data = [];
    users.map((item) => {
      data.push({
        key: item.Id,
        name: item.name,
        age: item.age,
        email: item.email,
        website: item.website,
        introduction: item.introduction,
      });
    });
    setUsersData(data);
  }, [users]);

  return <Table columns={columns} dataSource={usersData} />;
};

export default UsersTable;
