import React, { useState } from "react";
import { darkLogo } from "../assets";
import { ArrowRight } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/amazonSLice";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  // firebase error
  const [userEmailError, setUserEmailError] = useState("");
  const [userPasswordError, setUserPasswordError] = useState("");

  // loading state
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    if (!email) {
      setErrEmail("Enter your email");
      setUserEmailError("");
    }
    if (!password) {
      setErrPassword("Enter your password");
      setUserPasswordError("");
    } else if (password.length < 6) {
      setErrPassword("Password must be at least 6 characters");
    }
    if (email && password && password.length >= 6) {
      setLoading(true);
      // firebase sign in start
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
          dispatch(
            setUserInfo({
              _id: user.uid,
              userName: user.displayName,
              email: user.email,
              image: user.photoURL,
            })
          );

          setLoading(false);
          setSuccessMsg("Logged in successfully! Welcome you back!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);

          if (errorCode.includes("auth/wrong-password")) {
            setUserPasswordError("Wrong password! Try again!");
            setErrPassword("");
          }
          if (errorCode.includes("auth/invalid-email")) {
            setUserEmailError("Invalid email!");
            setErrEmail("");
          }
          if (errorCode.includes("auth/user-not-found")) {
            setUserEmailError("Invalid email!");
            setErrEmail("");
          }
          setLoading(false);
        });
      // setEmail("");
      // setPassword("");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        {successMsg ? (
          <div className="w-full flex justify-center items-center py-32">
            <p className="border border-green-600 text-green-500 font-titleFont text-lg font-semibold px-6 py-2">
              {successMsg}
            </p>
          </div>
        ) : (
          <form className="w-[350px] mx-auto flex flex-col items-center">
            <Link to="/">
              <img className="w-32" src={darkLogo} alt="darkLogo" />
            </Link>
            <div className="w-full border border-zinc-200 p-6">
              <h2 className="font-titleFont text-3xl font-medium mb-4">
                Sign In
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">
                    Email or mobile phone number
                  </p>
                  <input
                    className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                    type="text"
                    onChange={handleEmail}
                    value={email}
                  />
                  {errEmail && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {errEmail}
                    </p>
                  )}
                  {userEmailError && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {userEmailError}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Password</p>
                  <input
                    className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                    type="password"
                    onChange={handlePassword}
                    value={password}
                  />
                  {errPassword && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {errPassword}
                    </p>
                  )}
                  {userPasswordError && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {userPasswordError}
                    </p>
                  )}
                  {password.length >= 6 || errPassword ? (
                    ""
                  ) : (
                    <p className="text-xs text-gray-600">
                      Password must be at least 6 characters.
                    </p>
                  )}
                </div>
                <button
                  onClick={handleLogIn}
                  className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7d5a5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
                >
                  Continue
                </button>
                {loading && (
                  <div className="flex justify-center">
                    <RotatingLines
                      strokeColor="#febd69"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="50"
                      visible={true}
                    />
                  </div>
                )}
                <p className="text-xs text-black leading-4 mt-2">
                  By continuing, you agree to Amazon's{" "}
                  <span className="text-blue-600">Conditions of Use</span>and{" "}
                  <span className="text-blue-600">Privacy Policy</span>
                </p>
                <p className="text-xs text-gray-600 mt-1 cursor-pointer group">
                  <ArrowRight />{" "}
                  <span className="group-hover:text-orange-700 group-hover:underline underline-offset-1">
                    Need help?
                  </span>
                </p>
              </div>
            </div>
            <p className="w-full text-xs text-gray-600 mt-6 flex items-center">
              <span className="w-1/3 h-[1px] bg-zinc-300 inline-flex"></span>
              <span className="w-1/3 text-center">New to Amazon?</span>
              <span className="w-1/3 h-[1px] bg-zinc-300 inline-flex"></span>
            </p>
            <Link className="w-full" to="/register">
              <button
                // onClick={(e) => e.preventDefault()}
                className="w-full py-1.5 mt-4 text-xs font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                Create your Amazon account
              </button>
            </Link>
          </form>
        )}
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10">
        <div className="flex items-center gap-6">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1">
            Conditions of Use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1">
            Privacy Policy
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1">
            Privacy Policy
          </p>
        </div>
        <p className="text-xs text-gray-600">
          c 1996-2023, Reactbd.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default Signin;
