import NavBar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      {/* Global navigation bar */}
      <NavBar />

      {/* Wrapper where routed pages get rendered */}
      <div className="content">{children}</div>
    </>
  );
};

export default Layout;