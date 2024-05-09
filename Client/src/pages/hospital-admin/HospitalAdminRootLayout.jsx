import { Outlet } from "react-router-dom";
import HospitalAdminNav from "../../components/hospital-admin/HospitalAdminNav";

const HospitalAdminRootLayout = () => {
  return (
    <div className="bg-gray-50 antialiased dark:bg-gray-900">
      <HospitalAdminNav />
      <div className="h-auto p-4 pt-20 lg:ml-72">
        <Outlet />
      </div>
    </div>
  );
};
export default HospitalAdminRootLayout;
