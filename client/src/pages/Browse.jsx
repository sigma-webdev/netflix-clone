import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineInfoCircle } from "react-icons/ai";

// components
import Crousal from "../components/crousal/Crousal";
import Layout from "../components/layout/Layout";

// actions
import { fetchContent } from "../store/contentSlice";
import { RiPauseMiniFill, RiPlayMiniFill } from "react-icons/ri";

const Browse = () => {
  const allContent = useSelector((state) => state.content.allContent);
  const filteredContent = useSelector((state) => state.content.filteredContent);

  const content = allContent;

  const LOADING = useSelector((state) => state.content.loading);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(fetchContent("64789b082f388ccff2e33eaa"));
  }, [dispatch]);

  return (
    <Layout isLogin={true}>
      <div id="content-details" className="relative h-full w-full"></div>
      {LOADING ? (
        "loading..."
      ) : content.length === 0 ? (
        "No Data Found"
      ) : (
        <div className="">
          <div className="relative">
            {/* hero video */}
            <div className="absolute -bottom-1 h-[50px] w-full bg-gradient-to-b from-netflix-blue/0 to-netflix-blue/100 md:h-[100px] lg:h-[200px]"></div>
            <div className="h-[400px] w-full md:h-[800px]">
              <video
                ref={videoRef}
                className="mx-auto h-[400px] w-full object-cover md:h-[800px]"
                src={content[0].trailerUrl}
                poster={content[0].thumbnailUrl}
                autoPlay={true}
              ></video>
            </div>

            {/* hero text */}
            <div className="absolute bottom-6 left-6 flex cursor-pointer gap-2 md:bottom-12 md:left-12">
              <div
                className="flex cursor-pointer items-center gap-2 rounded bg-white px-2 py-1 text-sm font-semibold text-black md:px-4 md:text-lg "
                onClick={playPauseMedia}
              >
                {!isVideoPlaying ? (
                  <RiPlayMiniFill className="text-xl lg:text-4xl" />
                ) : (
                  <RiPauseMiniFill className="text-xl lg:text-4xl" />
                )}
                {!isVideoPlaying ? "Play" : "Pause"}
              </div>
              <div className="flex cursor-pointer items-center gap-2  rounded bg-black px-2 py-1 text-sm font-semibold text-white opacity-80 md:px-4 md:text-lg">
                <AiOutlineInfoCircle className="text-md lg:text-2xl" />
                More Info
              </div>
            </div>
          </div>

          {/* browse content */}
          <div className="bg-netflix-blue text-white">
            <div className="space-y-5 px-4 md:px-8">
              <div>
                <Crousal content={content}></Crousal>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Browse;
