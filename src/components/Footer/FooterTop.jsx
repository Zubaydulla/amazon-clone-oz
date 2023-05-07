import React from "react";

const FooterTop = () => {
  return (
    <div className="w-full bg-white py-7">
      <div className="w-full border-t-[1px] border-b-[1px] py-8">
        <div className="w-64 mx-auto text-center flex flex-col gap-1">
          <p className="text-sm">See Personalised recommendations</p>
          <button className="w-full py-1.5 rounded-md font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200">
            Sign In
          </button>
          <p className="text-xs mt-1">
            New Customer?{" "}
            <span className="text-blue-600 ml-1 cursor-pointer">
              Start Here.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
