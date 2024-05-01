import { Outlet } from "react-router-dom";
import SystemAdminNav from "../../components/system-admin/SystemAdminNav";

const SystemAdminRootLayout = () => {
  return (
    <div className="bg-gray-50 antialiased dark:bg-gray-900">
      <SystemAdminNav />
      <Outlet />
    </div>
  );
};
export default SystemAdminRootLayout;
