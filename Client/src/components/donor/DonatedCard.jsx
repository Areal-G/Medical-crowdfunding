const DonatedCard = () => {
  return (
    <div className="mb-2 rounded-lg border text-sm leading-6 shadow-lg hover:shadow-primary-400">
      <figure className="dark:highlight-white/5 relative flex flex-col-reverse rounded-lg bg-white p-4 dark:bg-slate-800">
        <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
          <p>I may not show it but i cant live without .</p>
        </blockquote>
        <figcaption className="flex items-center space-x-4">
          <img
            src="https://images.unsplash.com/photo-1632910121591-29e2484c0259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxjb2RlcnxlbnwwfDB8fHwxNzEwMTY0NjIzfDA&ixlib=rb-4.0.3&q=80&w=1080"
            alt=""
            className="h-14 w-14 flex-none rounded-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="flex-auto">
            <div className="text-base font-semibold text-slate-900 dark:text-slate-200">
              John Doe
            </div>
            <div className="mt-0.5 text-base font-semibold dark:text-slate-300">
              $500
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};
export default DonatedCard;
