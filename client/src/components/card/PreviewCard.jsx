import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContentToWatchHistory,
  addContentToWatchList,
  removeContentFromWatchList,
  dislikeContent,
  likeContent,
} from "../../store/contentSlice";
import DetailsCard from "./DetailsCard";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineArrowDown,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";

const PreviewCard = ({
  contentId,
  name,
  description,
  cast,
  director,
  thumbnailUrl,
  trailerUrl,
  geners,
  rating,
  isLiked,
  isDisliked,
  releaseYear,
  contentDuration,
  watch,
}) => {
  const userId = useSelector((state) => state.auth.userData._id);
  const { likeDisLikeLoading, watchHistoryLoading } = useSelector(
    (state) => state.content
  );
  const [isOpenDetails, setIsOpenDetatils] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  function playPauseMedia() {
    const media = videoRef.current;

    if (media.paused) {
      media.play();
    } else {
      media.pause();
      media.load();
    }
  }

  const openCloseDetails = () => {
    setIsOpenDetatils(!isOpenDetails);

    if (!isOpenDetails) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "initial";
    }
  };

  const likeContentHanlder = () => {
    dispatch(likeContent({ contentId, userId }));
  };

  const dislikeContentHanlder = () => {
    dispatch(dislikeContent({ contentId, userId }));
  };

  const watchListHandler = () => {
    if (watch) {
      dispatch(removeContentFromWatchList({ contentId }));
    } else {
      dispatch(addContentToWatchList({ contentId }));
    }
  };

  const handlePlay = (contentId) => {
    dispatch(addContentToWatchHistory({ contentId }));

    navigate(`/watch/${contentId}`);
  };

  return (
    <div
      className="my-8 w-48 scale-100 rounded bg-netflix-black drop-shadow-lg transition duration-300 ease-in-out hover:z-10 hover:ml-4 hover:scale-125 hover:opacity-100 md:w-64"
      onMouseLeave={() => playPauseMedia()}
      onMouseEnter={() => playPauseMedia()}
    >
      {/* preview video*/}
      <div className="w-48 md:w-64">
        <video
          ref={videoRef}
          className="h-28 w-48 rounded-tl rounded-tr object-cover md:h-32 md:w-64"
          poster={thumbnailUrl}
          src={trailerUrl}
          loop
          muted
        ></video>
      </div>

      {/* preview details */}
      <div className="space-y-4 p-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="cursor-pointer">
              <button
                onClick={() => handlePlay(contentId)}
                className="cursor-pointer rounded-full border-2 border-white p-[0.35rem]"
              >
                <BsFillPlayFill className="text-xl" />
              </button>
            </div>
            <button
              onClick={likeContentHanlder}
              className="cursor-pointer rounded-full border-2 border-white p-[0.35rem]"
              disabled={likeDisLikeLoading}
            >
              <AiFillLike
                className={`${
                  isLiked ? "text-green-500" : "text-white hover:text-green-500"
                } text-xl`}
              />
            </button>
            <button
              onClick={dislikeContentHanlder}
              className="cursor-pointer rounded-full border-2 border-white p-[0.35rem]"
              disabled={likeDisLikeLoading}
            >
              <AiFillDislike
                className={`${
                  isDisliked ? "text-red-500" : "text-white hover:text-red-500"
                } text-xl`}
              />
            </button>
            <button
              onClick={watchListHandler}
              disabled={watchHistoryLoading}
              className="cursor-pointer rounded-full border-2 border-white p-[0.35rem]"
            >
              {watch ? (
                <AiOutlineMinus className="text-xl" />
              ) : (
                <AiOutlinePlus className="text-xl" />
              )}
            </button>
          </div>
          <button
            onClick={openCloseDetails}
            className="cursor-pointer rounded-full border-2 border-white p-[0.35rem]"
          >
            <AiOutlineArrowDown className="text-xl" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="font-semibold text-green-600">94% Matched</div>
          <div className="border-[1px] border-white px-2 text-sm text-white">
            {rating}
          </div>
          <div className="h-fit rounded border-[1px] border-white px-1 text-xs text-white">
            HD
          </div>
        </div>
        <div className="text-white">{geners.join(" . ")}</div>
      </div>

      {/* modal for video description */}
      {isOpenDetails &&
        createPortal(
          <div className="fixed top-0 z-50 flex h-full w-full items-center overflow-hidden bg-black/60 ">
            <DetailsCard
              contentId={contentId}
              name={name}
              description={description}
              cast={cast}
              director={director}
              thumbnailURL={thumbnailUrl}
              trailerUrl={trailerUrl}
              geners={geners}
              rating={rating}
              handleClose={openCloseDetails}
              releaseYear={releaseYear}
              contentDuration={contentDuration}
              isLiked={isLiked}
              isDisliked={isDisliked}
            />
          </div>,
          document.getElementById("content-details")
        )}
    </div>
  );
};

export default PreviewCard;
