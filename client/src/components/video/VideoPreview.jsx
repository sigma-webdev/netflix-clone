import sampleVideo from "../../assets/sample.mp4";
import { AddIcon, DownArrowIcon, LikeIcon, PlayIcon } from "../icons";

const VideoPreview = () => {
  return (
    <div className="bg-netflix-black w-fit  drop-shadow-lg rounded-md overflow-hidden">
      <div className="w-80">
        <video className="h-full w-full" src={sampleVideo}></video>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div>
              <PlayIcon />
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
        <div className="flex gap-2">
          <div className="text-green-600 font-semibold">94% Matched</div>
          <div className="text-white border-2 border-white px-2">A</div>
          <div className="text-white">2 Seasons</div>
          <div className="text-white border-2 border-white px-1 rounded">
            HD
          </div>
        </div>
        <div className="text-white">Omnious.Gritty.Thriller</div>
      </div>
    </div>
  );
};

export default VideoPreview;
