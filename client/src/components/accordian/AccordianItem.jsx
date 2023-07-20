import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

const AccordianItem = ({
  accordianHandler,
  isActive,
  question,
  answer,
  id,
}) => {
  // open and close accordian handler
  const tabHandler = () => {
    if (!isActive) {
      accordianHandler(id);
    } else {
      accordianHandler(-1);
    }
  };

  return (
    <li onClick={tabHandler}>
      {/* accordian heading */}
      <h5 className="text-md sm:lg flex cursor-pointer items-center justify-between bg-blue-950/80 px-6 py-4 hover:bg-blue-950/70 sm:py-5 md:py-6 md:text-2xl">
        {question}

        {!isActive ? (
          <AiOutlinePlus className="text-xl md:text-2xl lg:text-4xl" />
        ) : (
          <AiOutlineClose className="text-xl md:text-2xl lg:text-4xl" />
        )}
      </h5>

      {/* accordian description */}
      <p
        className={`${
          isActive ? "text-md bg-blue-950 p-6 sm:text-lg md:text-2xl" : "hidden"
        } `}
      >
        {answer}
      </p>
    </li>
  );
};

export default AccordianItem;
