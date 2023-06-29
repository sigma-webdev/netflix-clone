import { CrossIcon } from "../icons";
import { PlusIcon } from "../icons";

const AccordianItem = ({
  accordianHandler,
  isActive,
  question,
  answer,
  id,
}) => {
  const tabHandler = () => {
    if (!isActive) {
      accordianHandler(id);
    } else {
      accordianHandler(-1);
    }
  };

  return (
    <li onClick={tabHandler}>
      <h5 className="text-md sm:lg flex justify-between bg-[#132144] px-6 py-4 hover:bg-[#223362] sm:py-5 md:py-6 md:text-2xl">
        <button>{question}</button>
        <span>{!isActive ? <PlusIcon /> : <CrossIcon />}</span>
      </h5>
      <p
        className={`${
          isActive
            ? "text-md bg-[#132144] p-6 sm:text-lg md:text-2xl"
            : "hidden"
        } `}
      >
        {answer}
      </p>
    </li>
  );
};

export default AccordianItem;
