const AccordianItem = ({ isActive, children, accordianHandler, id }) => {
  const tabHandler = (accordianHandler, id) => {
    if (!isActive) {
      accordianHandler(id);
    } else {
      accordianHandler(0);
    }
  };

  return (
    <li onClick={tabHandler}>
      <h2>
        <button>What is Netflix?</button>
      </h2>
      <p className={`${isActive ? "" : "hidden"}`}>
        Netflix is a streaming service that offers a wide variety of
        award-winning TV shows, movies, anime, documentaries and more – on
        thousands of internet-connected devices. <br /> You can watch as much as
        you want, whenever you want, without a single ad – all for one low
        monthly price. There's always something new to discover, and new TV
        shows and movies are added every week!
      </p>
    </li>
  );
};

export default AccordianItem;
