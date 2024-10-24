import { useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";
import CreateContact from "./create-contact";

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

const CrateContactPage = () => {
  const t = useTranslations("ContactListPage");
  return (
    <div className="mx-4 md:mx-[66px] my-4 h-full">
      <h1 className="text-3xl font-bold mt-20 text-center">
        {t("title-createPage")}
      </h1>
      <CreateContact />
    </div>
  );
};

export default CrateContactPage;
