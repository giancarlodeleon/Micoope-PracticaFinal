import { createContext, useContext, useState } from "react";
import {
  getUsersRequest,
  deleteUserRequest


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



  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
        deleteUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
