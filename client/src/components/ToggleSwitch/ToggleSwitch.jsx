const ToggleSwitch = () => {
  return (
    <>
      <label className="relative mx-auto inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          defaultValue
          className="peer sr-only"
          defaultChecked
        />
        <div className="peer  h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white  dark:border-gray-600 dark:bg-gray-700" />
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
      </label>
    </>
  );
};

export default ToggleSwitch;
