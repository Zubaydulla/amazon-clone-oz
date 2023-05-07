import React, { useEffect, useRef, useState } from "react";
import { logo } from "../../assets";
import {
  ArrowDropDown,
  ArrowDropDownOutlined,
  LocationOnOutlined,
  Logout,
  Search,
  ShoppingCart,
} from "@mui/icons-material";
import { allDepartmentItems } from "../../constants";
import HeaderBottom from "./HeaderBottom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  productsAddedToCart,
  setUserSignOut,
  userInfo,
} from "../../redux/amazonSLice";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const [showAllDepartments, setShowAllDepartments] = useState(false);
  const allDepartmentMenuRef = useRef();
  const productsAddedToCartVar = useSelector(productsAddedToCart);
  const userInfoVar = useSelector(userInfo);
  const auth = getAuth();
  const dispatch = useDispatch();
  // console.log(productsAddedToCart);

  useEffect(() => {
    let handler = (e) => {
      if (!allDepartmentMenuRef.current.contains(e.target)) {
        setShowAllDepartments(false);
      }
    };
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [allDepartmentMenuRef, showAllDepartments]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(setUserSignOut());
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="w-full sticky top-0 z-50">
      <div className="w-full bg-amazon_blue text-white px-4 py-3 flex justify-between items-center gap-4">
        {/* Image logo start */}
        <Link to="/">
          <div className="headerHover">
            <img className="w-20 mt-2" src={logo} alt="amazon-logo" />
          </div>
        </Link>
        {/* Image logo end */}
        {/* deliver start */}
        <div className="headerHover hidden mdl:inline-flex">
          <LocationOnOutlined />
          <p className="text-sm text-lightText font-light flex flex-col">
            Deliver to{" "}
            <span className="text-sm font-semibold -mt-1 text-whiteText">
              Uzbekistan
            </span>
          </p>
        </div>
        {/* deliver end */}
        {/* search start */}
        <div className="h-10 rounded-md hidden md:flex flex-grow relative">
          <span
            ref={allDepartmentMenuRef}
            onClick={() => setShowAllDepartments(!showAllDepartments)}
            className={`w-14 h-full bg-gray-200 rounded-tl-md rounded-bl-md hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center ${
              showAllDepartments && "border-amazon_yellow border-4"
            }`}
          >
            All<span></span>
            <ArrowDropDown
              sx={
                showAllDepartments
                  ? { transform: "rotate(180deg)" }
                  : { transform: "rotate(0deg)" }
              }
            />
          </span>
          <div>
            {showAllDepartments && (
              <div>
                <ul className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black px-2 py-1 flex-col gap-1 z-50 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-amazon_blue scrollbar-thumb-rounded-sm scrollbar-track-gray-50">
                  {allDepartmentItems.map((allDepartmentItem) => (
                    <li
                      className="text-sm tracking-wide font-titleFont border-b border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200"
                      key={allDepartmentItem._id}
                    >
                      {allDepartmentItem.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <input
            className="h-full text-base text-amazon_blue flex-grow outline-none border-none px-2"
            type="text"
          />
          <span className="w-12 h-full rounded-tr-md rounded-br-md flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer">
            <Search />
          </span>
        </div>
        {/* search end */}
        {/* sign in start */}
        <Link to="signin">
          <div className="flex flex-col items-start justify-center headerHover">
            {userInfoVar ? (
              <p className="md:text-xs text-sm  text-lightText font-medium mdl2:font-medium">
                {userInfoVar.userName}
              </p>
            ) : (
              <p className="md:text-xs text-sm  text-lightText font-medium mdl2:font-light">
                Hello, Sign in
              </p>
            )}

            <p className="text-sm font-semibold -mt-1 text-whiteText hidden mdl2:inline-flex">
              Accounts & Lists{" "}
              <span className="grow-0">
                <ArrowDropDownOutlined />
              </span>
            </p>
          </div>
        </Link>
        {/* sign in end */}
        {/* Orders start here */}
        <div className="hidden lg:flex flex-col items-start justify-center headerHover">
          <p className="text-xs text-lightText font-light">Returns</p>
          <p className="text-sm font-semibold -mt-1 text-whiteText">& Orders</p>
        </div>
        {/* Orders ends here */}
        {/* Cart start here */}
        <Link to="cartlist">
          <div className="flex items-start justify-center headerHover relative">
            <ShoppingCart />
            <p className="text-xs font-semibold mt-3 text-whiteText">
              Cart{" "}
              <span className="absolute text-xs -top-1 left-6 p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex items-center justify-center">
                {productsAddedToCartVar.length > 0
                  ? productsAddedToCartVar.length
                  : 0}
              </span>
            </p>
          </div>
        </Link>
        {/* Cart end here */}
        {/* Logout start */}
        {userInfoVar && (
          <div
            onClick={handleSignOut}
            className="flex flex-col justify-center items-center headerHover relative"
          >
            <Logout />
            <p className="hidden mdl:inline-flex text-xs font-semibold text-whiteText">
              Log out
            </p>
          </div>
        )}
        {/* Logout end */}
      </div>
      <HeaderBottom />
    </div>
  );
};

export default Header;
