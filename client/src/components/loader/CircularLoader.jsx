const CircularLoader = ({extraStyles}) => {
  return (
    <div className="flex items-center justify-center bg-transparent">
      <div className={`animate-spin rounded-full ${extraStyles ? extraStyles : 'h-8 w-8 border-white'}`}></div>
    </div>
  );
};

export default CircularLoader;
