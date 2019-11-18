import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "./IssueDetail.module.css";
import { IssueProps } from "../common/IssueProps";

/**
 * Issue詳細コンポーネント
 *
 * @param props Issue情報
 */
const IssueDetail = (props: IssueProps) => {
  return (
    <div>
      <h1 className={styles.title}>
        {props.title}&nbsp;
        <span className={styles.number}>#{props.number}</span>
      </h1>
      <p className={styles.body}>
        <ReactMarkdown source={props.body} />
      </p>
    </div>
  );
};

export default IssueDetail;
