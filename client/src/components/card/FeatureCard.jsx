const FeatureCard = ({
  featureHeading,
  featureImage,
  aboutFeature,
  currentIndex,
}) => {
  console.log(featureHeading);
  console.log(featureImage);

  return (
    <article
      className={`flex-col ${
        currentIndex % 2 !== 0 && "md:flex-row-reverse"
      } md:flex md:flex-row justify-center items-center gap-x-5`}
    >
      <div className="basis-1/2">
        <img src={featureImage} alt="banner" className="w-full" />
      </div>
      <div className="space-y-8 basis-1/2">
        <h2 className="text-xl sm:3xl md:text-5xl font-bold">
          {featureHeading}
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl">{aboutFeature}</p>
      </div>
    </article>
  );
};

export default FeatureCard;
