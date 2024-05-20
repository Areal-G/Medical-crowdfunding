import { useSearchParams } from "react-router-dom";

const ChapaRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("amp;ref");
  const success = searchParams.get("success");
  console.log(ref);
  if (success && ref) {
    console.log("redirect");
    window.location.href = `http://localhost:5173/campaigndetail?success=true&tx_ref=${ref}`;
  }
  return <div>ChapaRedirectPage</div>;
};
export default ChapaRedirectPage;
