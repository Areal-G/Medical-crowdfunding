import { useSearchParams, useParams } from "react-router-dom";

const ChapaRedirectPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("amp;tx_ref");
  const success = searchParams.get("success");
  const donationMessage = searchParams.get("amp;donationMessage");
  const isAnonymous = searchParams.get("amp;isAnonymous");
  const campaignId = id;
  console.log(ref);
  console.log(success);
  console.log("hi");
  if (success && ref) {
    console.log("redirect");
    window.location.href = `http://localhost:5173/campaigndetail/${campaignId}?success=true&tx_ref=${ref}&donationMessage=${donationMessage}&isAnonymous=${isAnonymous}`;
  }
  return <div>ChapaRedirectPage</div>;
};
export default ChapaRedirectPage;
