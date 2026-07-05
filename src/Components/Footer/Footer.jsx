import React from "react";
import { ArrowRight, Mail, ShieldCheck, Truck } from "lucide-react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoBlock}>
          <span className={styles.brandMark}>M</span>
          <h2>MyKart</h2>
        </div>

        <div className={styles.promiseStrip}>
          <span><Truck size={18} /> Fast dispatch</span>
          <span><ShieldCheck size={18} /> Secure payments</span>
          <span><Mail size={18} /> Offer alerts</span>
        </div>

        <div className={styles.linksGrid}>
          <div>
            <h3>Shop</h3>
            <a href="/">Home</a>
            <a href="/NotFound">Categories</a>
            <a href="/Cart">Cart</a>
          </div>
          <div>
            <h3>Account</h3>
            <a href="/Login">Login</a>
            <a href="/Signup">Create account</a>
            <a href="/NotFound">Orders</a>
          </div>
          <div className={styles.newsletter}>
            <h3>Newsletter</h3>
            <form>
              <input type="email" placeholder="Email address" aria-label="Email address" />
              <button type="submit" aria-label="Subscribe">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>Copyright {new Date().getFullYear()} MyKart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

