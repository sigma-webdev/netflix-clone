import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineInfoCircle } from "react-icons/ai";

// components
import Crousal from "../components/crousal/Crousal";
import Layout from "../components/layout/Layout";

// actions
import {
  fetchContent,
  fetchContentByLatest,
  fetchContentByTrending,
} from "../store/contentSlice";
import { RiPlayMiniFill } from "react-icons/ri";
import PreviewCard from "../components/card/PreviewCard";
import RowContentShimmer from "../components/shimmer/RowContentShimmer";
import PreviewShimmer from "../components/shimmer/PreviewShimmer";
import { Link } from "react-router-dom";

const Browse = () => {
  const content = useSelector((state) => state.content.filteredContent);
  const trendingContent = useSelector((state) => state.content.trendingContent);
  const latestContent = useSelector((state) => state.content.latestContent);
  const loading = useSelector((state) => state.content.loading);
  const trendingContentLoading = useSelector(
    (state) => state.content.trendingContentLoading
  );
  const latestContentLoading = useSelector(
    (state) => state.content.latestContentLoading
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContent("64789b082f388ccff2e33eaa"));
    dispatch(fetchContentByTrending("64789b082f388ccff2e33eaa"));
    dispatch(fetchContentByLatest("64789b082f388ccff2e33eaa"));
  }, [dispatch]);

  return (
    <Layout isLogin={true}>
      <div id="content-details" className="relative "></div>

      <div>
        {/* hero container */}
        <div className="relative">
          {/* hero video */}

          <div className="h-[400px] w-full md:h-[800px]">
            {loading ? (
              <PreviewShimmer />
            ) : (
              content &&
              content.length !== 0 && (
                <>
                  <div className="absolute -bottom-1 h-[50px] w-full bg-gradient-to-b from-netflix-blue/0 to-netflix-blue/100 md:h-[100px] lg:h-[200px]"></div>
                  <video
                    className="mx-auto h-[400px] w-full object-cover md:h-[800px]"
                    src={content[0].trailerUrl}
                    poster={content[0].thumbnailUrl}
                    autoPlay={true}
                    loop
                  ></video>
                </>
              )
            )}
          </div>

          {/* hero text */}
          {!loading && content && content.length !== 0 && (
            <div className="absolute bottom-6 left-6 flex cursor-pointer gap-2 md:bottom-12 md:left-12">
              <Link to={`/watch/${content[0].contentId}`}>
                <div className="flex cursor-pointer items-center gap-2 rounded bg-white px-2 py-1 text-sm font-semibold text-black md:px-4 md:text-lg ">
                  <RiPlayMiniFill className="text-xl lg:text-4xl" />
                  <div>Play</div>
                </div>
              </Link>
              <div className="flex cursor-pointer items-center gap-2  rounded bg-black px-2 py-1 text-sm font-semibold text-white opacity-80 md:px-4 md:text-lg">
                <AiOutlineInfoCircle className="text-md lg:text-2xl" />
                More Info
              </div>
            </div>
          )}
        </div>

        {/* browse all content */}
        {loading ? (
          <RowContentShimmer />
        ) : (
          content &&
          content.length !== 0 && (
            <div className="bg-netflix-blue text-white">
              <div className="px-4 md:px-8">
                <h3>All</h3>
                <div className="space-y-5">
                  <Crousal>
                    {Array.from(content).map((item) => {
                      return (
                        <PreviewCard
                          key={item.contentId}
                          name={item.name}
                          thumbnailUrl={item.thumbnailUrl}
                          trailerUrl={item.trailerUrl}
                          geners={item.genres}
                          contentId={item.contentId}
                          rating={item.rating}
                          description={item.description}
                          cast={item.cast}
                          director={item.director}
                          like={item.like}
                          dislike={item.dislike}
                          releaseYear={item.releaseYear}
                          contentDuration={item.contentDuration}
                        />
                      );
                    })}
                  </Crousal>
                </div>
              </div>
            </div>
          )
        )}

        {/* browse trending content */}
        {trendingContentLoading ? (
          <RowContentShimmer />
        ) : (
          trendingContent &&
          trendingContent.length !== 0 && (
            <div className="bg-netflix-blue text-white">
              <div className="px-4 md:px-8">
                <h3>Trending</h3>
                <div className="space-y-5">
                  <Crousal>
                    {Array.from(trendingContent).map((item) => {
                      return (
                        <PreviewCard
                          key={item.contentId}
                          name={item.name}
                          thumbnailUrl={item.thumbnailUrl}
                          trailerUrl={item.trailerUrl}
                          geners={item.genres}
                          contentId={item.contentId}
                          rating={item.rating}
                          description={item.description}
                          cast={item.cast}
                          director={item.director}
                          like={item.like}
                          dislike={item.dislike}
                          releaseYear={item.releaseYear}
                          contentDuration={item.contentDuration}
                        />
                      );
                    })}
                  </Crousal>
                </div>
              </div>
            </div>
          )
        )}

        {/* browse latest content */}
        {latestContentLoading ? (
          <RowContentShimmer />
        ) : (
          latestContent &&
          latestContent.length !== 0 && (
            <div className="bg-netflix-blue text-white">
              <div className="px-4 md:px-8">
                <h3>Latest</h3>
                <div className="space-y-5">
                  <Crousal>
                    {Array.from(latestContent).map((item) => {
                      return (
                        <PreviewCard
                          key={item.contentId}
                          name={item.name}
                          thumbnailUrl={item.thumbnailUrl}
                          trailerUrl={item.trailerUrl}
                          geners={item.genres}
                          contentId={item.contentId}
                          rating={item.rating}
                          description={item.description}
                          cast={item.cast}
                          director={item.director}
                          like={item.like}
                          dislike={item.dislike}
                          releaseYear={item.releaseYear}
                          contentDuration={item.contentDuration}
                        />
                      );
                    })}
                  </Crousal>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default Browse;
