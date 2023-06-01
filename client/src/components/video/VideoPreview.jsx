import {
  AddIcon,
  DownArrowIcon,
  LikeIcon,
  PauseIcon,
  PlayIcon,
} from "../icons";

const VideoPreview = () => {
  return (
    <div className="bg-netflix-black  drop-shadow-lg rounded-md overflow-hidden">
      <div>
        <video ref={videoRef} src={sampleVideo} loop></video>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div onClick={playPauseMedia} className="cursor-pointer">
              {!isVideoPlaying ? <PlayIcon /> : <PauseIcon />}
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
          <div className="text-white">2 Seasons</div>
          <div className="text-white border-2 border-white px-1 rounded text-xs h-fit">
            HD
          </div>
        </div>
        <div className="text-white">Thriller</div>
      </div>
    </div>
  );
};

export default VideoPreview;
