import { useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";
import ProfileSection from "./profile-section";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages: any = await getMessages({ locale });
  const title = messages.NavbarLinks.homeTitle;

  return {
    title,
  };
}

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <div className="m-4 h-full">
      <div className="text-3xl font-bold text-center">{t("title")}</div>
      <ProfileSection />
    </div>
  );
}
