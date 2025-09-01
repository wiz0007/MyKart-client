import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h2>MyKart</h2>
          <p>Affordable shopping at your fingertips.</p>
        </div>

        <div className={styles.links}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>

        <div className={styles.newsletter}>
          <h4>Newsletter</h4>
          <p>Stay updated with our latest offers</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} MyKart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
