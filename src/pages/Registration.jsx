import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { darkLogo } from "../assets";
import { ArrowRight } from "@mui/icons-material";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";
// import { useForm } from "react-hook-form";

const Registration = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error Message start
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [firebaseError, setFirebaseError] = useState("");

  // loading state
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  //   Handle function starts here
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setErrConfirmPassword("");
  };
  //   Handle function ends here

  //   email validation starts here
  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };
  //   email validation ends here

  // submit button function starts here
  const handleRegistration = (e) => {
    e.preventDefault();
    console.log(clientName);
    if (!clientName) {
      setErrClientName("Enter your name");
    }
    if (!email) {
      setErrEmail("Enter your email");
      setFirebaseError("");
    } else if (!emailValidation(email)) {
      setErrEmail("Enter a valid email");
    }
    if (!password) {
      setErrPassword("Enter your password");
    } else if (password.length < 6) {
      setErrPassword("Password must be at least 6 characters");
    }
    if (!confirmPassword) {
      setConfirmPassword("Confirm your password");
    } else if (confirmPassword !== password) {
      setErrConfirmPassword("Password not matched");
    }

    if (
      clientName &&
      email &&
      emailValidation(email) &&
      password &&
      password.length >= 6 &&
      confirmPassword &&
      confirmPassword === password
    ) {
      console.log(clientName, email, password, confirmPassword);

      setLoading(true);

      // firebase sign up starts here
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: clientName,
            photoURL: "",
          });
          // Signed in
          const user = userCredential.user;
          console.log(user);
          setLoading(false);
          setSuccessMsg("Account created successfully");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
          setClientName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setFirebaseError("");
          setErrEmail("");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseError("Email already in use, try another one!");
            setLoading(false);
          }

          // ..
        });
      // firebase sign up ends here

      // setClientName("");
      // setEmail("");
      // setPassword("");
      // setConfirmPassword("");
    }
  };
  // submit button function ends here

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form
          //   onClick={handleSubmit(onSubmit)}
          className="w-[370px] mx-auto flex flex-col items-center"
        >
          <Link to="/">
            <img className="w-32" src={darkLogo} alt="darkLogo" />
          </Link>
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Create Account
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Your name</p>
                <input
                  onChange={handleName}
                  className="w-full py-2 border border-zinc-400 px-2 text-sm rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  value={clientName}
                  type="text"
                  name="name"
                />
                {errClientName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 mt-[1px]">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errClientName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Mobile number or email</p>
                <input
                  onChange={handleEmail}
                  className="w-full lowercase py-2 border border-zinc-400 px-2 text-sm rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  value={email}
                  type="email"
                  //   placeholder="First and last name"
                  name="email"
                />
                {errEmail && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 mt-[1px]">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errEmail}
                  </p>
                )}
                {firebaseError && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 mt-[1px]">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {firebaseError}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Password</p>
                <input
                  onChange={handlePassword}
                  className="w-full py-2 border border-zinc-400 px-2 text-sm rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  value={password}
                  type="password"
                />
                {errPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 mt-[1px]">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errPassword}
                  </p>
                )}
                {password.length >= 6 || errPassword ? (
                  ""
                ) : (
                  <p className="text-xs text-gray-600">
                    Passwords must be at least 6 characters.
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Re-enter Password</p>
                <input
                  onChange={handleConfirmPassword}
                  className="w-full py-2 border border-zinc-400 px-2 text-sm rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  value={confirmPassword}
                  type="password"
                />
                {errConfirmPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 mt-[1px]">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errConfirmPassword}
                  </p>
                )}
              </div>
              <button
                onClick={handleRegistration}
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
              {successMsg && (
                <div>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-base font-titleFont font-semibold text-green-500 border border-green-500 px-2 text-center"
                  >
                    {successMsg}
                  </motion.p>
                </div>
              )}
            </div>
            <div className="pt-3 flex flex-col">
              <p className="text-xs text-black leading-5 py-5 border-b-[1px]">
                By creating an account, you agree to Amazon's{" "}
                <span className="text-blue-600">Conditions of Use</span>and{" "}
                <span className="text-blue-600">Privacy Policy</span>
              </p>
              <div className="text-xs text-black leading-5 pt-5 flex flex-col">
                <p className="flex items-center gap-1">
                  Already have an account?{" "}
                  <Link to="/signin">
                    <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 flex items-center">
                      Sign in
                      <ArrowRight sx={{ fontSize: 18 }} />
                    </span>
                  </Link>
                </p>
                <p className="flex items-center gap-1">
                  Buying for work?{" "}
                  <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 flex items-center">
                    Create a free business account
                    <ArrowRight sx={{ fontSize: 18 }} />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-7">
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
          © 1996-2023, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default Registration;
