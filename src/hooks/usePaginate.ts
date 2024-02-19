import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const usePaginate = (urlParam: string) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState(searchParams.get("page") || 1);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleRoute = (params: any) => {
    router.push(urlParam + "?" + createQueryString("page", params.page), {
      scroll: false,
    });
  };

  const handlePaginationChange = (current: number) => {
    if (page == current) {
    } else {
      handleRoute({ page: current });
      setPage(current);
    }
  };

  return {
    handlePaginationChange,
    page,
    setPage,
    handleRoute,
  };
};

export default usePaginate;
