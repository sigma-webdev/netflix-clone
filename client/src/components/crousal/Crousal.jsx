import { useRef } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import PreviewCard from "../../components/card/PreviewCard";
import { IconContext } from "react-icons/lib";

const Crousal = ({ content }) => {
  const ref = useRef(null);

  const handleLeftArrow = () => {
    ref.current.scrollLeft -= ref.current.offsetWidth;
    console.log(ref.current);
  };

  const handleRightArrow = () => {
    ref.current.scrollLeft += ref.current.offsetWidth;
  };

  return (
    <div
      ref={ref}
      className="flex flex-nowrap scroll-smooth space-x-2 overflow-hidden items-center"
    >
      <div
        className="absolute hidden md:block cursor-pointer px-2 p-8 transition opacity-10 hover:opacity-50 bg-slate-900"
        onClick={handleLeftArrow}
      >
        <IconContext.Provider value={{ size: "30px", color: "#ffffff" }}>
          <SlArrowLeft />
        </IconContext.Provider>
      </div>
      {content &&
        content.map((item) => {
          return (
            <PreviewCard key={item.id} contentPoster={item.contentPoster} />
          );
        })}
      <div
        className="absolute right-0 hidden md:block cursor-pointer px-2 p-8 transition opacity-10 hover:opacity-60 bg-slate-900"
        onClick={handleRightArrow}
      >
        <IconContext.Provider value={{ size: "30px", color: "#ffffff" }}>
          <SlArrowRight />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Crousal;
