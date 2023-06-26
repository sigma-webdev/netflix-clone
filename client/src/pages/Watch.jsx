import { useDispatch, useSelector } from "react-redux";
import VideoController from "../components/video/VideoController";
import { fetchContentById } from "../store/contentSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Watch = () => {
  const { contentId } = useParams();
  const CONTENT_LOADING = useSelector((state) => state.content.loading);
  const currentContent = useSelector((state) => state.content.currentContent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContentById(contentId));
  }, []);

  return (
    <div>
      {CONTENT_LOADING
        ? "...loading"
        : currentContent && (
            <VideoController
              contentURL={currentContent.content[0].contentURL}
              thumbnailURL={currentContent.thumbnail[0].thumbnailUrl}
            />
          )}
    </div>
  );
};

export default Watch;
