import { AccountCircle, Close, Menu } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SideNavContent from "./SideNavContent";
import { useSelector } from "react-redux";
import { userInfo } from "../../redux/amazonSLice";

const HeaderBottom = () => {
  const userInfoVar = useSelector(userInfo);
  const [openSideBar, setOpenSideBar] = useState(false);
  const sideBarRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (e.target.contains(sideBarRef.current)) {
        setOpenSideBar(false);
      }
    };
    document.body.addEventListener("click", handler);

    return () => {
      document.body.removeEventListener("click", handler);
    };
  }, [sideBarRef, openSideBar]);

  return (
    <div className="w-full px-4 h-[36px] bg-amazon_light text-white flex items-center">
      {/* ListItems start here */}
      <ul className="flex items-center gap-2 text-sm tracking-wide">
        <li
          onClick={() => setOpenSideBar(true)}
          className="headerHover flex gap-1"
        >
          <Menu /> All
        </li>
        <li className="headerHover hidden md:inline-flex">Today's Deals</li>
        <li className="headerHover hidden md:inline-flex">Customer Service</li>
        <li className="headerHover hidden md:inline-flex">Gift Cards</li>
        <li className="headerHover hidden md:inline-flex">Registry</li>
        <li className="headerHover hidden md:inline-flex">Sell</li>
      </ul>
      {/* ListItems ends here */}
      {/* SideNav start here */}
      {openSideBar && (
        <div className="w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50 z-20">
          <div ref={sideBarRef} className="w-full h-full relative">
            <motion.div
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[290px] md:w-[350px] h-full bg-white border border-black"
            >
              <div className="w-full bg-amazon_light text-white py-3 px-6 flex items-center gap-4">
                <AccountCircle />
                <h3 className="font-titleFont font-bold text-lg tracking-wide">
                  {`Hello, ${userInfoVar ? userInfoVar.userName : "Sign in"}`}
                </h3>
              </div>
              <SideNavContent
                title="Digital Content & Devices"
                one="Amazon Music"
                two="Kindle E-readers & Books"
                three="Amazon Appstore"
              />
              <SideNavContent
                title="Shop By Department"
                one="Electronics"
                two="Computers"
                three="Smart Home"
              />
              <SideNavContent
                title="Programs & Features"
                one="Gift Cards"
                two="Amazon live"
                three="International Shopping"
              />
              <SideNavContent
                title="Help & Settings"
                one="Your Account"
                two="Customer Service"
                three="Contact us"
              />
              <span
                onClick={() => setOpenSideBar(false)}
                className="cursor-pointer absolute top-0 left-[300px] md:left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-amazon_yellow hover:text-white duration-300"
              >
                <Close />
              </span>
            </motion.div>
          </div>
        </div>
      )}
      {/* SideNav ends here */}
    </div>
  );
};

export default HeaderBottom;
