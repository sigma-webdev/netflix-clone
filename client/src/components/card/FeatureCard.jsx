const FeatureCard = ({
  featureHeading,
  featureImage,
  aboutFeature,
  currentIndex,
}) => {
  return (
    <article
      className={`flex-col ${
        currentIndex % 2 !== 0 && "md:flex-row-reverse"
      } items-center justify-center gap-x-5 md:flex md:flex-row`}
    >
      <div className="basis-1/2">
        <img src={featureImage} alt="banner" className="w-full" />
      </div>
      <div className="basis-1/2 space-y-4 pl-6 md:space-y-6 md:pl-0 lg:space-y-8">
        <h2 className="text-xl font-bold md:text-3xl lg:text-5xl">
          {featureHeading}
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl">{aboutFeature}</p>
      </div>
    </article>
  );
};

export default FeatureCard;
