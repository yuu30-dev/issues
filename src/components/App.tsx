import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./Header";
import Issues from "./Issues";
import IssueDetail from "./IssueDetail";
import Pagenation from "./Pagenation";
import { IssueProps } from "../common/IssueProps";
import { getIssues, getLinkHeaderInfoFromHeaders } from "../api/IssueAPI";

/**
 * アプリコンポーネント
 */
const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [firstPage, setFirstPage] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [issues, setIssues] = useState<IssueProps[]>([]);

  useEffect(() => {
    (async () => {
      if (currentPage === 0) {
        return;
      }
      await getIssues(currentPage)
        .then(res => {
          // リンクヘッダー情報を取得
          const linkHeaderInfo = getLinkHeaderInfoFromHeaders(res.headers);
          setFirstPage(linkHeaderInfo.first);
          setNextPage(linkHeaderInfo.next);
          setPrevPage(linkHeaderInfo.prev);
          setLastPage(linkHeaderInfo.last);

          // JSONデータを取得
          return res.json() as Promise<IssueProps[]>;
        })
        .then(
          result => {
            setIssues(result);
          },
          error => {}
        );
    })();

    // currentPageが更新されると再取得するよう設定
  }, [currentPage]);

  return (
    <BrowserRouter>
      <Header />
      <main className={styles.main}>
        <Switch>
          <Route
            exact
            path="/issues"
            render={({ history, match, location }) => {
              const query = new URLSearchParams(location.search);
              const page = query.get("page");
              setCurrentPage(page === null ? 1 : +page);

              return (
                <>
                  <Issues
                    issues={issues}
                    onIssueItemClick={num => {
                      const nextPage = match.url.endsWith("/")
                        ? num
                        : `/${num}`;
                      history.push(`${match.url}${nextPage}`);
                    }}
                  />
                  <Pagenation
                    first={firstPage}
                    next={nextPage}
                    prev={prevPage}
                    last={lastPage}
                    current={currentPage}
                  />
                </>
              );
            }}
          />
          <Route
            exact
            path="/issues/:number"
            render={({ match }) => {
              const selectedNum = +match.params.number;
              const selectedIssue = issues.filter(issue => {
                return selectedNum === issue.number;
              })[0] as IssueProps;

              return (
                <IssueDetail
                  number={selectedIssue.number}
                  title={selectedIssue.title}
                  body={selectedIssue.body}
                />
              );
            }}
          />
          />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
