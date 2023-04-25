import { useState } from "react";
import AccordianItem from "./accordian-item";

const Accordian = () => {
  const [activeItem, setActiveItem] = useState("");

  const accordianHandler = (id) => {
    setActiveItem(id);
  };

  return (
    <ul>
      <AccordianItem
        accordianHandler={accordianHandler}
        isActive={"0" === activeItem ? true : false}
      ></AccordianItem>
      <li>
        <h2>
          <button>How much does Netflix cost</button>
        </h2>
      </li>
      <li>
        <h2>
          <button>Where can I watch?</button>
        </h2>
      </li>
      <li>
        <h2>
          <button>How do I cancel?</button>
        </h2>
      </li>
      <li>
        <h2>
          <button>What can I watch on Netflix?</button>
        </h2>
      </li>
      <li>
        <h2>
          <button>Is Netflix good for kids?</button>
        </h2>
      </li>
    </ul>
  );
};

export default Accordian;
