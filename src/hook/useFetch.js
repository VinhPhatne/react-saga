import { useState } from "react";
import axios from "axios";
import { Api } from "../api/config"; 

const useFetch = (pageName) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (endpoint, id = null, payload = null) => {
    try {
      const config = Api[pageName][endpoint];
      const url = id ? config.url.replace('{id}', id) : config.url;
      const response = await axios({
        url,
        method: config.method,
        headers: config.headers,
        data: payload,
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    data,
    error,
    fetchData,
  };
};

export default useFetch;
