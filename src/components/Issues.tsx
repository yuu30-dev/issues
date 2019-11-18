import React from "react";
import styles from "./Issues.module.css";
import Issue from "./Issue";
import { IssueProps } from "../common/IssueProps";

// Issue一覧情報
type IssuesProps = {
  issues: IssueProps[];
  onIssueItemClick: (num: number) => void;
};

/**
 * Issue一覧コンポーネント
 * @param props Issues情報
 */
const Issues = (props: IssuesProps) => {
  return (
    <>
      <div className={styles.list}>
        {props.issues.map(issue => (
          <div
            key={issue.number}
            className={styles.item}
            onClick={() => props.onIssueItemClick(issue.number)}
          >
            <Issue
              key={issue.number}
              number={issue.number}
              title={issue.title}
              body={issue.body}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Issues;
