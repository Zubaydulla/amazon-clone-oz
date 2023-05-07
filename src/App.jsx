import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import { productsData } from "./api/api";
import Signin from "./pages/Signin";
import CartList from "./pages/CartList";
import Registration from "./pages/Registration";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} loader={productsData} />
          <Route path="/cartlist" element={<CartList />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Registration />} />
      </Route>
    )
  );
  return (
    <div className="font-bodyFont bg-gray-100">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
