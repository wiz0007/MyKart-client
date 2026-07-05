import React from "react";
import { Link } from "react-router-dom";
import styles from "./AuthShell.module.scss";

const AuthShell = ({ children }) => {
  return (
    <div className={styles.authShell}>
      <header className={styles.authNav}>
        <Link to="/" className={styles.brand} aria-label="MyKart home">
          <span className={styles.brandMark}>M</span>
          <strong>MyKart</strong>
        </Link>
      </header>
      {children}
    </div>
  );
};

export default AuthShell;
