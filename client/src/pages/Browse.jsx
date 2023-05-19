import Crousal from "../components/crousal/Crousal";
import BrowseHeader from "../components/layout/BrowseHeader";

import { GENERES, content } from "../data";

const Browse = () => {
  return (
    <div className="bg-netflix-black text-white">
      <BrowseHeader></BrowseHeader>
      <div className="px-8 space-y-5">
        {GENERES.map((currentGenere) => {
          const filteredContent = content.filter(
            (item) => item.genre === currentGenere.name
          );

          return (
            <div key={currentGenere.id}>
              <h4 className="relative my-2">{currentGenere.name}</h4>
              <Crousal content={filteredContent}></Crousal>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Browse;
