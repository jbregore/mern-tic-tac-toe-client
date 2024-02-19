import { useRouter } from "next/router";
import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

interface PaginationComponentProps {
  data: Array<any> | any;
  page: string | number | string[];
  numberOfPages: number;
  total: number;
  onNext: (page: number) => void;
}

const PaginationComponent = (props: PaginationComponentProps) => {
  const { page, numberOfPages, data, total, onNext } = props;

  return (
    <div className="flex items-center mt-6 justify-between">
      <div>
        <p className="text-gray-600 text-sm">
          Showing {data.length || 0} out of {total || 0} records
        </p>
      </div>
      <div className="">
        <Pagination
          count={numberOfPages ? numberOfPages : 0}
          page={Number(page) || 1}
          size="small"
          renderItem={(item: any) => (
            <PaginationItem
              style={{ color: "#525F7F" }}
              {...item}
              value={item.page}
              onClick={() => onNext(item.page)}
            />
          )}
        />
      </div>
    </div>
  );
};

export default PaginationComponent;
