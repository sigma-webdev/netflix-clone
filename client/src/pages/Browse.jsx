import Crousal from "../components/crousal/Crousal";
import Layout from "../components/layout/Layout";

import { GENERES, content } from "../data";

const Browse = () => {
  return (
    <Layout isLogin={true}>
      <div className="text-white bg-netflix-blue">
        <div className="px-8 space-y-5">
          {GENERES.map((currentGenere) => {
            const filteredContent = content.filter(
              (item) => item.genre === currentGenere.name
            );

            return (
              <div key={currentGenere.id}>
                <h4 className="relative mb-2">{currentGenere.name}</h4>
                <Crousal content={filteredContent}></Crousal>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Browse;
