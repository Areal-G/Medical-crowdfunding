import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import PrivateRoute from "./components/Common/PrivateRoute";

// donor import
import DonorRootLayout from "./pages/donor/DonorRootLayout";
import HomePage from "./pages/donor/HomePage";
import CampaignList from "./components/donor/CampaignList";
import Signin from "./pages/donor/SignIn";
import Signup from "./pages/donor/SignUp";
import CampaignDetailPage from "./pages/donor/CampaignDetailPage";

//patient import
import PatientRootLayout from "./pages/patient/PatientRootLayout";
import PatientHomepage from "./pages/patient/PatientHomepage";
import MyCampaign from "./pages/patient/MyCampaign";
import PatientCampaignForm from "./components/patient/PatientCampaignForm";
import PatientUpdateForm from "./components/patient/PatientUpdateForm";

// system admin import
import SystemAdminRootLayout from "./pages/system-admin/SystemAdminRootLayout";
import SystemAdminHomePage from "./pages/system-admin/SystemAdminHomePage";
import SystemAdminRegisterHospitalsPage from "./pages/system-admin/SystemAdminRegisterHospitalsPage";
import SystemAdminHospitalsTable from "./pages/system-admin/SystemAdminHospitalsTable";
import SystemAdminDonorsTableComponent from "./components/system-admin/SystemAdminDonorsTableComponent";
import SystemAdminPatientsTableComponent from "./components/system-admin/SystemAdminPatientsTableComponent";

// hospital admin import
import HospitalAdminRootLayout from "./pages/hospital-admin/HospitalAdminRootLayout";
import HospitalAdminHomePage from "./pages/hospital-admin/HospitalAdminHomepage";
import HospitalAdminRegisterPatinentForm from "./pages/hospital-admin/HospitalAdminRegisterPatinentForm";
import HospitalAdminPatientsTable from "./components/hospital-admin/HospitalAdminPatientsTable";
import ChapaRedirectPage from "./pages/donor/ChapaRedirectPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* home/donor route */}
      <Route path="/" element={<DonorRootLayout />}>
        <Route index element={<HomePage />} />
        {/* <Route path="campaign" element={<CampaignList />} /> */}
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="campaigndetail/:id" element={<CampaignDetailPage />} />
        <Route path="chaparedirect" element={<ChapaRedirectPage />} />
      </Route>

      {/* patient route */}
      <Route
        path="/patient"
        element={
          <PrivateRoute element={<PatientRootLayout />} role={"patient"} />
        }
      >
        <Route index element={<PatientHomepage />} />
        <Route path="mycampaign" element={<MyCampaign />} />
        <Route path="createcampaign" element={<PatientCampaignForm />} />
        <Route path="postupdate" element={<PatientUpdateForm />} />
      </Route>

      {/* hospita admin route */}
      <Route
        path="/hospital"
        element={
          <PrivateRoute
            element={<HospitalAdminRootLayout />}
            role={"hospital"}
          />
        }
      >
        <Route index element={<HospitalAdminHomePage />} />
        <Route
          path="register"
          element={<HospitalAdminRegisterPatinentForm />}
        />
        <Route path="patients" element={<HospitalAdminPatientsTable />} />
      </Route>

      {/* system admin route */}
      <Route
        path="/admin"
        element={
          <PrivateRoute
            element={<SystemAdminRootLayout />}
            role={"systemAdmin"}
          />
        }
      >
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
