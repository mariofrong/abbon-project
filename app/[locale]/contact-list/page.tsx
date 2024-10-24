import { useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";
import ContactList from "./contact-table";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages: any = await getMessages({ locale });
  const title = messages.NavbarLinks.profileTitle;
  return {
    title,
  };
}

const ContactListPage = () => {
  const t = useTranslations("ContactListPage");

  return (
    <div className="mx-4 md:mx-[66px] my-4">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <ContactList />
    </div>
  );
};

export default ContactListPage;
