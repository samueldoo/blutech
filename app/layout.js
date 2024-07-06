import { Inter } from "next/font/google";
import "./globals.css";
import { ProductProvider } from "./components/context/ProductContext";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductProvider>{children}</ProductProvider>
      </body>
    </html>
  );
}