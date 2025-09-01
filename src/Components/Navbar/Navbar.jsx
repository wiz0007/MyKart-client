import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cart from "../../features/Cart/Cart";

import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiChevronDown,
  FiMoreVertical,
  FiBell,
  FiHeadphones,
  FiTrendingUp,
  FiDownload,
  FiGift,
  FiHeart,
  FiBox,
  FiStar,
  FiCreditCard,
  FiLogOut,
} from "react-icons/fi";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      const parsed = JSON.parse(user);
      setUsername(parsed.name || "User");
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handle404Click = () => {
    navigate("/NotFound");
  };

  const handleLoginClick = () => {
    navigate("/Login");
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.logo}>
        <h1 className={styles.logoHead}>MyKart</h1>
        <p className={styles.logoText}>Explore Plus</p>
      </div>

      <div className={styles.searchTab}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search for Products, Brands and More"
          className={styles.input}
        />
      </div>

      {/* Login / User Menu */}
      <div
        onClick={!isLoggedIn ? handleLoginClick : undefined}
        className={styles.loginContainer}
        onMouseEnter={() => setShowLoginMenu(true)}
        onMouseLeave={() => setShowLoginMenu(false)}
      >
        <div className={styles.loginButton}>
          <FiUser className={styles.icon} />
          <span>{isLoggedIn ? username : "Login"}</span>
          <FiChevronDown className={styles.icon} />
        </div>

        {showLoginMenu && (
          <div className={styles.dropdown}>
            {!isLoggedIn && (
              <div className={styles.topRow}>
                <span>New customer?</span>
                <span
                  className={styles.signup}
                  onClick={() => navigate("/Signup")}
                >
                  Sign Up
                </span>
              </div>
            )}

            <div onClick={handle404Click} className={styles.menuItem}>
              <FiUser /> My Profile
            </div>
            <div onClick={handle404Click} className={styles.menuItem}>
              <FiStar /> MyKart Plus Zone
            </div>
            <div onClick={handle404Click} className={styles.menuItem}>
              <FiBox /> Orders
            </div>
            <div onClick={handle404Click} className={styles.menuItem}>
              <FiHeart /> Wishlist
            </div>
            <div onClick={handle404Click} className={styles.menuItem}>
              <FiCreditCard /> Gift Cards
            </div>

            {isLoggedIn && (
              <div onClick={handleLogout} className={styles.menuItem}>
                <FiLogOut /> Logout
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cart Section */}
      <Link to="/cart" className={styles.cart} style={{ textDecoration: "none", color: "black" }}>
          <FiShoppingCart className={styles.icon} />
          <span>Cart</span>
        </Link>

      {/* Mobile More Menu */}
      <div
        className={styles.menuIcon}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <FiMoreVertical />
      </div>

      {showDropdown && (
        <div className={styles.dropdown}>
          <div onClick={handle404Click} className={styles.dropdownItem}>
            <FiBell className={styles.icon} />
            <span>Notification Preferences</span>
          </div>
          <div onClick={handle404Click} className={styles.dropdownItem}>
            <FiHeadphones className={styles.icon} />
            <span>24x7 Customer Care</span>
          </div>
          <div onClick={handle404Click} className={styles.dropdownItem}>
            <FiTrendingUp className={styles.icon} />
            <span>Advertise</span>
          </div>
          <div onClick={handle404Click} className={styles.dropdownItem}>
            <FiDownload className={styles.icon} />
            <span>Download App</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

