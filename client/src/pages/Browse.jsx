import samplePoster from "../assets/images/content-poster.jpg";
import PreviewCard from "../components/card/PreviewCard";
import BrowseHeader from "../components/layout/BrowseHeader";

const GENERES = ["Action & Adventure", "Anime", "Children & Family"];

const content = [
  {
    id: 1,
    contentPoster: samplePoster,
    genre: "Action & Adventure",
  },
  {
    id: 2,
    contentPoster: samplePoster,
    genre: "Action & Adventure",
  },
  {
    id: 3,
    contentPoster: samplePoster,
    genre: "Anime",
  },
  {
    id: 4,
    contentPoster: samplePoster,
    genre: "Anime",
  },
  {
    id: 5,
    contentPoster: samplePoster,
    genre: "Children & Family",
  },
];

const Browse = () => {
  return (
    <>
      <BrowseHeader></BrowseHeader>
      <div className="px-8 space-y-5">
        {GENERES.map((currentGenere) => {
          const filteredContent = content.filter(
            (item) => item.genre === currentGenere
          );

          return (
            <div>
              <h4 className="my-2">{currentGenere}</h4>
              <div className="flex gap-2">
                {filteredContent &&
                  filteredContent.map((item) => {
                    return (
                      <PreviewCard
                        key={item.id}
                        contentPoster={item.contentPoster}
                      />
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Browse;
