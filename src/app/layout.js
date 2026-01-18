import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/folder/navbar/Navbar";
import Footer from "@/components/folder/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "BidexBlog Homepage",
    template: "%s | BidexBlog"

  },
  description: "This is Abidemi-mi's Blog & it is built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
