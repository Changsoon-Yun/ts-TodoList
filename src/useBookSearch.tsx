import axios from "axios";
import { useEffect, useState } from "react";

export default function useBookSearch(query: string, pageNumber: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([] as any);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: any;
    axios
      .get("http://openlibrary.org/search.json", {
        params: { q: query, page: pageNumber },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((result: any) => {
        setBooks((prevBooks: string) => {
          return [
            ...new Set([
              ...prevBooks,
              result.data.docs.map((b: any) => b.title),
            ]),
          ];
        });
        setHasMore(result.data.docs.length > 0);
        setLoading(false);
        console.log(result.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);
  return { loading, error, books, hasMore };
}
