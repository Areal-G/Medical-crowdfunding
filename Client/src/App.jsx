import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import RootLayout from "./pages/donor/DonorRootLayout";
import HomePage from "./pages/donor/HomePage";
import Campaign from "./components/donor/CampaignComp";
import Signin from "./pages/donor/SignIn";
import Signup from "./pages/donor/SignUp";
import PatientRootLayout from "./pages/patient/PatientRootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* home/donor route */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="campaign" element={<Campaign />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      {/* patient route */}
      <Route path="/patient" element={<PatientRootLayout />}></Route>
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
