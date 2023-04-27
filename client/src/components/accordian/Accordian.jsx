import { useState } from "react";
import AccordianItem from "./Accordian-Item";

const data = [
  {
    id: 1,
    question: "How much does Netflix cost?",
    answer:
      "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices.  You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!",
  },
  {
    id: 2,
    question: "Where can I watch?",
    answer:
      "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 149 to ₹ 649 a month. No extra costs, no contracts.",
  },
  {
    id: 3,
    question: "What can I watch on Netflix?",
    answer:
      "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
  },
  {
    id: 4,
    question: "How do I cancel?",
    answer:
      "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
  },
  {
    id: 5,
    question: "Is Netflix good for kids?",
    answer:
      "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
  },
];

const Accordian = () => {
  const [activeItem, setActiveItem] = useState(-1);

  const accordianHandler = (id) => {
    setActiveItem(id);
  };

  return (
    <ul className="space-y-2 w-full mx-auto">
      {data.map((item) => {
        return (
          <AccordianItem
            accordianHandler={accordianHandler}
            isActive={item.id === activeItem ? true : false}
            question={item.question}
            answer={item.answer}
            id={item.id}
          ></AccordianItem>
        );
      })}
    </ul>
  );
};

export default Accordian;
