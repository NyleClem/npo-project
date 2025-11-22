import NavBar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="content">{children}</div>
    </>
  );
};

export default Layout;