import { Outlet } from "react-router-dom";
import HospitalAdminNav from "../../components/hospital-admin/HospitalAdminNav";

const HospitalAdminRootLayout = () => {
  return (
    <div className="bg-gray-50 antialiased dark:bg-gray-900">
      <HospitalAdminNav />
      <Outlet />
    </div>
  );
};
export default HospitalAdminRootLayout;
