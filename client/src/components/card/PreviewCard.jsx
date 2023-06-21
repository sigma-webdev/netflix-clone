import { Link } from "react-router-dom";
import { AddIcon, DownArrowIcon, LikeIcon, PlayIcon } from "../icons";
import { useRef } from "react";

const PreviewCard = ({ thumbnailURL, trailerUrl, geners, contentId }) => {
  const thumbnailRef = useRef(null);
  const previewRef = useRef(null);
  const videoRef = useRef(null);

  return (
    <div
      className="bg-netflix-black drop-shadow-lg rounded tranistion duration-300 ease-in-out relative my-8 hover:scale-110 hover:z-50 hover:ml-2 w-48 md:w-72"
      ref={thumbnailRef}
    >
      {/* preview video*/}
      <div className="w-48 md:w-72">
        <video
          className="rounded-tl rounded-tr object-contain"
          poster={thumbnailURL}
          ref={videoRef}
          src={trailerUrl}
          loop
        ></video>
      </div>

      {/* preview details */}
      <div className="p-4 space-y-4" ref={previewRef}>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="cursor-pointer">
              <Link to={`/watch/${contentId}`}>
                <PlayIcon />
              </Link>
            </div>
            <div>
              <AddIcon />
            </div>
            <div>
              <LikeIcon />
            </div>
          </div>
          <div>
            <DownArrowIcon />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-green-600 font-semibold">94% Matched</div>
          <div className="text-white border-2 border-white px-2">A</div>
          <div className="text-white border-2 border-white px-1 rounded text-xs h-fit">
            HD
          </div>
        </div>
        <div className="text-white">{geners}</div>
      </div>
    </div>
  );
};

export default PreviewCard;
