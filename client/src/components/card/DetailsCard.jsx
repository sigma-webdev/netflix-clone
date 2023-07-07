import { useRef, useState } from "react";
import { DisLikeIcon, LikeIcon } from "../icons";
import { dislikeContent, likeContent } from "../../store/contentSlice";
import { useDispatch, useSelector } from "react-redux";
import { RiPlayMiniFill } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";

const DetailsCard = ({
  contentId,
  name,
  thumbnailURL,
  trailerUrl,
  geners,
  rating,
  description,
  cast,
  director,
  handleClose,
  isLiked,
  isDisliked,
  releaseYear,
  contentDuration,
}) => {
  const userId = useSelector((state) => state.auth.userData._id);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const dispatch = useDispatch();

  function playPauseMedia() {
    const media = videoRef.current;

    if (media.paused) {
      media.play();
      setIsVideoPlaying(true);
    } else {
      media.pause();
      setIsVideoPlaying(false);
    }
  }

  const likeContentHanlder = () => {
    dispatch(likeContent({ contentId, userId: userId }));
  };

  const dislikeContentHanlder = () => {
    dispatch(dislikeContent({ contentId, userId: userId }));
  };

  return (
    <div className=" tranistion relative mx-auto w-[90%] rounded bg-netflix-black drop-shadow-lg duration-300 ease-in-out md:w-[800px]">
      <div className="relative">
        {/* preview video*/}
        <div className="absolute -bottom-1 h-[25px] w-full bg-gradient-to-b from-netflix-black/0 to-netflix-black/100 md:h-[100px] lg:h-[150px]"></div>
        <div className="w-full">
          <video
            ref={videoRef}
            className="w-full rounded-tl rounded-tr"
            poster={thumbnailURL}
            src={trailerUrl}
            loop
          ></video>
        </div>

        <div
          className="absolute right-2 top-2 cursor-pointer"
          onClick={handleClose}
        >
          <AiOutlineCloseCircle className="text-4xl text-white" />
        </div>

        {/* hero text */}
        <div className="absolute bottom-6 left-6 flex cursor-pointer items-center gap-2 md:bottom-8 md:left-12">
          <div
            className="flex cursor-pointer items-center gap-2 rounded bg-white px-2 py-1 text-sm font-semibold text-black md:px-4 md:text-lg "
            onClick={playPauseMedia}
          >
            <RiPlayMiniFill className="text-2xl lg:text-4xl" />
            Play
          </div>
          <div onClick={likeContentHanlder} className="cursor-pointer">
            <LikeIcon isLiked={isLiked} />
          </div>
          <div onClick={dislikeContentHanlder} className="cursor-pointer">
            <DisLikeIcon isDisliked={isDisliked} />
          </div>
        </div>
      </div>

      {/* preview details */}
      <div className="space-y-2 px-6 pb-3 text-white md:px-12 md:pb-8">
        <div className="mt-1 flex items-center gap-2">
          <div>{releaseYear}</div>
          <div>{contentDuration}</div>
          <div className="h-fit rounded border-[1px] border-gray-500 px-1 text-xs text-white">
            HD
          </div>
        </div>
        <div className="w-fit border-[1px] border-gray-500 px-2 text-sm text-white">
          {rating}
        </div>
        <div className="basis-2/3">{description}</div>
        <div className="space-y-4">
          <div className="text-4xl">About {name}</div>
          <div>
            <div>
              <span className="text-gray-400">Director:</span> {director}
            </div>
            <div>
              <span className="text-gray-400">Cast:</span> {cast}
            </div>
            <div>
              <span className="text-gray-400">Genres:</span>
              {geners.join(" . ")}
            </div>
            <div>
              <span className="text-gray-400">Maturity Rating:</span>
              <span className="border-[1px] border-white px-1 text-sm">
                {rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
