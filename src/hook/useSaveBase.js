import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import useFetch from "../hook/useFetch";

const useSaveBase = (pageName) => {
  const navigate = useNavigate();
  const { fetchData } = useFetch(pageName);

  const getListUrl = (pageName) => {
    if (pageName) {
      return `/${pageName}`;
    }
    return navigate(-1);
  };

  const saveApi = async (mode, objectId, values) => {
    try {
      if (mode === "Edit" && objectId) {
        // Gọi API update
        const response = await fetchData("update", objectId, values);
        console.log("Updated :", response.data);
        notification.success({
          message: "Updated",
          description: "The object has been successfully updated.",
        });
      } else {
        // Gọi API create
        const response = await fetchData("create", null, values);
        console.log("Created :", response.data);
        notification.success({
          message: "Created",
          description: "A new object has been successfully created.",
        });
      }
      const listUrl = getListUrl(pageName);
      navigate(listUrl);
    } catch (error) {
      console.error("Error occurred:", error);
      notification.error({
        message: "Error",
        description: "Operation failed due to CORS issue or network error.",
      });
      navigate(-1);
    }
  };

  return saveApi;
};

export default useSaveBase;
