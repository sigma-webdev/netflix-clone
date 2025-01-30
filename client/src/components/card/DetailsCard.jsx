import { useRef } from "react";
import { dislikeContent, likeContent } from "../../store/contentSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { addContentToWatchHistory } from "../../store/contentSlice";
import { useNavigate } from "react-router-dom";

const DetailsCard = ({
  contentId,
  name,
  thumbnailURL,
  trailerUrl,
  genres,
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
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const likeContentHanlder = () => {
    dispatch(likeContent({ contentId, userId: userId }));
  };

  const dislikeContentHanlder = () => {
    dispatch(dislikeContent({ contentId, userId: userId }));
  };

  const handlePlay = (contentId) => {
    dispatch(addContentToWatchHistory({ contentId }));
    navigate(`/watch/${contentId}`);
  };
  console.log(contentDuration);

  return (
    <div className="no-scrollbar relative mx-auto h-[500px] w-[90%] overflow-y-scroll rounded bg-netflix-black drop-shadow-lg transition duration-300 ease-in-out md:w-[650px]">
      <div className="relative">
        {/* preview video*/}
        <div className="absolute -bottom-1 h-[25px] w-full bg-gradient-to-b from-netflix-black/0 to-netflix-black/100 md:h-[100px] lg:h-[150px]"></div>
        <div className="w-full">
          <video
            ref={videoRef}
            className="h-[350px] w-full rounded-tl rounded-tr object-cover"
            poster={thumbnailURL}
            src={trailerUrl}
            loop
            autoPlay
          ></video>
        </div>

        {/* modal close button */}
        <button
          className="absolute right-2 top-2 cursor-pointer"
          onClick={handleClose}
        >
          <AiOutlineCloseCircle className="text-4xl text-white" />
        </button>

        {/* hero text */}
        <div className="absolute bottom-6 left-6 flex cursor-pointer items-center gap-2 md:bottom-8 md:left-12">
          <button onClick={() => handlePlay(contentId)}>
            <div className="flex cursor-pointer items-center gap-2 rounded bg-white px-2 py-1 text-sm font-semibold text-black md:px-4 md:text-lg ">
              <BsFillPlayFill className="text-xl lg:text-4xl" />
              <div>Play</div>
            </div>
          </button>
          <button
            onClick={likeContentHanlder}
            className="cursor-pointer rounded-full border-2 border-white p-[0.35rem] "
          >
            <AiFillLike
              className={`${
                isLiked ? "text-green-500" : "text-white hover:text-green-500"
              } text-xl`}
            />
          </button>
          <div
            onClick={dislikeContentHanlder}
            className="cursor-pointer rounded-full border-2 border-white p-[0.35rem]"
          >
            <AiFillDislike
              className={`${
                isDisliked ? "text-red-500" : "text-white hover:text-red-500"
              } text-xl`}
            />
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
              {genres.join(" . ")}
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
