/* eslint-disable react/prop-types */
const HospitalProfile = (props) => {
  return (
    <div className="mx-auto my-10 max-w-sm overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-primary-400">
      <div className="relative">
        <img
          className="h-48 w-full object-cover"
          src={props.image}
          alt="Profile Image"
        />
      </div>
      <div className="px-6 py-4">
        <div className=" mb-3 text-xl font-semibold text-gray-800">
          {props.name}
        </div>
        <p className="text-gray-600">
          {props.address} <br /> {props.city} , {props.state}
        </p>
      </div>
    </div>
  );
};
export default HospitalProfile;
