"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import dynamic from "next/dynamic";
import { Button, Drawer, Grid, Menu } from "antd";
import Sidebar from "./Sidebar";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useTranslations } from "next-intl";

type MenuItem = Required<MenuProps>["items"][number];

const { useBreakpoint } = Grid;

const ProfilePictureUpload = dynamic(() => import("./ProfilePictureUpload"), {
  ssr: false,
});

const Navbar = ({ locale }: { locale: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { md } = useBreakpoint();
  const [open, setOpen] = useState(false);
  const t = useTranslations("NavbarLinks");

  const items: MenuItem[] = [
    { key: "contact-list", label: t("contact-list") },
    { key: "/contact-list/create-form", label: t("contact-create") },
  ];

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as string;
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(`/${locale}/${e.key}`);
  };

  return (
    <div className="w-full flex justify-between py-4 px-10 ">
      <span className="flex gap-4">
        <Link href={`/${locale}/`}>
          <Image src="/abbon-logo.jpg" width={60} height={60} alt="logo" />
        </Link>
        {md && (
          <Menu
            mode="horizontal"
            onClick={onClick}
            items={items}
            className="w-[240px]"
          />
        )}
      </span>
      {md ? (
        <>
          <div className="flex gap-4 items-center">
            <span>Sirisak Wongwal</span>
            <ProfilePictureUpload
              initialPicture="/profile-picture1.png"
              width="50px"
              height="50px"
            />
            <select
              value={locale}
              onChange={handleLanguageChange}
              className="rounded-md px-4 py-2 bg-transparent hover:outline-none focus:outline-none"
            >
              <option value="en">EN</option>
              <option value="th">TH</option>
            </select>
          </div>
        </>
      ) : (
        <span className="flex items-center">
          <Button type="primary" onClick={() => setOpen(!open)}>
            <MenuUnfoldOutlined />
          </Button>
        </span>
      )}
      <Drawer
        onClose={() => setOpen(!open)}
        open={open}
        placement="right"
        styles={{ body: { padding: "0px" } }}
      >
        <Sidebar locale={locale} onClose={() => setOpen(!open)} />
      </Drawer>
    </div>
  );
};

export default Navbar;
