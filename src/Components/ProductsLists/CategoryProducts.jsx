import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./CategoryProducts.module.scss";

const CategoryProducts = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://my-kart-server-3.onrender.com/api/products/category/${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [category]);

  // Trigger animation on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.3 }
    );
    const el = document.querySelector(`.${styles.categorySection}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (loading) {
    return (
      <div className={styles.categorySection}>
        <h2>Best of {category}</h2>
        <div className={styles.sliderWrapper}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`${styles.card} ${styles.skeleton}`}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.categorySection} ${animate ? styles.animate : ""}`}>
      <h2 className={styles.heading}>Best of {category}</h2>
      <div
        className={styles.swiperContainer}
        onMouseEnter={() => swiperRef.current?.swiper?.autoplay.stop()}
        onMouseLeave={() => swiperRef.current?.swiper?.autoplay.start()}
      >
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={24}
          slidesPerView={5}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 2 },
            480: { slidesPerView: 2.3 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className={styles.swiperWrapper}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <Link to={`/product/${product._id}`} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img
                    src={`https://my-kart-server-3.onrender.com${product.image}`}
                    alt={product.name}
                  />
                </div>
                <div className={styles.productTitle}>{product.name}</div>
                <div className={styles.productPrice}>From ₹{product.price}</div>
              </Link>
            </SwiperSlide>
          ))}

          <SwiperSlide>
            <div
              className={`${styles.card} ${styles.seeMoreCard}`}
              onClick={() => navigate("/NotFound")}
            >
              <div className={styles.seeMoreText}>See More</div>
              <div className={styles.arrow}>&rarr;</div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default CategoryProducts;
