import React from "react";
import styles from "./Pagenation.module.css";
import { Link } from "react-router-dom";

// ページネーション情報
type PagenationProps = {
  first: number;
  next: number;
  prev: number;
  last: number;
  current: number;
};

/**
 * ページネーションコンポーネント
 * @param props ページネーション情報
 */
const Pagenation = (props: PagenationProps) => {
  // 非活性のスタイル
  const isDisable = (page: number) => (page <= 0 ? styles.disable : "");

  // これ以上ページ遷移できない場合に非活性のスタイルを追加する
  const styleFirst = `${styles.pageLink} ${isDisable(props.first)}`;
  const stylePrev = `${styles.pageLink} ${isDisable(props.prev)}`;
  const styleNext = `${styles.pageLink} ${isDisable(props.next)}`;
  const styleLast = `${styles.pageLink} ${isDisable(props.last)}`;

  // ページ遷移時の処理
  const handleClick = (e: React.MouseEvent, page: number) => {
    if (page <= 0) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.container}>
      <Link
        to={`/issues?page=${props.first}`}
        className={styleFirst}
        onClick={e => handleClick(e, props.first)}
      >
        ＜＜
      </Link>
      <Link
        to={`/issues?page=${props.prev}`}
        className={stylePrev}
        onClick={e => handleClick(e, props.prev)}
      >
        ＜
      </Link>
      <span className={styles.current}>{props.current}</span>
      <Link
        to={`/issues?page=${props.next}`}
        className={styleNext}
        onClick={e => handleClick(e, props.next)}
      >
        ＞
      </Link>
      <Link
        to={`/issues?page=${props.last}`}
        className={styleLast}
        onClick={e => handleClick(e, props.last)}
      >
        ＞＞
      </Link>
    </div>
  );
};

export default Pagenation;
