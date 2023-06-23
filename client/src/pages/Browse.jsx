import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineInfoCircle } from "react-icons/ai";

// components
import Crousal from "../components/crousal/Crousal";
import Layout from "../components/layout/Layout";

// actions
import { fetchContent } from "../store/contentSlice";
import { GENRES } from "../helpers/constants";

import sampleVideo from "../assets/sample1.mov";
import samplePoster from "../assets/images/sample-poster.jpg";
import { RiPauseMiniFill, RiPlayMiniFill } from "react-icons/ri";
import DetailsCard from "../components/card/DetailsCard";

const Browse = () => {
  const content = useSelector((state) => state.content.allContent);
  const LOADING = useSelector((state) => state.content.contentLoading);
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
      {LOADING ? (
        "loading..."
      ) : (
        <div className="">
          <div className="relative ">
            {/* hero video */}
            <div className="absolute w-full bg-gradient-to-b to-netflix-blue/100 from-netflix-blue/0 h-[50px] md:h-[100px] lg:h-[200px] -bottom-1"></div>
            <video
              ref={videoRef}
              className="w-screen mx-auto"
              src={sampleVideo}
              poster={samplePoster}
            ></video>
            {/* hero text */}
            <div className="flex gap-2 absolute bottom-6 left-6 md:bottom-12 md:left-12 cursor-pointer">
              <div
                className="flex items-center gap-2 text-black font-semibold bg-white px-2 md:px-4 py-1 rounded cursor-pointer text-sm md:text-lg "
                onClick={playPauseMedia}
              >
                {!isVideoPlaying ? (
                  <RiPlayMiniFill className="text-xl lg:text-4xl" />
                ) : (
                  <RiPauseMiniFill className="text-xl lg:text-4xl" />
                )}
                {!isVideoPlaying ? "Play" : "Pause"}
              </div>
              <div className="flex items-center gap-2 font-semibold  text-white px-2 md:px-4 py-1 rounded opacity-80 bg-black cursor-pointer text-sm md:text-lg">
                <AiOutlineInfoCircle className="text-md lg:text-2xl" />
                More Info
              </div>
            </div>
          </div>

          {/* browse content */}
          <div className="text-white bg-netflix-blue">
            <div>
              <div className="px-4 md:px-8 space-y-5">
                {/* loop through all GENRES */}
                {GENRES.map((currentGenre) => {
                  const categoryWiseContent = content.filter(
                    (item) => item.genres === currentGenre.name
                  );

                  //  current genre
                  return (
                    categoryWiseContent.length !== 0 && (
                      <div key={currentGenre.id}>
                        <h4 className="mb-2">{currentGenre.name}</h4>
                        <Crousal content={categoryWiseContent}></Crousal>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-netflix-blue">
            <div className="absolute w-full bg-gradient-to-b to-netflix-blue/100 from-netflix-blue/0 h-[50px] md:h-[100px] lg:h-[200px] -bottom-1"></div>
            <DetailsCard
              name={content[0].name}
              thumbnailURL={content[0].thumbnail[0].thumbnailUrl}
              trailerUrl={content[0].trailer[0].trailerUrl}
              geners={content[0].genres}
              contentId={content[0]._id}
              rating={content[0].rating}
              description={content[0].description}
              cast={content[0].cast}
              director={content[0].creator[0]}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Browse;
