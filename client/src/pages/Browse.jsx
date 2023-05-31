import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// components
import Crousal from "../components/crousal/Crousal";
import Layout from "../components/layout/Layout";

// actions
import { fetchContent } from "../store/contentSlice";
import { GENRES } from "../helpers/constants";

import sampleVideo from "../assets/sample1.mov";

const Browse = () => {
  const content = useSelector((state) => state.content.allContent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  return (
    <Layout isLogin={true}>
      <video className="w-screen h-full mx-auto" src={sampleVideo}></video>
      <div className="text-white bg-netflix-blue ">
        <div className="relative -top-[25vh] bg-transparent">
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
