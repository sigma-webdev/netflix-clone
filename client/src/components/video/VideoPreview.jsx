import {
  AddIcon,
  DownArrowIcon,
  LikeIcon,
  PauseIcon,
  PlayIcon,
} from "../icons";

const VideoPreview = () => {
  return (
    <div className="overflow-hidden  rounded-md bg-netflix-black drop-shadow-lg">
      <div>
        <video ref={videoRef} src={sampleVideo} loop></video>
      </div>

      <div className="space-y-4 p-4">
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
          <div className="font-semibold text-green-600">94% Matched</div>
          <div className="border-2 border-white px-2 text-white">A</div>
          <div className="text-white">2 Seasons</div>
          <div className="h-fit rounded border-2 border-white px-1 text-xs text-white">
            HD
          </div>
        </div>
        <div className="text-white">Thriller</div>
      </div>
    </div>
  );
};

export default VideoPreview;
