import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const LoginLayout = () => {
  return (
    <>
      <h1 className="page-title">Movie rental</h1>
      <Outlet />
      <Footer />
    </>
  );
}

export default LoginLayout;
