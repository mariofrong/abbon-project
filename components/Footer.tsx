"use client";

import { Col, Layout, Row } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import Image from "next/image";

interface IFooterProps {
  phoneNumber: string;
  email: string;
  lineUrl: string;
  address: string;
}

const Footer: React.FC<IFooterProps> = ({
  phoneNumber,
  email,
  lineUrl,
  address,
}) => {
  return (
    <Layout.Footer>
      <Row gutter={[16, 16]}>
        <Col md={24} lg={12}>
          <h4>Address</h4>
          <p className="text-balance">{address}</p>
        </Col>
        <Col md={12} lg={12}>
          <span className="flex gap-2">
            <PhoneOutlined className="pl-1" />
            <h4 className="w-12">Phone </h4>
            <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
          </span>
          <span className="flex gap-2">
            <MailOutlined className="pl-1" />
            <h4 className="w-12">Email </h4>
            <a href={`mailto:${email}`}>{email}</a>
          </span>
          <span className="flex gap-2">
            <Image
              src="/icons/line-icon.png"
              width={20}
              height={20}
              alt="line-icon"
            />
            <h4 className="w-12">Line </h4>
            <a href={lineUrl} target="_blank" rel="noopener noreferrer">
              Open Line
            </a>
          </span>
        </Col>
      </Row>
    </Layout.Footer>
  );
};

export default Footer;
