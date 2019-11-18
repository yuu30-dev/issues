import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

/**
 * ヘッダーコンポーネント
 */
const Header = () => {
  return (
    <header className={styles.root}>
      <Link to="/issues" className={styles.title}>
        Issues
      </Link>
    </header>
  );
};

export default Header;
