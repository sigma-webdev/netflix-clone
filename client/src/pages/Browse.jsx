import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/layout/Layout";
import {
  fetchContent,
  fetchContentByCountryOrigin,
  fetchContentByLatest,
  fetchContentByMostLiked,
  fetchContentByTrending,
  fetchContentByWatchHistory,
} from "../store/contentSlice";
import { RiPlayMiniFill } from "react-icons/ri";
import PreviewShimmer from "../components/shimmer/PreviewShimmer";
import { Link } from "react-router-dom";
import ContentRow from "../components/ContentRow";

const Browse = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userData._id);
  const {
    filteredContent: content,
    searchContent,
    trendingContent,
    latestContent,
    mostLikedContent,
    contentByCountryOrigin,
    watchedContent,
    loading,
    trendingContentLoading,
    latestContentLoading,
    mostLikedContentLoading,
    countryOriginContentLoading,
    watchContentLoading,
    searchLoading,
  } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent(userId));
    dispatch(fetchContentByTrending(userId));
    dispatch(fetchContentByLatest(userId));
    dispatch(fetchContentByMostLiked(userId));
    dispatch(
      fetchContentByCountryOrigin({
        userId: userId,
        countryOrigin: "USA",
      })
    );
    dispatch(
      fetchContentByCountryOrigin({
        userId: userId,
        countryOrigin: "India",
      })
    );
    dispatch(fetchContentByWatchHistory(userId));
  }, [dispatch]);

  return (
    <Layout isLogin={true}>
      <div id="content-details" className="relative"></div>
      <div id="browse-content">
        {/* browse search content */}

        {searchContent && (
          <div className="bg-netflix-blue pt-32 text-white">
            <div className="px-4 md:px-8">
              <ContentRow
                heading={"Search Results"}
                loading={searchLoading}
                content={searchContent}
              />
              {searchContent && searchContent.length === 0 && (
                <h3>No Data Found</h3>
              )}
            </div>
          </div>
        )}

        {!searchContent && (
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
                        muted
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
                </div>
              )}
            </div>

            {/* browse watch content */}
            <ContentRow
              heading={"Continue Watching"}
              loading={watchContentLoading}
              content={watchedContent}
            />

            {/* browse trending content */}
            <ContentRow
              heading={"Trending"}
              loading={trendingContentLoading}
              content={trendingContent}
            />

            {/* browse latest content */}
            <ContentRow
              heading={"Latest"}
              loading={latestContentLoading}
              content={latestContent}
            />

            {/* browse most liked content */}
            <ContentRow
              heading={"Most Liked"}
              loading={mostLikedContentLoading}
              content={mostLikedContent}
            />

            {/* browse content by country origin USA*/}
            {contentByCountryOrigin &&
              Object.keys(contentByCountryOrigin).find(
                (item) => item === "USA"
              ) &&
              contentByCountryOrigin["USA"].length !== 0 && (
                <ContentRow
                  heading={"USA"}
                  loading={countryOriginContentLoading}
                  content={contentByCountryOrigin["USA"]}
                />
              )}

            {/* browse content by country origin India*/}
            {contentByCountryOrigin &&
              Object.keys(contentByCountryOrigin).find(
                (item) => item === "India"
              ) &&
              contentByCountryOrigin["India"].length !== 0 && (
                <ContentRow
                  heading={"India"}
                  loading={countryOriginContentLoading}
                  content={contentByCountryOrigin["India"]}
                />
              )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Browse;
