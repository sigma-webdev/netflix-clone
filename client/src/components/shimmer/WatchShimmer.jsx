import { RiFullscreenFill } from "react-icons/ri";
import PreviewShimmer from "./PreviewShimmer";
import { BsFillPlayFill, BsVolumeUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { AiOutlineBackward, AiOutlineForward } from "react-icons/ai";

const WatchShimmer = () => {
  return (
    <div className="relative h-screen w-full bg-netflix-black">
      {/* video */}
      <div className="absolute h-screen w-full">
        <PreviewShimmer />
      </div>

      <div className="absolute z-10 box-border flex h-screen w-full flex-col justify-between p-4 opacity-0 transition delay-150 duration-300 ease-out hover:opacity-100">
        {/* back button */}
        <div className="top-4">
          <Link to="/browse">
            <MdKeyboardBackspace className="text-3xl text-white md:text-4xl lg:text-5xl" />
          </Link>
        </div>

        <div className="w-full space-y-2">
          {/* video progress bar */}
          <div className="h-1 rounded bg-white">
            <div className={`h-full w-[0px] rounded bg-slate-500`}></div>
          </div>

          {/* video controls */}
          <div className="flex w-full items-center justify-between gap-2 md:gap-3 lg:gap-4">
            <div className="flex gap-2 md:gap-3 lg:gap-4">
              {/* play/pause button */}
              <button className="flex cursor-pointer items-center">
                <BsFillPlayFill className="text-3xl text-white md:text-4xl lg:text-5xl" />
              </button>

              {/* playback button */}
              <button className="flex cursor-pointer items-center">
                <AiOutlineBackward className="text-3xl text-white md:text-4xl lg:text-5xl" />
              </button>

              {/* playforward button */}
              <button className="flex cursor-pointer items-center">
                <AiOutlineForward className="text-3xl text-white md:text-4xl lg:text-5xl" />
              </button>

              {/* volume button */}
              <div className="group flex cursor-pointer items-center">
                <button>
                  <BsVolumeUp className="text-3xl text-white md:text-4xl lg:text-5xl" />
                </button>
                <div className="opacity-0 group-hover:opacity-100">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step=".1"
                    className="w-20 md:w-24 lg:w-28"
                  />
                </div>
              </div>
            </div>

            {/* fullscreen button */}
            <div className="cursor-pointer">
              <RiFullscreenFill className="text-3xl text-white md:text-4xl lg:text-5xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchShimmer;
