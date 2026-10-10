import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import { Poppins, Roboto } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata = {
  title: "Rolls Mania",
  description: "Rolls Mania - Goodness Rolled With Love",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.variable}`}>
        {children}
      </body>
    </html>
  );
}
