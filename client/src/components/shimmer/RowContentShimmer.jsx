import PreviewShimmer from "./PreviewShimmer";

const RowContentShimmer = () => {
  return (
    <div className="flex-start flex gap-4 overflow-hidden overflow-x-hidden scroll-smooth py-12 ">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
        return (
          <div key={item} className="h-28 w-48 flex-shrink-0 md:h-32 md:w-64">
            <PreviewShimmer />
          </div>
        );
      })}
    </div>
  );
};

export default RowContentShimmer;
