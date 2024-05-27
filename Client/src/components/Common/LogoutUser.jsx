import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import { Toaster, toast } from "sonner";

const LogoutUser = () => {
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/auth/logout")
      .then(() => {
        setLogoutSuccess(true);
        toast.success("Logged out successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect to login page after 2 seconds
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  }, [navigate]);

  return (
    <div>{logoutSuccess ? <Toaster richColors /> : <p>Logging out...</p>}</div>
  );
};

export default LogoutUser;
