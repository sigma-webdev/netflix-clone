const CircularLoader = () => {
  return (
    <div className="flex items-center justify-center bg-transparent">
      <div className="h-8 w-8 animate-spin rounded-full border-b-[2.5px] border-t-[2.5px] border-white"></div>
    </div>
  );
};

export default CircularLoader;
