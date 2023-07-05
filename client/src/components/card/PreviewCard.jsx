import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContentToWatchHistory,
  dislikeContent,
  likeContent,
} from "../../store/contentSlice";
import { DisLikeIcon, DownArrowIcon, LikeIcon, PlayIcon } from "../icons";
import DetailsCard from "./DetailsCard";

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
}) => {
  const likeDisLikeLoading = useSelector(
    (state) => state.content.likeDisLikeLoading
  );
  const [isOpenDetails, setIsOpenDetatils] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openCloseDetails = () => {
    setIsOpenDetatils(!isOpenDetails);

    if (!isOpenDetails) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "initial";
    }
  };

  const likeContentHanlder = () => {
    dispatch(likeContent({ contentId, userId: "64789b082f388ccff2e33eaa" }));
  };

  const dislikeContentHanlder = () => {
    dispatch(dislikeContent({ contentId, userId: "64789b082f388ccff2e33eaa" }));
  };

  const handlePlay = (contentId) => {
    dispatch(addContentToWatchHistory(contentId));
    navigate(`/watch/${contentId}`);
  };

  return (
    <div className="group w-48 scale-100 rounded drop-shadow-lg transition duration-300 ease-in-out hover:z-10 hover:ml-10 hover:scale-125 hover:bg-netflix-black hover:opacity-100 md:w-64">
      {/* preview video*/}
      <div className="w-48 md:w-64">
        <video
          className="h-28 w-48 rounded-tl rounded-tr object-cover md:h-32 md:w-64"
          poster={thumbnailUrl}
          src={trailerUrl}
          loop
        ></video>
      </div>

      {/* preview details */}
      <div className="hidden space-y-4 p-4 group-hover:block">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="cursor-pointer">
              <button onClick={() => handlePlay(contentId)}>
                <PlayIcon />
              </button>
            </div>
            <button
              onClick={likeContentHanlder}
              className="cursor-pointer"
              disabled={likeDisLikeLoading}
            >
              <LikeIcon isLiked={isLiked} />
            </button>
            <button
              onClick={dislikeContentHanlder}
              className="cursor-pointer"
              disabled={likeDisLikeLoading}
            >
              <DisLikeIcon isDisliked={isDisliked} />
            </button>
          </div>
          <div onClick={openCloseDetails} className="cursor-pointer">
            <DownArrowIcon />
          </div>
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

      {isOpenDetails &&
        createPortal(
          <div className="fixed top-0 z-50 flex h-full w-full items-center bg-black/60 ">
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
