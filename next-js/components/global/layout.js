import Navbar from "./Navbar";

import BootstrapClient from "./BootstrapClient";


export default function Layout({ children }) {  
  return (
    <>
      <Navbar/>
      <main>{children}</main>
      <BootstrapClient/>
    </>
  );
}
