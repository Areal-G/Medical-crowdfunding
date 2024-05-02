import { Outlet } from "react-router-dom";
import SystemAdminNav from "../../components/system-admin/SystemAdminNav";

const SystemAdminRootLayout = () => {
  return (
    <div className="bg-gray-50 antialiased dark:bg-gray-900">
      <SystemAdminNav />
      <div className="h-auto p-4 pt-20 lg:ml-72">
        <Outlet />
      </div>
    </div>
  );
};
export default SystemAdminRootLayout;
