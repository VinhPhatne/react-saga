import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createUserRequest, updateUserRequest } from "../actions/users";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const useSaveBase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveUser = useCallback(
    (mode, user, values) => {
      if (mode === "Edit" && user?.id) {
        dispatch(updateUserRequest({ id: user.id, ...values }));
        console.log("Edited User data:", { id: user?.id, ...values });
        notification.success({
          message: "User Updated",
          description: "The user has been successfully updated.",
        });
        console.log("Edited User data:", { id: user.id, ...values });
      } else {
        dispatch(createUserRequest(values));
        console.log("Created User data:", { values });
        notification.success({
          message: "User Created",
          description: "A new user has been successfully created.",
        });
        console.log("Created User data:", values);
      }
      navigate("/");
    },
    [dispatch, navigate]
  );

  return saveUser;
};

export default useSaveBase;
