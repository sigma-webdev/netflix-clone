import { Link } from "react-router-dom";
import {
  AddIcon,
  DisLikeIcon,
  DownArrowIcon,
  LikeIcon,
  PlayIcon,
} from "../icons";
import DetailsCard from "./DetailsCard";
import { createPortal } from "react-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
}) => {
  const [isOpenDetails, setIsOpenDetatils] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const openCloseDetails = () => {
    setIsOpenDetatils(!isOpenDetails);
  };

  const likeContent = () => {
    dispatch(likeContent());
    setIsLiked(!isLiked);
  };

  const dislikeContent = () => {
    dispatch(dislikeContent());
    setIsDisliked(!isDisliked);
  };

  return (
    <div className="bg-netflix-black drop-shadow-lg rounded tranistion duration-300 ease-in-out my-8 w-48 md:w-64 scale-100 hover:scale-125 hover:opacity-100 hover:z-10 hover:ml-10">
      {/* preview video*/}
      <div className="w-48 md:w-64">
        <video
          className="rounded-tl rounded-tr object-cover w-48 md:w-64 h-28 md:h-32"
          poster={thumbnailUrl}
          src={trailerUrl}
          loop
        ></video>
      </div>

      {/* preview details */}
      <div className="p-4 space-y-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="cursor-pointer">
              <Link to={`/watch/${contentId}`}>
                <PlayIcon />
              </Link>
            </div>
            <div onClick={likeContent} className="cursor-pointer">
              <LikeIcon isLiked={isLiked} />
            </div>
            <div onClick={dislikeContent} className="cursor-pointer">
              <DisLikeIcon isDisliked={isDisliked} />
            </div>
          </div>
          <div onClick={openCloseDetails} className="cursor-pointer">
            <DownArrowIcon />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-green-600 font-semibold">94% Matched</div>
          <div className="text-white border-[1px] border-white px-2 text-sm">
            {rating}
          </div>
          <div className="text-white border-[1px] border-white px-1 rounded text-xs h-fit">
            HD
          </div>
        </div>
        <div className="text-white">{geners.join(" . ")}</div>
      </div>

      {isOpenDetails &&
        createPortal(
          <div className="fixed top-0 z-50 pt-[4%] w-full h-full bg-black/60">
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
            />
          </div>,
          document.getElementById("content-details")
        )}
    </div>
  );
};

export default PreviewCard;
