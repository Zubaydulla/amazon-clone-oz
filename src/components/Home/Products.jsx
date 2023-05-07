import {
  Api,
  ArrowCircleRight,
  Favorite,
  ShoppingCart,
  Star,
} from "@mui/icons-material";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { setProductsAddedToCart } from "../../redux/amazonSLice";

const Products = () => {
  const dispatch = useDispatch();
  const data = useLoaderData();
  const productsData = data.data;

  return (
    <div className="bg-gray-100 w-full -mt-12 xl:-mt-32 py-8">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-4 px-4">
        {productsData.map((product) => (
          <div
            key={product.id}
            className="bg-white h-auto border-[1px] border-gray-200 pt-8 pb-6 z-20 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col justify-between gap-4"
          >
            <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-500">
              {product.category}
            </span>
            <div className="w-full h-auto flex items-center justify-center relative group">
              <img
                className="w-52 h-64 object-contain"
                src={product.image}
                alt="productImg"
              />
              <ul className="w-full h-36 bg-gray-100 absolute -bottom-[160px] group-hover:bottom-0 duration-700 flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
                <li className="productLi">
                  Compare{" "}
                  <span>
                    <Api />
                  </span>
                </li>
                <li className="productLi">
                  Add to Cart
                  <span>
                    <ShoppingCart />
                  </span>
                </li>
                <li className="productLi">
                  View Details{" "}
                  <span>
                    <ArrowCircleRight />
                  </span>
                </li>
                <li className="productLi">
                  Add to Wish List{" "}
                  <span>
                    <Favorite />
                  </span>
                </li>
              </ul>
            </div>
            <div className="px-4 bg-white z-10 flex flex-col justify-between h-[180px]">
              <div className="flex items-center justify-between mb-1.5">
                <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">
                  {product.title.substring(0, 20)}
                </h2>
                <p className="text-sm text-gray-600 font-semibold">
                  ${product.price}
                </p>
              </div>
              <div className="text-sm">
                {product.description.substring(0, 100)}...
              </div>
              <div className="text-yellow-500 mt-1 flex">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <button
                onClick={() =>
                  dispatch(
                    setProductsAddedToCart({
                      id: product.id,
                      title: product.title,
                      description: product.description,
                      price: product.price,
                      category: product.category,
                      image: product.image,
                      quantity: 1,
                    })
                  )
                }
                className="w-full py-1.5 rounded-md mt-5 font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200"
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
