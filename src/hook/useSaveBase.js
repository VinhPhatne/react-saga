import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const useSaveBase = (config) => {
  const navigate = useNavigate();
  const { fetchData } = useFetch(config);

  const getListUrl = () => {
    return config.listUrl || navigate(-1);
  };

  const saveApi = async (mode, objectId, values) => {
    try {
      if (mode === "Edit" && objectId) {
        // Gọi API update với pathParams
        const response = await fetchData("update", { id: objectId }, values);
        console.log("Updated :", response);
        notification.success({
          message: "Updated",
          description: "The object has been successfully updated.",
        });
      } else {
        // Gọi API create
        const response = await fetchData("create", {}, values);
        console.log("Created :", response);
        notification.success({
          message: "Created",
          description: "A new object has been successfully created.",
        });
      }
      const listUrl = getListUrl();
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
