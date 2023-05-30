import sampleVideo from "../assets/sample1.mov";
import VideoController from "../components/video/VideoController";

const Watch = () => {
  return (
    <div>
      <VideoController content={sampleVideo} />
    </div>
  );
};

export default Watch;
