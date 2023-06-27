import { useRef, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiPauseMiniFill, RiPlayMiniFill } from "react-icons/ri";
import { CloseIcon, LikeIcon, LikeIcon2 } from "../icons";

const DetailsCard = ({
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
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

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

  return (
    <div className="bg-netflix-black drop-shadow-lg rounded tranistion duration-300 ease-in-out relative w-[90%] md:w-[800px] mx-auto">
      <div className="relative">
        {/* preview video*/}
        <div className="absolute w-full bg-gradient-to-b to-netflix-black/100 from-netflix-black/0 h-[25px] md:h-[50px] lg:h-[100px] -bottom-1"></div>
        <div className="w-full">
          <video
            ref={videoRef}
            className="rounded-tl rounded-tr w-full"
            poster={thumbnailURL}
            src={trailerUrl}
            loop
          ></video>
        </div>

        <div
          className="absolute right-2 top-2 cursor-pointer"
          onClick={handleClose}
        >
          <CloseIcon />
        </div>

        {/* hero text */}
        <div className="absolute flex gap-2 bottom-8 left-6 md:bottom-10 md:left-12 cursor-pointer">
          <div
            className="flex items-center gap-2 text-black font-semibold bg-white px-2 md:px-4 py-1 rounded cursor-pointer text-sm md:text-lg "
            onClick={playPauseMedia}
          >
            <RiPlayMiniFill className="text-xl lg:text-4xl" />
            Play
          </div>
          <div className="flex items-center gap-2 font-semibold  text-white px-2 md:px-4 rounded opacity-80 cursor-pointer text-sm md:text-lg">
            <LikeIcon2 />
          </div>
        </div>
      </div>

      {/* preview details */}
      <div className="text-white px-6 md:px-12 pb-3 md:pb-8 space-y-2">
        <div className="flex items-center gap-2 mt-1">
          <div>2023</div>
          <div>1hr 55m</div>
          <div className="text-white border-[1px] border-gray-500 px-1 rounded text-xs h-fit">
            HD
          </div>
        </div>
        <div className="text-white border-[1px] border-gray-500 px-2 text-sm w-fit">
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
              <span className="text-gray-400">Genres:</span>{" "}
              {geners.join(" . ")}
            </div>
            <div>
              <span className="text-gray-400">Maturity Rating:</span>
              <span className="text-gray-500 border-[1px] border-white px-1 text-sm">
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
