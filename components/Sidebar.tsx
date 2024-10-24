"use client";

import React from "react";
import {
  CompassOutlined,
  ContactsOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "", icon: <HomeOutlined />, label: "Home" },
  {
    key: "contact",
    label: "Contact",
    icon: <ContactsOutlined />,
    children: [
      { key: "contact-list", label: "Contact List" },
      { key: "/contact-list/create-form", label: "Contact Form" },
    ],
  },
  {
    key: "current-location",
    icon: <CompassOutlined />,
    label: "Current Location",
  },
];

const Sidebar = ({
  locale,
  onClose,
}: {
  locale: string;
  onClose: () => void;
}) => {
  const router = useRouter();

  const openMapWithCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          window.open(googleMapsUrl, "_blank");
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "current-location") {
      openMapWithCurrentLocation();
    } else {
      router.push(`/${locale}/${e.key}`);
      onClose();
    }
  };

  return (
    <div>
      <Menu
        onClick={onClick}
        className="w-full"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default Sidebar;
