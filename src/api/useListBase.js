import axios from "axios";
import React, { useEffect, useState } from "react";
import { Api } from "./config";
import * as api from "./users";

const useListBase = (apiConfig) => {
  const [data, setData] = useState([]);

  const [filteredData, setFilteredData] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const fetchData = async () => {
    try {
      const res = await api.getUsers();
      setData(res.data.data);
      setFilteredData(res.data.data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchData();
  }, [apiConfig]);

  const handleSubmit = ({ firstName, lastName }) => {
    return axios
      .post(Api.create.url, { firstName, lastName })
      .then(() => {
        fetchData();
      })
      .catch((e) => {});
  };

   const handleFilterChange = (filter) => {
    const filtered = data.filter(
      (user) =>
        user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
        user.lastName.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); 
  };

  const paginate = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return {
    data: paginatedData, 
    total: filteredData.length,
    handleSubmit,
    handleFilterChange,
    paginate,
    currentPage,
  };
};

export default useListBase;
