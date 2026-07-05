import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./CategoryProducts.module.scss";

const API_BASE = "https://my-kart-server-3.onrender.com";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

const sectionId = (category) => `category-${category.toLowerCase().replace(/\s+/g, "-")}`;

const CategoryProducts = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE}/api/products/category/${category}`)
      .then((res) => setProducts(res.data || []))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [category]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={sectionId(category)}
      className={`${styles.categorySection} ${animate ? styles.animate : ""}`}
    >
      <div className={styles.sectionHeader}>
        <h2>Best of {category}</h2>
        <button type="button" onClick={() => navigate("/NotFound")} aria-label={`View all ${category}`}>
          <ArrowRight size={18} />
        </button>
      </div>

      {loading ? (
        <div className={styles.skeletonGrid}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className={styles.skeletonCard}>
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonLine} />
              <div className={styles.skeletonLineShort} />
            </div>
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={12}
          slidesPerView={6}
          breakpoints={{
            320: { slidesPerView: 2.15, spaceBetween: 10 },
            520: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 4, spaceBetween: 12 },
            1080: { slidesPerView: 5, spaceBetween: 12 },
            1320: { slidesPerView: 6, spaceBetween: 12 },
          }}
          className={styles.swiperWrapper}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <Link to={`/product/${product._id}`} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={`${API_BASE}${product.image}`} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <strong>{formatPrice(product.price)}</strong>
              </Link>
            </SwiperSlide>
          ))}

          <SwiperSlide>
            <button type="button" className={`${styles.card} ${styles.seeMoreCard}`} onClick={() => navigate("/NotFound")}>
              <ArrowRight size={24} />
            </button>
          </SwiperSlide>
        </Swiper>
      )}
    </section>
  );
};

export default CategoryProducts;
