import Navbar from "@/components/global/Navbar";
import "./globals.css";
import BootstrapClient from "@/components/global/BootstrapClient";


export const metadata = {
  title: "Team 9",
  description: "CIS*4250",
};



export default function RootLayout({ children }) {
  




  return (
    <html lang="en">
      <body>
        
        <Navbar/>
        <div>{children}</div>
        <BootstrapClient/>
      </body>
    </html>
  );
}
