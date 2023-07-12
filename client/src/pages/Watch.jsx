import { useDispatch, useSelector } from "react-redux";
import VideoController from "../components/video/VideoController";
import { fetchContentById } from "../store/contentSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import WatchShimmer from "../components/shimmer/WatchShimmer";

const Watch = () => {
  const { contentId } = useParams();
  const LOADING = useSelector((state) => state.content.loading);
  const currentContent = useSelector((state) => state.content.currentContent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchContentById({ contentId, userId: "64789b082f388ccff2e33eaa" })
    );
  }, [dispatch, contentId]);

  return (
    <div>
      {LOADING ? (
        <div className="h-screen">
          <WatchShimmer />
        </div>
      ) : (
        currentContent && (
          <VideoController
            contentURL={currentContent.contentUrl}
            thumbnailURL={currentContent.thumbnailUrl}
          />
        )
      )}
    </div>
  );
};

export default Watch;
