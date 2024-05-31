/* eslint-disable react/prop-types */
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

const Carousel = ({ children }) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((prevState) =>
      prevState === 0 ? children.length - 1 : prevState - 1,
    );

  const next = () =>
    setCurr((prevState) =>
      prevState === children.length - 1 ? 0 : prevState + 1,
    );

  return (
    <div className="relative h-[400px]  w-full overflow-hidden rounded-lg shadow-lg">
      <div
        className="absolute bottom-0 left-0 right-0 top-0 flex transition-transform duration-500 ease-linear"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {children.map((child, index) => (
          <div className="relative min-h-full min-w-full" key={index}>
            <img
              className="center absolute inset-0 h-full w-full object-cover"
              src={child.props.src}
              alt=""
            />
          </div>
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute bottom-0 left-0 top-0 z-10 m-auto w-10 bg-white bg-opacity-30 focus:outline-none"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={next}
        className="absolute bottom-0 right-0 top-0 z-10 m-auto w-10 bg-white bg-opacity-30 focus:outline-none"
      >
        <ChevronRight />
      </button>
    </div>
  );
};
export default Carousel;
