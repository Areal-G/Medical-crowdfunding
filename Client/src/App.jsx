import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "preline/preline";

import PrivateRoute from "./components/Common/PrivateRoute";

// donor import
import DonorRootLayout from "./pages/donor/DonorRootLayout";
import HomePage from "./pages/donor/HomePage";
import SignInPage from "./pages/donor/SignInPage";
import SignUpPage from "./pages/donor/SignUpPage";
import CampaignDetailPage from "./pages/donor/CampaignDetailPage";
import ChapaRedirectPage from "./pages/donor/ChapaRedirectPage";
import Donations from "./pages/donor/Donations";

// patient import
import PatientRootLayout from "./pages/patient/PatientRootLayout";
import PatientHomePage from "./pages/patient/PatientHomePage";
import PatientMyCampaignPage from "./pages/patient/PatientMyCampaignPage";
import PatientCreateCampaignPage from "./pages/patient/PatientCreateCampaignPage";
import PatientPostUpdatePage from "./pages/patient/PatientPostUpdatePage";

// system admin import
import SystemAdminRootLayout from "./pages/system-admin/SystemAdminRootLayout";
import SystemAdminHomePage from "./pages/system-admin/SystemAdminHomePage";
import SystemAdminRegisterHospitalsPage from "./pages/system-admin/SystemAdminRegisterHospitalsPage";
import SystemAdminHospitalsPage from "./pages/system-admin/SystemAdminHospitalsPage";
import SystemAdminDonorsPage from "./pages/system-admin/SystemAdminDonorsPage";
import SystemAdminPatientsPage from "./pages/system-admin/SystemAdminPatientsPage";
import SystemAdminCampaignsPage from "./pages/system-admin/SystemAdminCampaignsPage";

// hospital admin import
import HospitalAdminRootLayout from "./pages/hospital-admin/HospitalAdminRootLayout";
import HospitalAdminHomePage from "./pages/hospital-admin/HospitalAdminHomePage";
import HospitalAdminRegisterPatinentForm from "./pages/hospital-admin/HospitalAdminRegisterPatinentForm";
import HospitalAdminPatientsPage from "./pages/hospital-admin/HospitalAdminPatientsPage";
import HospitalAdminApproveCampaignsPage from "./pages/hospital-admin/HospitalAdminApproveCampaignsPage";
import CampaignDetailsAdminPage from "./components/Common/CampaignDetailsAdminPage";
import HospitalAdminCampaignsPage from "./pages/hospital-admin/HospitalAdminCampaignsPage";
import MyDonatedCampaignDetailPage from "./pages/donor/MyDonatedCampaignDetailPage";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, [location.pathname]);

  return (
    <Routes>
      {/* home/donor route */}
      <Route path="/" element={<DonorRootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="campaigndetail/:id" element={<CampaignDetailPage />} />
        <Route path="chaparedirect/:id" element={<ChapaRedirectPage />} />
        <Route path="donations" element={<Donations />} />
        <Route
          path="mydonatedcampaign/:id"
          element={<MyDonatedCampaignDetailPage />}
        />
      </Route>

      {/* patient route */}
      <Route
        path="/patient"
        element={
          <PrivateRoute element={<PatientRootLayout />} role={"patient"} />
        }
      >
        <Route index element={<PatientHomePage />} />
        <Route path="mycampaign" element={<PatientMyCampaignPage />} />
        <Route path="createcampaign" element={<PatientCreateCampaignPage />} />
        <Route path="postupdate" element={<PatientPostUpdatePage />} />
      </Route>

      {/* hospital admin route */}
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
        <Route path="patients" element={<HospitalAdminPatientsPage />} />
        <Route path="approve" element={<HospitalAdminApproveCampaignsPage />} />
        <Route path="campaigns" element={<HospitalAdminCampaignsPage />} />
        <Route
          path="campaigndetail/:id"
          element={<CampaignDetailsAdminPage />}
        />
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
        <Route path="hospitals" element={<SystemAdminHospitalsPage />} />
        <Route path="donors" element={<SystemAdminDonorsPage />} />
        <Route path="patients" element={<SystemAdminPatientsPage />} />
        <Route path="campaigns" element={<SystemAdminCampaignsPage />} />
        <Route
          path="campaigndetail/:id"
          element={<CampaignDetailsAdminPage />}
        />
      </Route>
    </Routes>
  );
}

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
