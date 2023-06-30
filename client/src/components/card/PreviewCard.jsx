import { Link } from "react-router-dom";
import { DisLikeIcon, DownArrowIcon, LikeIcon, PlayIcon } from "../icons";
import DetailsCard from "./DetailsCard";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dislikeContent, likeContent } from "../../store/contentSlice";

const PreviewCard = ({
  name,
  description,
  cast,
  director,
  thumbnailUrl,
  trailerUrl,
  geners,
  contentId,
  rating,
  isLiked,
  isDisliked,
  releaseYear,
  contentDuration,
}) => {
  const [isOpenDetails, setIsOpenDetatils] = useState(false);
  const dispatch = useDispatch();

  const openCloseDetails = () => {
    setIsOpenDetatils(!isOpenDetails);
  };

  const likeContentHanlder = () => {
    dispatch(likeContent({ contentId, userId: "64789b082f388ccff2e33eaa" }));
  };

  const dislikeContentHanlder = () => {
    dispatch(dislikeContent({ contentId, userId: "64789b082f388ccff2e33eaa" }));
  };

  return (
    <div className="tranistion group my-8 w-48 scale-100 rounded drop-shadow-lg duration-300 ease-in-out hover:z-10 hover:ml-10 hover:scale-125 hover:bg-netflix-black hover:opacity-100 md:w-64">
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
              <Link to={`/watch/${contentId}`}>
                <PlayIcon />
              </Link>
            </div>
            <div onClick={likeContentHanlder} className="cursor-pointer">
              <LikeIcon isLiked={isLiked} />
            </div>
            <div onClick={dislikeContentHanlder} className="cursor-pointer">
              <DisLikeIcon isDisliked={isDisliked} />
            </div>
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
          <div className="fixed top-0 z-50 flex h-full w-full items-center bg-black/60  pt-[4%]">
            <DetailsCard
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
            />
          </div>,
          document.getElementById("content-details")
        )}
    </div>
  );
};

export default PreviewCard;
