import { Outlet } from "react-router-dom";

const PatientRootLayout = () => {
  return (
    <div>
      <p>nav</p>
      <Outlet />
      <p>footer</p>
    </div>
  );
};
export default PatientRootLayout;
