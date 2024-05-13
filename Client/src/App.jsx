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
import CampaignDetailPage from "./pages/donor/CampaignDetailPage";

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
import PatientHomepage from "./pages/patient/PatientHomepage";
import MyCampaign from "./pages/patient/MyCampaign";
import PatientCampaignForm from "./components/patient/PatientCampaignForm";
import PatientUpdateForm from "./components/patient/PatientUpdateForm";
import SystemAdminDonorsTableComponent from "./components/system-admin/SystemAdminDonorsTableComponent";
import SystemAdminPatientsTableComponent from "./components/system-admin/SystemAdminPatientsTableComponent";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* home/donor route */}
      <Route path="/" element={<DonorRootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="campaign" element={<CampaignList />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="campaigndetail" element={<CampaignDetailPage />} />
      </Route>

      {/* patient route */}
      <Route path="/patient" element={<PatientRootLayout />}>
        <Route index element={<PatientHomepage />} />
        <Route path="mycampaign" element={<MyCampaign />} />
        <Route path="createcampaign" element={<PatientCampaignForm />} />
        <Route path="postupdate" element={<PatientUpdateForm />} />
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
        <Route path="donors" element={<SystemAdminDonorsTableComponent />} />
        <Route
          path="patients"
          element={<SystemAdminPatientsTableComponent />}
        />
      </Route>
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
