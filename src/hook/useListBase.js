import axios from "axios";
import React, { useEffect, useState } from "react";
import * as api from "../api/users";

const useListBase = (apiConfig) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    pageSize: 5,
  });

  const fetchData = async () => {
    try {
      const res = await api.getUsers();
      setData(res.data.data);
      setFilteredData(res.data.data);
      setPagination((prev) => ({
        ...prev,
        total: res.data.data.length,
      }));
    } catch (e) {}
  };

  useEffect(() => {
    fetchData();
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
