import { RiFullscreenFill } from "react-icons/ri";
import PreviewShimmer from "./PreviewShimmer";
import { IconContext } from "react-icons/lib";
import { TbPlayerSkipForward } from "react-icons/tb";
import { SkipBackward, SkipForward } from "../icons";
import { BsFillPauseFill, BsFillPlayFill, BsVolumeUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

const VideoShimmer = () => {
  return (
    <div className="relative h-screen bg-netflix-black">
      <div className="absolute z-10 m-auto box-border h-screen w-[98%] opacity-0 transition delay-150 duration-300 ease-out hover:opacity-100">
        <div className="absolute left-4 top-4">
          <IconContext.Provider value={{ size: "40px", color: "white" }}>
            <Link to="/browse">
              <MdKeyboardBackspace />
            </Link>
          </IconContext.Provider>
        </div>
        <div className="absolute bottom-16 left-4 h-1 w-full rounded bg-white">
          <div className={`h-full w-[0px] rounded bg-slate-500`}></div>
        </div>
        <div className="absolute bottom-4 left-4 flex w-full items-center justify-between gap-4">
          <div className="flex gap-4">
            <IconContext.Provider value={{ size: "40px", color: "white" }}>
              <div className="flex cursor-pointer items-center">
                <BsFillPlayFill />
              </div>
              <div className="flex cursor-pointer items-center">
                <SkipBackward />
              </div>
              <div className="flex cursor-pointer items-center">
                <SkipForward />
              </div>
              <div className="flex cursor-pointer items-center">
                <div>
                  <BsVolumeUp />
                </div>
                <div>
                  <input type="range" min="0" max="1" step=".1" />
                </div>
              </div>
            </IconContext.Provider>
          </div>

          <div className="flex gap-4">
            <IconContext.Provider value={{ size: "40px", color: "white" }}>
              <div className="cursor-pointer">
                <TbPlayerSkipForward />
              </div>
              <div className="cursor-pointer">
                <RiFullscreenFill />
              </div>
            </IconContext.Provider>
          </div>
        </div>
      </div>

      <PreviewShimmer />
    </div>
  );
};

export default VideoShimmer;
