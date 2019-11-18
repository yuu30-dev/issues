/**
 * Issue一覧を取得します。
 *
 * @param page 取得するページ
 * @param perPage 取得する項目数
 */
export function getIssues(page: number, perPage = 10) {
  return fetch(
    `https://api.github.com/repos/facebook/react/issues?page=${page}&amp;per_page=${perPage}`
  );
}

/**
 * ヘッダーからリンクヘッダー情報を取得します。
 *
 * @param headers ヘッダー
 */
export function getLinkHeaderInfoFromHeaders(headers: Headers) {
  // ページ情報を取得する
  const getPage = (url: string | undefined) => {
    if (url === undefined) {
      return 0;
    }
    const query = url.split("?")[1];
    const params = new URLSearchParams(query);
    const page = params.get("page");
    return page === null ? 0 : +page;
  };

  // リスポンスヘッダーからリンクヘッダー情報を取得
  const linkHeader = headers.get("Link");
  if (linkHeader === null) {
    return { first: 0, next: 0, prev: 0, last: 0 };
  }

  // リンクヘッダー情報は、"," 区切りで格納されているため、分割する
  // example:
  // <https://api.github.com/user/repos?page=3&per_page=100>; rel="next",
  // <https://api.github.com/user/repos?page=50&per_page=100>; rel="last"
  const splitedLinkHeader = linkHeader.split(",");

  // Mapの形に成形する
  // example:
  // "next": "https://api.github.com/user/repos?page=3&per_page=100"
  // "last": "https://api.github.com/user/repos?page=50&per_page=100"
  let parsedData = new Map<string, string>();
  for (const linkHeader of splitedLinkHeader) {
    const linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/gi.exec(linkHeader);

    if (linkInfo) {
      parsedData.set(linkInfo[2], linkInfo[1]);
    }
  }

  return {
    first: getPage(parsedData.get("first")),
    next: getPage(parsedData.get("next")),
    prev: getPage(parsedData.get("prev")),
    last: getPage(parsedData.get("last"))
  };
}
