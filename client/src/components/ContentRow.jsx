import React from "react";
import RowContentShimmer from "./shimmer/RowContentShimmer";
import Crousal from "./crousal/Crousal";
import PreviewCard from "./card/PreviewCard";

const ContentRow = ({ heading, loading, content, toWatch = false }) => {
  return (
    <div className="bg-netflix-blue pt-4 text-white">
      <div className="px-4 md:px-8">
        {loading ? (
          <RowContentShimmer />
        ) : (
          content &&
          content.length !== 0 && (
            <>
              <h3 className="py-4">{heading}</h3>
              <div className="space-y-5">
                <Crousal>
                  {Array.from(content).map((item) => {
                    return (
                      <PreviewCard
                        key={item.contentId}
                        name={item.name}
                        thumbnailUrl={item.thumbnailUrl}
                        trailerUrl={item.trailerUrl}
                        geners={item.genres}
                        contentId={item.contentId}
                        rating={item.rating}
                        description={item.description}
                        cast={item.cast}
                        director={item.director}
                        isLiked={item.isLiked}
                        isDisliked={item.isDisliked}
                        releaseYear={item.releaseYear}
                        contentDuration={item.contentDuration}
                        toWatch={toWatch}
                      />
                    );
                  })}
                </Crousal>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default ContentRow;
