import CrossIcon from "../icon/CrossIcon";
import PlusIcon from "../icon/PlusIcon";

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
      <h2 className="flex justify-between p-6 text-2xl bg-[#132144] hover:bg-[#223362]">
        <button>{question}</button>
        <span>{!isActive ? <PlusIcon /> : <CrossIcon />}</span>
      </h2>
      <p
        className={`${
          isActive
            ? "bg-[#132144] p-6 text-2xl divide-solid divide-y-2 "
            : "hidden transition-all delay-75 ease-in-out"
        } `}
      >
        {answer}
      </p>
    </li>
  );
};

export default AccordianItem;
