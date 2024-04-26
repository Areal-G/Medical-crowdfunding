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
// hospital admin import
import HospitalAdminRootLayout from "./pages/hospital-admin/HospitalAdminRootLayout";

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
        <Route index element={<div>hospital homepage</div>} />
      </Route>
      {/* system admin route */}
      <Route path="/admin" element={<SystemAdminRootLayout />}>
        <Route index element={<div> system admin homepage</div>} />
      </Route>
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
