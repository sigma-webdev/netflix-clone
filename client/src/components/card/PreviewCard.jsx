import { useRef, useState } from "react";
import VideoPreview from "../video/VideoPreview";

const PreviewCard = ({ contentPoster }) => {
  const thumbnailRef = useRef(null);
  const previewRef = useRef(null);

  const handleOpenPreview = () => {
    previewRef.current.style.transform = "scale(1)";
    console.log(previewRef);
  };

  const handleClosePreview = () => {
    previewRef.current.style.transform = "scale(0)";
    console.log(previewRef);
  };

  return (
    <div
      className=""
      ref={thumbnailRef}
      onMouseMove={handleOpenPreview}
      onMouseLeave={handleClosePreview}
    >
      <div className="flex-none w-48">
        <div>
          <img src={contentPoster} alt="video" className="rounded" />
        </div>
      </div>
      <div
        ref={previewRef}
        className="origin-top-left scale-0  transition duration-300 ease-in-out absolute top-0 z-10 h-64 w-72 "
      >
        <VideoPreview />
      </div>
    </div>
  );
};

export default PreviewCard;
