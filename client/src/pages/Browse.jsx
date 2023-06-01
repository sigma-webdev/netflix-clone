import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

// components
import Crousal from "../components/crousal/Crousal";
import Layout from "../components/layout/Layout";

// actions
import { fetchContent } from "../store/contentSlice";
import { GENRES } from "../helpers/constants";

import sampleVideo from "../assets/sample1.mov";
import samplePoster from "../assets/images/content-poster.jpg";
import { IconContext } from "react-icons/lib";
import { RiPauseMiniFill, RiPlayMiniFill } from "react-icons/ri";

const Browse = () => {
  const content = useSelector((state) => state.content.allContent);
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
    dispatch(fetchContent());
  }, [dispatch]);

  return (
    <Layout isLogin={true}>
      <div className="relative">
        <video
          ref={videoRef}
          className="w-screen h-full mx-auto"
          src={sampleVideo}
          poster={samplePoster}
        ></video>
        <div className="flex gap-2 absolute bottom-12 left-12 cursor-pointer">
          <div
            className="flex items-center gap-2 text-black font-semibold bg-white px-4 py-1 rounded"
            onClick={playPauseMedia}
          >
            <IconContext.Provider value={{ color: "black", size: "30px" }}>
              {!isVideoPlaying ? <RiPlayMiniFill /> : <RiPauseMiniFill />}
            </IconContext.Provider>
            {!isVideoPlaying ? "Play" : "Pause"}
          </div>
          <div className="flex items-center gap-2 etext-black font-semibold  text-white px-4 py-2 rounded opacity-50 bg-black cursor-pointer">
            <IconContext.Provider value={{ color: "white", size: "30px" }}>
              <AiOutlineInfoCircle />
            </IconContext.Provider>
            More Info
          </div>
        </div>
      </div>

      <div className="text-white bg-netflix-blue ">
        <div className="bg-transparent">
          <div className="px-8 space-y-5">
            {/* loop through all GENRES */}
            {GENRES.map((currentGenre) => {
              const categoryWiseContent = content.filter(
                (item) => item.genre === currentGenre.name
              );

              // current genre
              return (
                categoryWiseContent.length !== 0 && (
                  <div key={currentGenre.id} className="relative">
                    <h4 className="mb-2">{currentGenre.name}</h4>
                    <Crousal content={categoryWiseContent}></Crousal>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Browse;
