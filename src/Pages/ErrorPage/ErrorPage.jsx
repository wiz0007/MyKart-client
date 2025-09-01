import React from "react";
import styles from "./ErrorPage.module.scss";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <div className={styles.notFound}>
        <div className={styles.content}>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className={styles.homeBtn}>
            Go to Homepage
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
