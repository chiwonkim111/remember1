import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "리멤버 — 프로필 다이어리",
  description: "리멤버 앱의 프로필 다이어리 프로토타입",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap"
        />
      </head>
      <body>
        <div className="relative w-[390px] h-[844px] bg-brand-surface-bg rounded-[20px] shadow-[0_32px_64px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.12)] overflow-hidden flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
