import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";

import { LocaleTypes } from "@/i18n/settings";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LocaleTypes };
}) {
  if (locale === "pl") {
    return {
      title: {
        template: "PL | %s | Acme Dashboard",
        default: "PL Acme Dashboard",
      },
      description:
        "The official Next.js Learn Dashboard built with App Router.",
      metadataBase: new URL("https://nextjs-tutorial-sooty-nine.vercel.app/"),
    };
  }

  return {
    title: {
      template: "EN | %s | Acme Dashboard",
      default: "EN Acme Dashboard",
    },
    description: "The official Next.js Learn Dashboard built with App Router.",
    metadataBase: new URL("https://nextjs-tutorial-sooty-nine.vercel.app/"),
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: LocaleTypes;
  };
}) {
  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
