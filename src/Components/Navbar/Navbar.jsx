import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Bell,
  ChevronDown,
  CreditCard,
  Download,
  Heart,
  Headphones,
  LogOut,
  Menu,
  Package,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import styles from "./Navbar.module.scss";
import { AuthContext } from "../../../context/AuthContext";

const API_BASE = "https://my-kart-server-3.onrender.com";

const menuItems = [
  { label: "Notifications", icon: Bell },
  { label: "Customer care", icon: Headphones },
  { label: "Trending deals", icon: TrendingUp },
  { label: "Download app", icon: Download },
];

const accountItems = [
  { label: "My profile", icon: User },
  { label: "MyKart Plus", icon: Star },
  { label: "Orders", icon: Package },
  { label: "Wishlist", icon: Heart },
  { label: "Gift cards", icon: CreditCard },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [query, setQuery] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const isLoggedIn = Boolean(user);
  const username = user?.name || "User";

  useEffect(() => {
    const closeMenus = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowMenu(false);
        setShowAccount(false);
        setShowMobileSearch(false);
      }
    };

    const closeOnEsc = (event) => {
      if (event.key === "Escape") {
        setShowMenu(false);
        setShowAccount(false);
        setShowMobileSearch(false);
      }
    };

    document.addEventListener("mousedown", closeMenus);
    document.addEventListener("keydown", closeOnEsc);
    return () => {
      document.removeEventListener("mousedown", closeMenus);
      document.removeEventListener("keydown", closeOnEsc);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE}/api/auth/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
      setShowAccount(false);
      navigate("/Login");
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate("/NotFound");
      setShowMobileSearch(false);
    }
  };

  const goToFallback = () => {
    setShowMenu(false);
    setShowAccount(false);
    navigate("/NotFound");
  };

  return (
    <header className={styles.navShell} ref={navRef}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.brand} aria-label="MyKart home">
          <span className={styles.brandMark}>M</span>
          <strong>MyKart</strong>
        </Link>

        <form className={styles.searchBar} onSubmit={handleSearch}>
          <Search size={19} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products, brands, and categories"
            aria-label="Search products"
          />
          <button type="submit">Search</button>
        </form>

        <nav className={styles.navActions} aria-label="Primary navigation">
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setShowMobileSearch((value) => !value)}
            aria-label="Open search"
          >
            {showMobileSearch ? <X size={20} /> : <Search size={20} />}
          </button>

          <div className={styles.accountArea}>
            <button
              type="button"
              className={styles.accountButton}
              onClick={() => {
                if (!isLoggedIn) navigate("/Login");
                setShowAccount((value) => !value);
                setShowMenu(false);
              }}
              aria-expanded={showAccount}
            >
              <User size={18} />
              <span>{isLoggedIn ? username : "Login"}</span>
              <ChevronDown size={16} />
            </button>

            {showAccount && (
              <div className={styles.dropdown}>
                {!isLoggedIn && (
                  <div className={styles.dropdownTop}>
                    <span>New here?</span>
                    <button type="button" onClick={() => navigate("/Signup")}>Create account</button>
                  </div>
                )}
                {accountItems.map(({ label, icon: Icon }) => (
                  <button type="button" key={label} onClick={goToFallback}>
                    {React.createElement(Icon, { size: 17 })}
                    {label}
                  </button>
                ))}
                {isLoggedIn && (
                  <button type="button" onClick={handleLogout}>
                    <LogOut size={17} />
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>

          <Link to="/Cart" className={styles.cartLink}>
            <ShoppingCart size={19} />
            <span>Cart</span>
          </Link>

          <button
            type="button"
            className={styles.iconButton}
            onClick={() => {
              setShowMenu((value) => !value);
              setShowAccount(false);
            }}
            aria-label="Open more menu"
            aria-expanded={showMenu}
          >
            <Menu size={21} />
          </button>

          {showMenu && (
            <div className={`${styles.dropdown} ${styles.moreMenu}`}>
              <div className={styles.dropdownBadge}>
                <Sparkles size={16} />
                Fresh offers every week
              </div>
              {menuItems.map(({ label, icon: Icon }) => (
                <button type="button" key={label} onClick={goToFallback}>
                  {React.createElement(Icon, { size: 17 })}
                  {label}
                </button>
              ))}
              <div className={styles.secureNote}>
                <ShieldCheck size={16} />
                Secured payments and easy returns
              </div>
            </div>
          )}
        </nav>
      </div>

      {showMobileSearch && (
        <form className={styles.mobileSearch} onSubmit={handleSearch}>
          <Search size={18} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search MyKart"
            autoFocus
          />
        </form>
      )}
    </header>
  );
};

export default Navbar;
