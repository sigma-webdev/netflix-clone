import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineBackward, AiOutlineForward } from "react-icons/ai";
import { BsFillPlayFill, BsFillPauseFill, BsVolumeUp } from "react-icons/bs";
import { RiFullscreenFill } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";

const VideoController = ({ contentURL, thumbnailURL }) => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [volume, setVolume] = useState();

  // play and pause media
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

  let timeoutFwd;
  let timeoutRwd;

  // skip video backward by 10 sec
  function mediaBackward() {
    clearTimeout(timeoutFwd);
    timeoutRwd = setTimeout(windBackward, 200);
  }
  function windBackward() {
    const media = videoRef.current;

    if (media.currentTime <= 10) {
      clearTimeout(timeoutRwd);
      stopMedia();
    } else {
      media.currentTime -= 10;
    }
  }

  // skip video forward by 10 sec
  function mediaForward() {
    clearTimeout(timeoutRwd);
    timeoutFwd = setTimeout(windForward, 200);
  }
  function windForward() {
    const media = videoRef.current;

    if (media.currentTime >= media.duration - 3) {
      clearTimeout(timeoutFwd);
      stopMedia();
    } else {
      media.currentTime += 3;
    }
  }

  // stop video
  function stopMedia() {
    const media = videoRef.current;

    media.pause();
    media.currentTime = 0;

    setIsVideoPlaying(false);
  }

  // update video progress
  function videoProgressHanlder() {
    const media = videoRef.current;
    const timerWrapper = progressBarRef.current;
    const timerBar = progressRef.current;
    const currentTime = media.currentTime;
    const duration = media.duration;

    const barLength = timerWrapper.clientWidth * (currentTime / duration);
    timerBar.style.width = `${barLength}px`;
  }

  // fullscreen video
  function fullScreenHandler() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  // update video volume
  function volumeHandler(e) {
    setVolume(e.target.value);
    videoRef.current.volume = e.target.value;
  }

  // mute video
  function muteHandler() {
    videoRef.muted = !videoRef.muted;
  }

  return (
    <div className="relative h-screen w-full bg-netflix-black">
      {/* video */}
      <video
        ref={videoRef}
        className="absolute h-screen w-full"
        src={contentURL}
        poster={thumbnailURL}
        onEnded={stopMedia}
        onTimeUpdate={videoProgressHanlder}
      ></video>

      <div className="absolute z-10 box-border flex h-screen w-full flex-col justify-between p-4 opacity-0 transition delay-150 duration-300 ease-out hover:opacity-100">
        {/* back button */}
        <div className="top-4">
          <Link to="/browse">
            <MdKeyboardBackspace className="text-3xl text-white md:text-4xl lg:text-5xl" />
          </Link>
        </div>

        <div className="w-full space-y-2">
          {/* video progress bar */}
          <div ref={progressBarRef} className="h-1 rounded bg-white">
            <div
              ref={progressRef}
              className={`h-full w-[0px] rounded bg-slate-500`}
            ></div>
          </div>

          {/* video controls */}
          <div className="flex w-full items-center justify-between gap-2 md:gap-3 lg:gap-4">
            <div className="flex gap-2 md:gap-3 lg:gap-4">
              {/* play/pause button */}
              <button
                onClick={playPauseMedia}
                className="flex cursor-pointer items-center"
              >
                {!isVideoPlaying ? (
                  <BsFillPlayFill className="text-3xl text-white md:text-4xl lg:text-5xl" />
                ) : (
                  <BsFillPauseFill className="text-3xl text-white md:text-4xl lg:text-5xl" />
                )}
              </button>

              {/* playback button */}
              <button
                onClick={mediaBackward}
                className="flex cursor-pointer items-center"
              >
                <AiOutlineBackward className="text-3xl text-white md:text-4xl lg:text-5xl" />
              </button>

              {/* playforward button */}
              <button
                onClick={mediaForward}
                className="flex cursor-pointer items-center"
              >
                <AiOutlineForward className="text-3xl text-white md:text-4xl lg:text-5xl" />
              </button>

              {/* volume button */}
              <div className="group flex cursor-pointer items-center">
                <button onClick={muteHandler}>
                  <BsVolumeUp className="text-3xl text-white md:text-4xl lg:text-5xl" />
                </button>
                <div className="opacity-0 group-hover:opacity-100">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step=".1"
                    value={volume}
                    onChange={volumeHandler}
                    className="w-20 md:w-24 lg:w-28"
                  />
                </div>
              </div>
            </div>

            {/* fullscreen button */}
            <button className="cursor-pointer" onClick={fullScreenHandler}>
              <RiFullscreenFill className="text-3xl text-white md:text-4xl lg:text-5xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoController;
