import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const dropdownRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      const parsed = JSON.parse(user);
      setUsername(parsed.name || "User");
      setIsLoggedIn(true);
    } else setIsLoggedIn(false);
  }, []);

  // Close mobile search on outside click or Esc
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target)
      ) {
        setShowMobileSearch(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setShowMobileSearch(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handle404Click = () => navigate("/NotFound");
  const handleLoginClick = () => navigate("/Login");

  return (
    <header className={styles.navContainer}>
      {/* Logo */}
      <div className={styles.logo}>
        <h1 className={styles.logoHead}>MyKart</h1>
        <p className={styles.logoText}>Explore Plus</p>
      </div>

      {/* Desktop Search */}
      <div className={styles.searchTab}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search for Products, Brands and More"
          className={styles.input}
        />
      </div>

      {/* Right Section */}
      <div className={styles.navRight}>
        {/* Mobile Search Icon */}
        <div
          className={styles.mobileSearchIcon}
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          <FiSearch />
        </div>

        {/* Login / User */}
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
            <div className={`${styles.dropdown} ${styles.fadeIn}`}>
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

        {/* Cart */}
        <Link
          to="/cart"
          className={styles.cart}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <FiShoppingCart className={styles.icon} />
          <span className={styles.cartText}>Cart</span>
        </Link>

        {/* Always visible three dots */}
        <div
          ref={dropdownRef}
          className={styles.menuIcon}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <FiMoreVertical />
        </div>

        {showDropdown && (
          <div className={`${styles.dropdown} ${styles.fadeIn}`}>
            <div onClick={handle404Click} className={styles.dropdownItem}>
              <FiBell className={styles.icon} />
              <span>Notifications</span>
            </div>
            <div onClick={handle404Click} className={styles.dropdownItem}>
              <FiHeadphones className={styles.icon} />
              <span>Customer Care</span>
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

      {/* Mobile Search */}
      <div
        ref={mobileSearchRef}
        className={`${styles.mobileSearchWrapper} ${
          showMobileSearch ? styles.show : ""
        }`}
      >
        <div className={styles.mobileSearchInner}>
          <FiSearch className={styles.mobileSearchIconInside} />
          <input
            type="text"
            placeholder="Search MyKart..."
            className={styles.mobileSearchInput}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
