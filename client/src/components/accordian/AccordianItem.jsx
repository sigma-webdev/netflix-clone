import { CrossIcon } from "../icons";
import { PlusIcon } from "../icons";

const AccordianItem = ({
  accordianHandler,
  isActive,
  question,
  answer,
  id
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
      <h5 className="flex justify-between px-6 py-4 sm:py-5 md:py-6 text-md sm:lg md:text-2xl bg-[#132144] hover:bg-[#223362]">
        <button>{question}</button>
        <span>{!isActive ? <PlusIcon /> : <CrossIcon />}</span>
      </h5>
      <p
        className={`${
          isActive
            ? "bg-[#132144] p-6 text-md sm:text-lg md:text-2xl"
            : "hidden"
        } `}
      >
        {answer}
      </p>
    </li>
  );
};

export default AccordianItem;
