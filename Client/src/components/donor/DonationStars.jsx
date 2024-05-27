/* eslint-disable react/prop-types */

import goldstar from "../../assets/img/donor/goldstar.svg";

const DonationStars = ({ raisedMoney }) => {
  // Determine the number of stars based on the raised money
  const getStarCount = (amount) => {
    if (amount >= 50000) return 5;
    if (amount >= 10000) return 4;
    if (amount >= 1000) return 3;
    if (amount >= 500) return 2;
    if (amount >= 100) return 1;
    return 0;
  };

  const starCount = getStarCount(raisedMoney);

  // Render the stars
  return (
    <div className="mt-2 flex">
      {Array.from({ length: starCount }).map((_, index) => (
        <img
          key={index}
          className="ml-2 h-6 w-6"
          src={goldstar}
          alt="gold star"
        />
      ))}
    </div>
  );
};

export default DonationStars;
