import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="layout-container">{children}</div>
    </div>
  );
};

export default Layout;
