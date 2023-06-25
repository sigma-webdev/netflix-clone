import { useDispatch, useSelector } from "react-redux";
import VideoController from "../components/video/VideoController";
import { fetchContentById } from "../store/contentSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Watch = () => {
  const { contentId } = useParams();
  const CONTENT_LOADING = useSelector((state) => state.content.loading);
  const watchContent = useSelector((state) => state.content.watchContent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContentById(contentId));
  }, []);

  return (
    <div>
      {CONTENT_LOADING
        ? "...loading"
        : watchContent && (
            <VideoController
              contentURL={watchContent.content[0].contentURL}
              thumbnailURL={watchContent.thumbnail[0].thumbnailUrl}
            />
          )}
    </div>
  );
};

export default Watch;
