import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { BsInstagram, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;

    if (direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };
  // console.log(products[0]);
   cartItems.filter((item,index,arr)=> arr[index].name==="Fish").map((item) => {
      console.log(item.product)
    }); 
  return (
    <Fragment> 
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="hotel system" />

          <div className="banner">
            <p>Welcome to Restaurant</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
            </div>
            <div className="gallery flex__center">
      <div className="gallery-content">
        <h1 className="headtext__cormorant">Menu Gallery</h1>
        <p className="p__opensans" style={{ color: '#AAAAAA', marginTop: '2rem' }}>FOOD IS OUR COMMON GROUND, A UNIVERSAL EXPERIENCE.</p>
      </div>
      <div className="gallery-images">
        <div className="gallery-images_container" ref={scrollRef}>
          {products &&
              products.map((product) => (
            <div className="gallery-images_card flex__center" >
              <img src={product.images[0].url} alt="gallery_image" />
              <BsInstagram className="gallery__image-icon" />
            </div>
            ))}
        </div>
        <div className="gallery-images_arrows">
          <BsArrowLeftShort className="gallery__arrow-icon" onClick={() => scroll('left')} />
          <BsArrowRightShort className="gallery__arrow-icon right" onClick={() => scroll('right')} />
        </div>
      </div>
    </div>
            
          <h2 className="homeHeading">Our Menu</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
