import { Outlet } from "react-router-dom";
import PatientNav from "../../components/patient/PatientNav";

const PatientRootLayout = () => {
  return (
    <div className="bg-gray-50 antialiased dark:bg-gray-900">
      <PatientNav />
      <div className="mr-4 h-auto p-4 pt-20 lg:ml-72">
        <Outlet />
      </div>
    </div>
  );
};
export default PatientRootLayout;
