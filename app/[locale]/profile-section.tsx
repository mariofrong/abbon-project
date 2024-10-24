"use client";

import { Card, Layout } from "antd";
import { useTranslations } from "next-intl";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";

const ProfileSection = () => {
  const t = useTranslations("HomePage");

  return (
    <Layout.Content className="mx-4 md:mx-[66px] my-4">
      <Card hoverable>
        <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
          <div className="flex-col gap-2">
            <ProfilePictureUpload
              initialPicture="/profile-picture1.png"
              width="200px"
              height="200px"
            />
            <span className="text-xs text-gray-500">*{t("suggest_text")}</span>
          </div>
          <div>
            <span className="flex items-baseline gap-2">
              <span className="font-bold text-base md:text-2xl ">
                {t("name")} :{" "}
              </span>
              <span className="text-base md:text-2xl"> Sirisak</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="font-bold text-base md:text-2xl">
                {t("surname")} :{" "}
              </span>
              <span className="text-base md:text-2xl"> Wongwal</span>
            </span>
          </div>
        </div>
      </Card>
    </Layout.Content>
  );
};

export default ProfileSection;
