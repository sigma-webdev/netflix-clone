import { useRef, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiPauseMiniFill, RiPlayMiniFill } from "react-icons/ri";
import { LikeIcon, LikeIcon2 } from "../icons";

const DetailsCard = ({
  name,
  thumbnailURL,
  trailerUrl,
  geners,
  contentId,
  rating,
  description,
  cast,
  director,
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
        <div className="w-full">
          <video
            ref={videoRef}
            className="rounded-tl rounded-tr w-full"
            poster={thumbnailURL}
            src={trailerUrl}
            loop
          ></video>
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
      <div className="text-white px-10 md:px-20 py-5 md:py-10 space-y-4">
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
              <span className="text-gray-400">Genres:</span> {geners}
            </div>
            <div>
              <span className="text-gray-400">Maturity Rating:</span>{" "}
              <span className="text-white border-[1px] border-white px-2 text-sm">
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
