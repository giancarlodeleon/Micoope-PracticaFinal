import { createContext, useContext, useState, useEffect} from "react";
import {
  getUsersRequest,
  deleteUserRequest,
  getUserRequest,
  updateUserRequest,
} from "../api/user";

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be usted within a UserProvider");
  }
  return context;
};

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);

  const getUsers = async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await deleteUserRequest(id);
      if (res.status == 204)
        setUsers(users.filter((users) => users._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getUser = async (id) => {
    try {
      const res = await getUserRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (id, user) => {
    try {
      await updateUserRequest(id, user);
    } catch (error) {
      console.error(error);
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
        deleteUser,
        getUser,
        updateUser,
        errors
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
