import VideoShimmer from "./VideoShimmer";

const RowContentShimmer = () => {
  return (
    <div className="flex-start flex gap-4 overflow-hidden overflow-x-hidden scroll-smooth py-12 ">
      {Array(10)
        .fill("")
        .map((item) => {
          return (
            <div key={item} className="h-28 w-48 flex-shrink-0 md:h-32 md:w-64">
              <VideoShimmer />
            </div>
          );
        })}
    </div>
  );
};

export default RowContentShimmer;
