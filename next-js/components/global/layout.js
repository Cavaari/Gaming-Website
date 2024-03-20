import Navbar from "./Navbar";


export default function Layout({ children, changeTheme }) {  
  return (
    <>
      <Navbar changeTheme={changeTheme} title={"Jeopardy!"}/>
      <main>{children}</main>
    </>
  );
}
