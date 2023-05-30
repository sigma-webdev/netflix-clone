import { Check } from "../icons.jsx";
import { useState } from "react";
import { CheckCircle } from "../icons.jsx";

function PlanForm() {
  const [plan, setPlan] = useState("PREMIUM");

  return (
    <div className=" max-w-[1020px]  m-4">
      <p className="text-[#333]">
        STEP <span className="font-bold">1</span> OF {""}
        <span className="font-bold">3</span>
      </p>
      <p className="text-[#333] text-3xl  mb-3 font-bold">
        Choose the plan that’s right for you
      </p>
      <ul>
        <li className="text-lg text-[#333]   font-semibold mb-2 flex gap-2">
          <Check /> Watch all you want. Ad-free..{" "}
        </li>
        <li className="text-lg text-[#333] mb-2 flex gap-2 font-semibold">
          <Check /> Everything on Netflix for one low price.
        </li>
        <li className="text-lg text-[#333] mb-2 flex gap-2 font-semibold">
          <Check /> No ads and no extra fees. Ever.
        </li>
      </ul>
      <div className="flex gap-4  justify-between  my-5     items-center">
        {/* PREMIUM */}
        <div
          className="cursor-pointer  shadow-lg h-[262px] rounded-md border-[1px] border-gray-200 "
          onClick={() => setPlan("PREMIUM")}
        >
          <div
            className={
              plan === "PREMIUM"
                ? "h-[76] px-3 py-4 flex gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-red-600  to-purple-600"
                : "h-[76] px-3 py-4 flex gap-3"
            }
          >
            {plan === "PREMIUM" ? <CheckCircle /> : null}
            <div>
              <p className="font-bold text-xl">Premium</p>
              <p className="font-bold text-xl">649/mo.</p>
            </div>
          </div>
          <ul className="p-3">
            <li className="list-disc text-sm font-semibold">
              Our best video quality in 4K and HDR
            </li>
            <li className="list-disc text-sm font-semibold">
              Watch on your TV, computer, mobile phone and tablet
            </li>
            <li className="list-disc text-sm font-semibold">
              Downloads available
            </li>
          </ul>
        </div>
        {/* PREMIUM END */}
        {/* STANDARD */}
        <div
          className="cursor-pointer  shadow-lg h-[262px] rounded-md border-[1px] border-gray-200"
          onClick={() => setPlan("STANDARD")}
        >
          <div
            className={
              plan === "STANDARD"
                ? "h-[76] px-3 py-4 flex gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-cyan-500 to-blue-500"
                : "h-[76] px-3 py-4 flex gap-3"
            }
          >
            {plan === "STANDARD" ? <CheckCircle /> : null}
            <div>
              <p className="font-bold text-xl">Premium</p>
              <p className="font-bold text-xl">649/mo.</p>
            </div>
          </div>
          <ul className="p-3">
            <li className="text-sm font-semibold">
              Our best video quality in 4K and HDR
            </li>
            <li className="text-sm font-semibold">
              Watch on your TV, computer, mobile phone and tablet
            </li>
            <li className="text-sm font-semibold">Downloads available</li>
          </ul>
        </div>
        {/* STANDARD END */}
        {/* BASIC */}
        <div
          className="cursor-pointer  shadow-lg h-[262px] rounded-md border-[1px] border-gray-200"
          onClick={() => setPlan("BASIC")}
        >
          <div
            className={
              plan === "BASIC"
                ? "h-[76] px-3 py-4 flex gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-cyan-500 to-blue-500"
                : "h-[76] px-3 py-4 flex gap-3"
            }
          >
            {plan === "BASIC" ? <CheckCircle /> : null}
            <div>
              <p className="font-bold text-xl">Premium</p>
              <p className="font-bold text-xl">649/mo.</p>
            </div>
          </div>
          <ul className="p-3">
            <li className="text-sm font-semibold">
              Our best video quality in 4K and HDR
            </li>
            <li className="text-sm font-semibold">
              Watch on your TV, computer, mobile phone and tablet
            </li>
            <li className="text-sm font-semibold">Downloads available</li>
          </ul>
        </div>
        {/* BASIC END */}
        {/* MOBILE */}
        <div
          className="cursor-pointer  shadow-lg h-[262px] rounded-md border-[1px] border-gray-200"
          onClick={() => setPlan("MOBILE")}
        >
          <div
            className={
              plan === "MOBILE"
                ? "h-[76] px-3 py-4 flex gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-cyan-500 to-blue-500"
                : "h-[76] px-3 py-4 flex gap-3"
            }
          >
            {plan === "MOBILE" ? <CheckCircle /> : null}
            <div>
              <p className="font-bold text-xl">Premium</p>
              <p className="font-bold text-xl">649/mo.</p>
            </div>
          </div>
          <ul className="p-3">
            <li className="text-sm font-semibold">
              Our best video quality in 4K and HDR
            </li>
            <li className="text-sm font-semibold">
              Watch on your TV, computer, mobile phone and tablet
            </li>
            <li className="text-sm font-semibold">Downloads available</li>
          </ul>
        </div>
        {/* MOBILE END */}
      </div>

      <p className="text-sm text-gray-500 mb-2">
        HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject
        to your internet service and device capabilities. Not all content is
        available in all resolutions. See our Terms of Use for more details.
      </p>
      <p className="text-sm text-gray-500 mb-2">
        Only people who live with you may use your account. Watch on 4 different
        devices at the same time with Premium, 2 with Standard, and 1 with Basic
        and Mobile.
      </p>

      <div className="flex justify-center">
        <button className="mt-3  max-w-[440px] bg-[#e50914]  rounded-md  h-16 w-full hover:bg-[#f6121d] text-white font-semibold  text-xl">
          Next
        </button>
      </div>
    </div>
  );
}

export default PlanForm;
