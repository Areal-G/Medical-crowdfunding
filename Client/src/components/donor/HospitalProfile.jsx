const HospitalProfile = () => {
  return (
    <div className="mx-auto my-10 max-w-sm overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-primary-400">
      <div className="relative">
        <img
          className="h-48 w-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-8UwgspWarHRcO4CFIc5Y4HDI58AHtgE1gw&s"
          alt="Profile Image"
        />
      </div>
      <div className="px-6 py-4">
        <div className=" mb-3 text-xl font-semibold text-gray-800">
          Hawassa Referral hospital
        </div>
        <p className="text-gray-600">
          Besides Tabor mountain <br /> Hawassa,sidama
        </p>
      </div>
    </div>
  );
};
export default HospitalProfile;
