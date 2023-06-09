export const StartIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="inline w-6 h-6 font-extrabold"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

export const CrossIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 md:w-10 md:h-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};
export const GlobeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-2 h-2 md:w-6 md:h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  );
};

export const Check = () => {
  return (
    <>
      <svg
        aria-hidden="true"
        fill="none"
        stroke="red"
        strokeWidth="1.5"
        viewBox="0 0 24 30"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6    font-extrabold"
      >
        <path
          d="M4.5 12.75l6 6 9-13.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </>
  );
};

export const CheckCircle = () => {
  return (
    <>
      <svg
        aria-hidden="true"
        fill="white"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        className="  w-6"
      >
        <path
          clipRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          fillRule="evenodd"
        ></path>
      </svg>
    </>
  );
};

export const PlusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 md:w-10 md:h-10"
    >
      :
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
};

export const SkipForward = () => {
  return (
    <div className="flex items-center">
      <svg
        height="30"
        width="30"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M475.875 173.859C474.924 171.198 473.453 168.752 471.549 166.664C469.645 164.576 467.344 162.887 464.782 161.695C462.219 160.503 459.445 159.833 456.621 159.722C453.797 159.611 450.98 160.063 448.332 161.05C445.684 162.038 443.258 163.542 441.196 165.474C439.134 167.407 437.477 169.73 436.32 172.309C435.164 174.887 434.531 177.67 434.459 180.495C434.387 183.32 434.877 186.132 435.9 188.766C448.719 223.281 451.376 260.747 443.556 296.726C435.735 332.704 417.765 365.687 391.775 391.766C316.9 466.62 195.087 466.62 120.233 391.766C45.3791 316.912 45.3791 195.094 120.233 120.234C186.245 54.219 289.392 46.648 364.375 97.8L345.333 104.147C342.675 105.033 340.218 106.435 338.102 108.271C335.985 110.107 334.251 112.342 332.999 114.848C331.746 117.354 330.999 120.083 330.801 122.877C330.603 125.672 330.957 128.479 331.844 131.136C332.73 133.794 334.131 136.252 335.967 138.368C337.803 140.484 340.038 142.218 342.545 143.471C345.051 144.724 347.779 145.47 350.574 145.668C353.369 145.867 356.175 145.512 358.833 144.626L414.133 126.189C418.997 124.566 423.114 121.245 425.731 116.835C428.348 112.425 429.289 107.22 428.383 102.173L417 38.891C415.976 33.3425 412.797 28.4254 408.157 25.2153C403.517 22.0053 397.794 20.7637 392.241 21.7622C386.688 22.7607 381.757 25.918 378.525 30.5433C375.294 35.1686 374.027 40.8854 375 46.443L376.534 54.969C286.393 1.085 167.392 12.725 90.0631 90.068C-1.42694 181.563 -1.42694 330.438 90.0631 421.932C127.958 459.818 177.675 483.595 230.954 489.314C284.233 495.033 337.864 482.348 382.936 453.367C428.007 424.387 461.805 380.856 478.712 330.008C495.62 279.161 494.618 224.059 475.875 173.859V173.859Z"
          fill="white"
        />
        <path
          d="M192 362.667C197.658 362.667 203.084 360.419 207.085 356.418C211.086 352.417 213.333 346.991 213.333 341.333V192C213.332 188.225 212.33 184.517 210.428 181.256C208.526 177.995 205.793 175.297 202.508 173.437C199.223 171.577 195.503 170.622 191.728 170.67C187.953 170.718 184.258 171.766 181.021 173.708L127.688 205.708C122.854 208.628 119.376 213.346 118.015 218.827C116.654 224.308 117.522 230.105 120.428 234.947C123.335 239.789 128.042 243.281 133.519 244.658C138.996 246.035 144.796 245.184 149.646 242.292L170.667 229.677V341.333C170.667 346.991 172.915 352.417 176.915 356.418C180.916 360.419 186.342 362.667 192 362.667V362.667Z"
          fill="white"
        />
        <path
          d="M309.333 170.667C267.469 170.667 234.667 212.833 234.667 266.667C234.667 320.501 267.467 362.667 309.333 362.667C351.199 362.667 384 320.5 384 266.667C384 212.834 351.2 170.667 309.333 170.667ZM309.333 320C294.198 320 277.333 298.1 277.333 266.667C277.333 235.234 294.198 213.333 309.333 213.333C324.468 213.333 341.333 235.233 341.333 266.667C341.333 298.101 324.469 320 309.333 320Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export const SkipBackward = () => {
  return (
    <div className="flex items-center">
      <svg
        height="30"
        width="30"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M421.938 90.068C344.672 12.807 225.813 1.12599 135.443 55.1L137 46.443C137.973 40.8854 136.706 35.1686 133.475 30.5433C130.244 25.918 125.312 22.7607 119.759 21.7622C114.206 20.7637 108.483 22.0053 103.843 25.2153C99.2035 28.4254 96.0238 33.3425 95.0001 38.891L83.6151 102.177C82.7091 107.224 83.6506 112.429 86.2673 116.839C88.884 121.249 93.001 124.569 97.8651 126.193L153.165 144.63C155.823 145.516 158.629 145.871 161.424 145.672C164.219 145.474 166.947 144.728 169.454 143.475C171.96 142.222 174.195 140.488 176.031 138.372C177.867 136.256 179.268 133.798 180.155 131.14C181.041 128.483 181.395 125.676 181.197 122.881C180.999 120.087 180.252 117.358 179 114.852C177.747 112.346 176.013 110.111 173.897 108.275C171.78 106.439 169.323 105.037 166.665 104.151L147.545 97.777C222.235 46.639 325.623 54.098 391.769 120.234C466.623 195.094 466.623 316.906 391.769 391.766C316.894 466.63 195.102 466.63 120.227 391.766C94.2368 365.687 76.2669 332.704 68.4464 296.726C60.626 260.747 63.2828 223.281 76.1021 188.766C77.0915 186.139 77.5525 183.342 77.4589 180.536C77.3652 177.73 76.7187 174.97 75.5563 172.415C74.394 169.859 72.7387 167.558 70.6853 165.644C68.6319 163.729 66.2208 162.239 63.5903 161.258C60.9598 160.277 58.1615 159.825 55.356 159.928C52.5504 160.031 49.7927 160.686 47.241 161.857C44.6892 163.027 42.3937 164.69 40.4858 166.75C38.578 168.809 37.0954 171.225 36.1231 173.859C17.4184 224.054 16.4442 279.136 33.3623 329.961C50.2803 380.786 84.0729 424.296 129.129 453.267C174.186 482.237 227.796 494.926 281.059 489.226C334.321 483.526 384.032 459.781 421.938 421.932C513.427 330.438 513.427 181.563 421.938 90.068Z"
          fill="white"
        />
        <path
          d="M192 362.667C197.658 362.667 203.084 360.419 207.085 356.418C211.086 352.417 213.333 346.991 213.333 341.333V192C213.332 188.225 212.33 184.517 210.428 181.256C208.526 177.995 205.793 175.297 202.508 173.437C199.223 171.577 195.503 170.622 191.728 170.67C187.953 170.718 184.258 171.766 181.021 173.708L127.688 205.708C122.854 208.628 119.376 213.346 118.015 218.827C116.654 224.308 117.522 230.105 120.428 234.947C123.335 239.789 128.042 243.281 133.519 244.658C138.996 246.035 144.796 245.184 149.646 242.292L170.667 229.677V341.333C170.667 346.991 172.915 352.417 176.915 356.418C180.916 360.419 186.342 362.667 192 362.667V362.667Z"
          fill="white"
        />
        <path
          d="M309.333 362.667C351.198 362.667 384 320.5 384 266.667C384 212.834 351.2 170.667 309.333 170.667C267.466 170.667 234.667 212.833 234.667 266.667C234.667 320.501 267.469 362.667 309.333 362.667ZM309.333 213.333C324.469 213.333 341.333 235.233 341.333 266.667C341.333 298.101 324.469 320 309.333 320C294.197 320 277.333 298.1 277.333 266.667C277.333 235.234 294.2 213.333 309.333 213.333V213.333Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export const Loading = () => {
  return (
    <svg
      aria-hidden="true"
      role="status"
      className="inline w-4 h-4 mr-3 text-white animate-spin"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
  );
};
