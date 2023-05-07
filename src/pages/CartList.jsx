import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  deleteProductFromCart,
  incrementQuantity,
  productsAddedToCart,
  resetCart,
} from "../redux/amazonSLice";
import { CheckCircle } from "@mui/icons-material";
import { motion } from "framer-motion";
import { emptyCart } from "../assets";
import { Link } from "react-router-dom";

const CartList = () => {
  const productsAddedToCartVar = useSelector(productsAddedToCart);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(null);
  useEffect(() => {
    let total = 0;
    productsAddedToCartVar.map((product) => {
      total += product.price * product.quantity;
      return setTotalPrice(total.toFixed(2));
    });
  }, [productsAddedToCartVar]);
  return (
    <div className="w-full p-4">
      {productsAddedToCartVar.length > 0 ? (
        <div className="container mx-auto h-auto grid grid-cols-5 gap-8">
          <div className="w-full h-full bg-white px-4 col-span-4">
            <div className="font-titleFont flex items-end justify-between border-b border-b-gray-400 py-3">
              <h2 className="text-3xl font-medium">Shopping Cart</h2>
              <h4 className="text-xl font-medium">Subtotal</h4>
            </div>
            {/* products map start here */}
            <div>
              {productsAddedToCartVar.map((product) => (
                <div
                  key={product.id}
                  className="w-full border-b border-b-gray-300 px-2 py-4 flex justify-between items-center gap-6"
                >
                  <div className="w-1/5">
                    <img
                      className="w-full h-44 object-contain"
                      src={product.image}
                      alt="productImage"
                    />
                  </div>
                  <div className="w-4/5 flex flex-col gap-2">
                    <h2 className="font-semibold text-lg">{product.title}</h2>
                    <p className="pr-10 text-sm">{product.description}</p>
                    <p className="text-base">
                      Unit Price:{" "}
                      <span className="font-semibold ml-1">
                        ${product.price}
                      </span>
                    </p>
                    <div className="bg-[#F0F2F2] flex justify-center items-center gap-2 w-36 py-1 text-center drop-shadow-lg rounded-md">
                      <p className="mr-2">Qty:</p>
                      <p
                        onClick={() => dispatch(decrementQuantity(product.id))}
                        className="cursor-pointer bg-gray-200 px-2 rounded-md hover:bg-gray-400 duration-300"
                      >
                        -
                      </p>
                      <p>{product.quantity}</p>
                      <p
                        onClick={() => dispatch(incrementQuantity(product.id))}
                        className="cursor-pointer bg-gray-200 px-2 rounded-md hover:bg-gray-400 duration-300"
                      >
                        +
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        dispatch(deleteProductFromCart(product.id))
                      }
                      className="bg-red-500 w-36 py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300"
                    >
                      Delete Item
                    </button>
                  </div>
                  <div>
                    <p className="font-titleFont font-semibold">
                      ${product.price * product.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* products map end here */}
            <div className="py-4">
              <button
                onClick={() => dispatch(resetCart())}
                className="bg-red-500 w-44 py-2 rounded-lg text-white hover:bg-red-700 active:bg-red-900 duration-300 font-titleFont font-semibold text-lg tracking-wide"
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div className="w-full h-52 bg-white px-4 col-span-1 flex flex-col items-center justify-center p-4">
            <div>
              <p className="flex gap-2 items-start text-sm">
                <span>
                  <CheckCircle className="bg-white text-green-500 rounded-full" />
                </span>
                Your order qualifies for FREE Shipping Choose this option at
                checkout. See details....
              </p>
            </div>
            <div className="w-full">
              <p className="font-semibold px-6 py-1 flex items-center justify-between">
                Total: <span className="text-lg font-bold">${totalPrice}</span>
              </p>
            </div>
            <button className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-2">
              Procced To Pay
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center items-center gap-4 py-10"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt=""
            />
          </div>
          <div className="w-96 p-4 bg-white flex  flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold">
              Your Cart Feels Lonely
            </h1>
            <p className="text-sm text-center">
              {" "}
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/">
              <button className="mt-6 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-600 px-8 py-2 font-titleFont font-semibold text-lg">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CartList;
