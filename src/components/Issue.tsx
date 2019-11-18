import React from "react";
import styles from "./Issue.module.css";
import { IssueProps } from "../common/IssueProps";

/**
 * Issueコンポーネント
 *
 * @param props Issue情報
 */
const Issue = (props: IssueProps) => {
  return (
    <>
      <p className={styles.number}>#{props.number}</p>
      <p className={styles.title}>{props.title}</p>
    </>
  );
};

export default Issue;
