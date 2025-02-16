'use client';
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./store";
import NavigationMenu from "./components/navigation-menu";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const motterdam = localFont({
  src: "./fonts/Motterdam.ttf",
  variable: "--font-motterdam",
  weight: "700",
});

const heybrights = localFont({
  src: "./fonts/Heybrights.ttf",
  variable: "--font-heybrights",
  weight: "700",
});




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${motterdam.variable} ${heybrights.variable} antialiased`}
      >
        <Provider store={store}>
          <NavigationMenu />
          <div style={{ marginTop: 48}}>
          {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
