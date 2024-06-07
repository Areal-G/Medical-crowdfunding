import unauthorized from "../../assets/common/unauthorized.svg";
import { useTranslation } from "react-i18next";
import API from "../../components/Common/api";

import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";
const UnAuthorizedPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    const LogoutUser = () => {
      // Delay the logout operation by 3 seconds
      setTimeout(() => {
        API.get("/auth/logout")
          .then(() => {
            toast.error("You are logged out");

            // Delay the navigation by 2 seconds after showing the toast
            setTimeout(() => {
              navigate("/signin");
            }, 2000);
          })
          .catch((error) => {
            console.error("Logout error", error);
          });
      }, 2000);
    };

    LogoutUser();
  }, [navigate]);
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-12 py-8 ">
      <Toaster richColors />
      <img className="h-[70%]" src={unauthorized} alt="" />
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-medium">
          {t("unauthorized")}
        </h1>
        <p className="text-center text-xl ">{t("unauthorizedmessage")}</p>
      </div>
    </div>
  );
};
export default UnAuthorizedPage;
