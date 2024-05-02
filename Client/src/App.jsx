import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// donor import
import DonorRootLayout from "./pages/donor/DonorRootLayout";
import HomePage from "./pages/donor/HomePage";
import CampaignList from "./components/donor/CampaignList";
import Signin from "./pages/donor/SignIn";
import Signup from "./pages/donor/SignUp";

//patient import
import PatientRootLayout from "./pages/patient/PatientRootLayout";

// system admin import
import SystemAdminRootLayout from "./pages/system-admin/SystemAdminRootLayout";
import SystemAdminHomePage from "./pages/system-admin/SystemAdminHomePage";
import SystemAdminRegisterHospitalsPage from "./pages/system-admin/SystemAdminRegisterHospitalsPage";

// hospital admin import
import HospitalAdminRootLayout from "./pages/hospital-admin/HospitalAdminRootLayout";
import HospitalAdminHomePage from "./pages/hospital-admin/HospitalAdminHomepage";
import SystemAdminHospitalsTable from "./pages/system-admin/SystemAdminHospitalsTable";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* home/donor route */}
      <Route path="/" element={<DonorRootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="campaign" element={<CampaignList />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      {/* patient route */}
      <Route path="/patient" element={<PatientRootLayout />}>
        <Route index element={<div>patient homepage</div>} />
      </Route>

      {/* hospita admin route */}
      <Route path="/hospital" element={<HospitalAdminRootLayout />}>
        <Route index element={<HospitalAdminHomePage />} />
      </Route>

      {/* system admin route */}
      <Route path="/admin" element={<SystemAdminRootLayout />}>
        <Route index element={<SystemAdminHomePage />} />
        <Route path="register" element={<SystemAdminRegisterHospitalsPage />} />
        <Route path="hospitals" element={<SystemAdminHospitalsTable />} />
      </Route>
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
