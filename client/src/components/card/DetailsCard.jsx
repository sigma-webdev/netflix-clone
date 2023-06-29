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
    <div className="tranistion relative mx-auto w-[90%] rounded bg-netflix-black drop-shadow-lg duration-300 ease-in-out md:w-[800px]">
      <div className="relative">
        {/* preview video*/}
        <div className="absolute -bottom-1 h-[25px] w-full bg-gradient-to-b from-netflix-black/0 to-netflix-black/100 md:h-[50px] lg:h-[100px]"></div>
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
          <CloseIcon />
        </div>

        {/* hero text */}
        <div className="absolute bottom-8 left-6 flex cursor-pointer gap-2 md:bottom-10 md:left-12">
          <div
            className="flex cursor-pointer items-center gap-2 rounded bg-white px-2 py-1 text-sm font-semibold text-black md:px-4 md:text-lg "
            onClick={playPauseMedia}
          >
            <RiPlayMiniFill className="text-xl lg:text-4xl" />
            Play
          </div>
          <div className="flex cursor-pointer items-center gap-2  rounded px-2 text-sm font-semibold text-white opacity-80 md:px-4 md:text-lg">
            <LikeIcon2 />
          </div>
        </div>
      </div>

      {/* preview details */}
      <div className="space-y-2 px-6 pb-3 text-white md:px-12 md:pb-8">
        <div className="mt-1 flex items-center gap-2">
          <div>2023</div>
          <div>1hr 55m</div>
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
              <span className="text-gray-400">Genres:</span>{" "}
              {geners.join(" . ")}
            </div>
            <div>
              <span className="text-gray-400">Maturity Rating:</span>
              <span className="border-[1px] border-white px-1 text-sm text-gray-500">
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
