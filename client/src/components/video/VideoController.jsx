import { IconContext } from "react-icons/lib";
import { MdKeyboardBackspace } from "react-icons/md";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { BsVolumeUp } from "react-icons/bs";
import { SkipBackward, SkipForward } from "../icons";
import { TbPlayerSkipForward } from "react-icons/tb";
import { RiFullscreenFill } from "react-icons/ri";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const VideoController = ({ contentURL, thumbnailURL }) => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [volume, setVolume] = useState(0);

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

  function mediaBackward() {
    clearTimeout(timeoutFwd);
    timeoutRwd = setTimeout(windBackward, 200);
  }

  function mediaForward() {
    clearTimeout(timeoutRwd);
    timeoutFwd = setTimeout(windForward, 200);
  }

  function windBackward() {
    const media = videoRef.current;

    if (media.currentTime <= 10) {
      clearInterval(timeoutRwd);
      stopMedia();
    } else {
      media.currentTime -= 10;
    }
  }

  function windForward() {
    const media = videoRef.current;

    if (media.currentTime >= media.duration - 3) {
      clearInterval(timeoutFwd);
      stopMedia();
    } else {
      media.currentTime += 3;
    }
  }

  function stopMedia() {
    const media = videoRef.current;

    media.pause();
    media.currentTime = 0;

    setIsVideoPlaying(false);
  }

  function setTime() {
    const media = videoRef.current;
    const timerWrapper = progressBarRef.current;
    const timerBar = progressRef.current;
    const currentTime = media.currentTime;
    const duration = media.duration;

    const barLength = timerWrapper.clientWidth * (currentTime / duration);
    timerBar.style.width = `${barLength}px`;
  }

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  function volumeHandler(e) {
    setVolume(e.target.value);
    videoRef.current.volume = e.target.value;
  }

  function mute() {
    videoRef.muted = !videoRef.muted;
  }

  return (
    <div className="relative h-screen bg-netflix-black">
      <div className="box-border absolute m-auto w-[98%] h-screen z-10 opacity-0 hover:opacity-100 transition duration-300 delay-150 ease-out">
        <div className="absolute left-4 top-4">
          <IconContext.Provider value={{ size: "40px", color: "white" }}>
            <Link to="/browse">
              <MdKeyboardBackspace />
            </Link>
          </IconContext.Provider>
        </div>
        <div
          ref={progressBarRef}
          className="absolute w-full h-1 rounded bg-white left-4 bottom-16"
        >
          <div
            ref={progressRef}
            className={`h-full w-[0px] rounded bg-slate-500`}
          ></div>
        </div>
        <div className="flex justify-between items-center gap-4 w-full absolute left-4 bottom-4">
          <div className="flex gap-4">
            <IconContext.Provider value={{ size: "40px", color: "white" }}>
              <div
                onClick={playPauseMedia}
                className="flex items-center cursor-pointer"
              >
                {!isVideoPlaying ? <BsFillPlayFill /> : <BsFillPauseFill />}
              </div>
              <div
                onClick={mediaBackward}
                className="flex items-center cursor-pointer"
              >
                <SkipBackward />
              </div>
              <div
                onClick={mediaForward}
                className="flex items-center cursor-pointer"
              >
                <SkipForward />
              </div>
              <div className="flex items-center cursor-pointer">
                <div onClick={mute}>
                  <BsVolumeUp />
                </div>
                <div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step=".1"
                    value={volume}
                    onChange={volumeHandler}
                  />
                </div>
              </div>
            </IconContext.Provider>
          </div>

          <div className="flex gap-4">
            <IconContext.Provider value={{ size: "40px", color: "white" }}>
              <div className="cursor-pointer">
                <TbPlayerSkipForward />
              </div>
              <div className="cursor-pointer" onClick={toggleFullScreen}>
                <RiFullscreenFill />
              </div>
            </IconContext.Provider>
          </div>
        </div>
      </div>

      <video
        ref={videoRef}
        className="h-full mx-auto"
        src={contentURL}
        poster={thumbnailURL}
        onEnded={stopMedia}
        onTimeUpdate={setTime}
      ></video>
    </div>
  );
};

export default VideoController;
