// pages/create-contact.tsx
"use client";

import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Modal, Card } from "antd";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const CreateContact: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("ContactListPage");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setModalType("success");
      setIsModalVisible(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setModalType("error");
      setIsModalVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    if (modalType === "success") {
      router.replace(`/${locale}/contact-list/`); // Redirect to the contact list page
    }
  };

  return (
    <div className="mx-auto max-w-[600px]">
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ age: 18 }}
        >
          <Form.Item
            label={t("name-surname")}
            name="name"
            rules={[
              { required: true, message: t("require-message-name-surname") },
              {
                type: "string",
                min: 3,
                message: t("validate-message-name-surname"),
              },
            ]}
          >
            <Input placeholder={t("require-message-name-surname")} />
          </Form.Item>

          <Form.Item
            label={t("age")}
            name="age"
            rules={[
              { required: true, message: t("require-message-age") },
              {
                type: "number",
                message: t("validate-message-age"),
              },
            ]}
          >
            <InputNumber
              placeholder={t("require-message-age")}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item>
            <div className="flex flex-col md:flex-row">
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                {t("submit")}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>

      <Modal
        title={modalType === "success" ? "Success" : "Error"}
        open={isModalVisible}
        onOk={handleModalClose}
        onCancel={() => setIsModalVisible(false)}
      >
        {modalType === "success"
          ? "Contact created successfully!"
          : "An error occurred. Please try again."}
      </Modal>
    </div>
  );
};

export default CreateContact;
