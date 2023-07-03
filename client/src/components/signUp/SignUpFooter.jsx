import React from "react";

const SignUpFooter = () => {
  return (
    <>
      <footer className="bg-gray-200 px-14 py-10 space-y-5 text-gray-600">
        <p>Questions? Call 000-800-919-1694</p>
        <ul className="grid grid-cols-4 text-sm gap-y-3">
          <li>FAQ</li>
          <li>Help center</li>
          <li>Netflix Shop</li>
          <li>Terms of Use</li>
          <li>Privacy</li>
          <li> Cookie preference</li>
          <li>Corporate Information</li>
        </ul>

        <select className="bg-gray-100 px-4 py-2 border border-black">
          <option>English</option>
          <option>Hindi</option>
        </select>
      </footer>
    </>
  );
};

export default SignUpFooter;
