import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import VideoController from "../components/video/VideoController";
import WatchShimmer from "../components/shimmer/WatchShimmer";
import { fetchContentById } from "../store/contentSlice";

const Watch = () => {
  const { contentId } = useParams();
  const userId = useSelector((state) => state.auth.userData._id);
  const LOADING = useSelector((state) => state.content.loading);
  const currentContent = useSelector((state) => state.content.currentContent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContentById({ contentId, userId }));
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
