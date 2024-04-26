import { Outlet } from "react-router-dom";

const SystemAdminRootLayout = () => {
  return (
    <div>
      <p>nav</p>
      <Outlet />
      <p>footer</p>
    </div>
  );
};
export default SystemAdminRootLayout;
