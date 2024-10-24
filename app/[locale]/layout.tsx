import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body>
        <AntdRegistry>
          <NextIntlClientProvider messages={messages}>
            <div className="w-full h-screen">
              <Navbar locale={locale} />
              {children}
              <Footer
                phoneNumber="+66910711787"
                address="THE 9th TOWERS, Grand Rama9,Tower A, 30th Floor33/4 Rama 9 Road, Huay Kwang,Huay Kwang, Bangkok 10310"
                email="sirisakwongwal111@gmail.com"
                lineUrl="https://line.me/ti/p/J8nEmSRByy"
              />
            </div>
          </NextIntlClientProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
