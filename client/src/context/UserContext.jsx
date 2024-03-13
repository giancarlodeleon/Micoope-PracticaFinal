import { createContext, useContext, useState } from "react";
import {
  getUsersRequest,

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

  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,

      }}
    >
      {children}
    </UserContext.Provider>
  );
}
