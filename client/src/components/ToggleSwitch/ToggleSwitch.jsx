import React, { useRef } from "react";

const ToggleSwitch = ({ isOn, onToggle, loading }) => {
  const ref = useRef();

  return (
    <div className="relative mr-2 inline-block w-10 select-none align-middle">
      <input
        disabled={loading}
        ref={ref}
        type="checkbox"
        className={`${
          isOn ? "bg-red-600" : "bg-gray-300"
        } toggle-checkbox absolute block h-6 w-6 cursor-pointer appearance-none rounded-full`}
        checked={isOn}
        onChange={onToggle}
      />
      <label
        htmlFor="toggle"
        className={`${
          isOn ? "bg-red-600" : "bg-gray-300"
        } toggle-label block h-6 cursor-pointer overflow-hidden rounded-full`}
      >
        <span
          onClick={() => {
            if (ref.current) {
              ref.current.click();
            }
          }}
          className={`${
            isOn ? "translate-x-4" : "translate-x-0"
          } toggle-inner absolute  block h-6 w-6 transform rounded-full bg-white transition-transform duration-300`}
        />
      </label>
    </div>
  );
};

export default ToggleSwitch;
