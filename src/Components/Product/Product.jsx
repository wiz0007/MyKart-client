import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Heart, Minus, Plus, RotateCcw, ShieldCheck, ShoppingBag, ShoppingCart, Star, Truck } from "lucide-react";
import styles from "./Product.module.scss";
import { AuthContext } from "../../../context/AuthContext";

const API_BASE = "https://my-kart-server-3.onrender.com";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products/${id}`);
        setProduct(res.data);

        if (user) {
          const cartRes = await axios.get(`${API_BASE}/api/cart`, { withCredentials: true });
          const found = cartRes.data.items.some((item) => item.product._id === id);
          setInCart(Boolean(found));
        }
      } catch (err) {
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, user]);

  const requireLogin = () => {
    if (authLoading) return false;

    if (!user) {
      alert("Please login first.");
      navigate("/Login");
      return false;
    }

    return true;
  };

  const addToCart = async () => {
    const canContinue = requireLogin();
    if (!canContinue || !product) return;

    try {
      await axios.post(
        `${API_BASE}/api/cart/add`,
        { productId: product._id, quantity },
        { withCredentials: true }
      );
      setInCart(true);
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart.");
    }
  };

  const handleBuyNow = async () => {
    const canContinue = requireLogin();
    if (!canContinue || !product) return;

    try {
      if (!inCart) {
        await axios.post(
          `${API_BASE}/api/cart/add`,
          { productId: product._id, quantity },
          { withCredentials: true }
        );
      }

      navigate("/payment", {
        state: {
          items: [{ product, quantity, price: product.price }],
          total: product.price * quantity,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to process Buy Now.");
    }
  };

  if (loading) {
    return (
      <main className={styles.mainContainerProduct}>
        <div className={styles.loadingGrid}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonDetails}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return <main className={styles.notFound}>Product not found</main>;
  }

  const productImage = `${API_BASE}${product.image}`;
  const total = product.price * quantity;

  return (
    <main className={styles.mainContainerProduct}>
      <section
        className={styles.productPage}
      >
        <div className={styles.imageSection}>
          <div className={styles.imageFrame}>
            <button type="button" className={styles.wishlistButton} aria-label="Save product">
              <Heart size={19} />
            </button>
            <img src={productImage} alt={product.name} />
          </div>
        </div>

        <div className={styles.detailsSection}>
          <div className={styles.breadcrumb}>MyKart / {product.category || "Featured"}</div>
          <div className={styles.titleRow}>
            <h1>{product.name}</h1>
            <span className={styles.ratingBadge}>
              <Star size={16} fill="currentColor" />
              4.8
            </span>
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.pricePanel}>
            <span>Deal price</span>
            <strong>{formatPrice(product.price)}</strong>
            <small>Inclusive of estimated taxes. Final delivery is calculated at checkout.</small>
          </div>

          <div className={styles.purchaseRow}>
            <div className={styles.quantityControl} aria-label="Quantity selector">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                <Minus size={16} />
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => value + 1)}>
                <Plus size={16} />
              </button>
            </div>
            <div className={styles.totalPreview}>
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
          </div>

          <div className={styles.buttons}>
            {inCart ? (
              <button type="button" onClick={() => navigate("/Cart")} className={styles.cartBtn}>
                <ShoppingCart size={19} />
                Go to cart
              </button>
            ) : (
              <button type="button" onClick={addToCart} className={styles.cartBtn}>
                <ShoppingCart size={19} />
                Add to cart
              </button>
            )}
            <button type="button" onClick={handleBuyNow} className={styles.buyBtn}>
              <ShoppingBag size={19} />
              Buy now
            </button>
          </div>

          <div className={styles.promiseGrid}>
            <span><Truck size={18} /> Fast dispatch</span>
            <span><ShieldCheck size={18} /> Secure payment</span>
            <span><RotateCcw size={18} /> Easy returns</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Product;



