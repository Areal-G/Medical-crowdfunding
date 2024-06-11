/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import avatar from "../../assets/img/donor/avatar.jpg";
const DonatedCard = (props) => {
  const avatarImage = props.image || avatar;
  const name = props.name || "Anonymous";
  return (
    <div className="mb-2 rounded-lg border text-sm leading-6 shadow-lg hover:shadow-primary-400">
      <figure className="dark:highlight-white/5 relative flex flex-col-reverse rounded-lg bg-white p-4 dark:bg-slate-800">
        <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
          <p>{props.message}</p>
        </blockquote>
        <figcaption className="flex items-center space-x-4">
          <img
            src={avatarImage}
            alt=""
            className="h-14 w-14 flex-none rounded-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="flex-auto">
            <div className="text-base font-semibold text-slate-900 dark:text-slate-200">
              {name}
            </div>
            <div className="mt-0.5 text-base font-semibold uppercase dark:text-slate-300">
              {props.amount.toLocaleString()} {props.currency}
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};
export default DonatedCard;
