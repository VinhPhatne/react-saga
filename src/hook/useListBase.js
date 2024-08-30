import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const useListBase = (apiConfig) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    pageSize: 5,
  });

  const { fetchData } = useFetch(apiConfig);

  const fetchUserData = async () => {
    try {
      // Gọi API 
      const res = await fetchData("getList");
      setData(res.data);
      setFilteredData(res.data);
      setPagination((prev) => ({
        ...prev,
        total: res.data.length,
      }));
    } catch (e) {
      console.error("Failed to fetch data:", e);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [apiConfig]);

  const paginatedData = filteredData.slice(
    (pagination.currentPage - 1) * pagination.pageSize,
    pagination.currentPage * pagination.pageSize
  );

  return {
    data: paginatedData,
    pagination,
    setPagination,
  };
};

export default useListBase;
