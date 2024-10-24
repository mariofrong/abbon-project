"use client";

import React, { useState, useMemo } from "react";
import { Table, Input, Button, Space, Layout, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { IQueryParamPagination } from "@/types/common";
import { getRandomName } from "@/mocks/userData";
import { useTranslations } from "next-intl";

interface Contact {
  key: number;
  name: string;
  age: number;
}

const mockContacts: Contact[] = Array.from({ length: 100 }, (_, index) => ({
  key: index,
  name: getRandomName(),
  age: Math.floor(Math.random() * 30) + 20,
}));

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState<IQueryParamPagination>({
    page: 1,
    limit: 20,
  });
  const [api, notificationHolder] = notification.useNotification();
  const t = useTranslations("ContactListPage");

  useMemo(() => {
    setContacts(mockContacts);
    setFilteredContacts(mockContacts);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length >= 3) {
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  };

  const handleDelete = (key: number) => {
    const updatedContacts = filteredContacts.filter(
      (contact) => contact.key !== key
    );
    const updatedAllContacts = contacts.filter(
      (contact) => contact.key !== key
    );
    setContacts(updatedAllContacts);
    setFilteredContacts(updatedContacts);
    api.success({
      message: `Contact deleted successfully!`,
      placement: "top",
    });
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setFilteredContacts(contacts);
  };

  const columns: ColumnsType<Contact> = [
    {
      title: t("name-surname"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("age"),
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" danger onClick={() => handleDelete(record.key)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Layout.Content>
      {notificationHolder}
      <Space className="my-4">
        <Input
          size="large"
          placeholder={`Search by ${t("name-surname")}`}
          value={searchValue}
          onChange={handleSearch}
          suffix={<SearchOutlined />}
        />
        <Button size="large" onClick={handleClearSearch}>
          Clear
        </Button>
      </Space>
      <Table
        rowKey="key"
        dataSource={filteredContacts}
        columns={columns}
        pagination={{
          showSizeChanger: false,
          current: pagination.page,
          pageSize: pagination.limit,
          onChange: (page) => {
            setPagination((prev) => ({
              ...prev,
              page,
            }));
          },
          total: filteredContacts.length,
        }}
      />
    </Layout.Content>
  );
};

export default ContactList;
