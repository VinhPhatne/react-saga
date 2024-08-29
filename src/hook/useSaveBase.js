import { notification } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const useSaveBase = (createApi, updateApi) => {
  const navigate = useNavigate();
  const location = useLocation();

  // lấy phần đầu tiên của URL, ví dụ: 'user' hoặc 'news'
  const getCurrentPage = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    return pathSegments[0]; 
  };

  const saveApi = async (mode, objectId, values) => {
    try {
      if (mode === "Edit" && objectId) {
        // Gọi API update
        const response = await updateApi(objectId, values);
        console.log("Updated :", response.data);
        notification.success({
          message: "Updated",
          description: "The object has been successfully updated.",
        });
      } else {
        // Gọi API create
        const response = await createApi(values);
        console.log("Created :", response.data);
        notification.success({
          message: "Object ",
          description: "A new object has been successfully created.",
        });
      }
      // Lấy Url hiện tại và trả về /user hoặc news hoặc khác 
      const currentPage = getCurrentPage();
      navigate(`/${currentPage}`);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Operation failed due to CORS issue or network error.",
      });
      navigate("/");
    }
  };

  return saveApi;
};

export default useSaveBase;
