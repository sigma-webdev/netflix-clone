import PreviewShimmer from "./PreviewShimmer";

const BrowseShimmer = () => {
  return (
    <>
      <div className="h-[400px] w-full md:h-[800px]">
        <PreviewShimmer />
      </div>
      <div>
        <div className="mx-6 my-6 flex gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
            return (
              <div key={item} className="h-28 w-48 md:h-32 md:w-64">
                <PreviewShimmer />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BrowseShimmer;
