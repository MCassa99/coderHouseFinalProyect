import React, { createContext, useContext, useState, useEffect } from "react";
import { login, register } from "../../services/authService";

// Create the context
const UserContext = createContext();

// Create a custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);

// Create the provider component
export const UserProvider = ({ children }) => {
     const [user, setUser] = useState({});
     const [loggedIn, setLoggedIn] = useState(false);

     useEffect(() => {
          try {
               fetch("http://localhost:3000/api/session/current",
                    {
                         method: "GET",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         credentials: "include",
                    }
               )
               .then((res) => res.json())
                    .then((data) => {
                         if (data.status === 200) {
                              setUser(data.user);
                              setLoggedIn(true);
                         } else {
                              setUser(null);
                              setLoggedIn(false);
                         }
                    });
               
          } catch (error) {
               console.error("Failed to fetch user:", error);
          }
     }, []);

     const handleLogin = async (email, password) => {
          try {
               const data = await login(email, password);
               if (data.status === 200) {
                    setUser(data.user);
                    setLoggedIn(true);
                    return data.user;
               } else {
                    return { status: data.status, message: data.message };
               }
          } catch (error) {
               console.error(error);
               return { status: 500, message: "An error occurred" };
          }
     };

     const handleSignUp = async (userData) => {
          try {
               const data = await register(userData);
               if (data.status === 201) {
                    return data;
               } else {
                    return { status: data.status, message: data.message };
               }
          } catch (error) {
               console.error(error);
               return { status: 500, message: "An error occurred" };
          }
     };

     const logoutUser = async () => {
          try {
               await fetch("http://localhost:3000/api/session/logout", {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    credentials: "include",
               });
               setUser(null);
               setLoggedIn(false);
          } catch (error) {
               console.error("Failed to logout:", error);
          }
     };

     const updateUser = async (userId, userData) => {
          try {
               const response = await fetch(
                    `http://localhost:3000/api/users/${userId}`,
                    {
                         method: "PUT",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify(userData),
                    }
               );
               return await response.json();
          } catch (error) {
               console.error("Failed to update user:", error);
               return { status: 500, message: "An error occurred" };
          }
     };

     const changePassword = async (email) => {
          try {
               const response = await fetch(
                    "http://localhost:3000/api/session/changePassword",
                    {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({ email }),
                    }
               );
               return await response.json();
          } catch (error) {
               console.error("Failed to change password:", error);
               return { status: 500, message: "An error occurred" };
          }
     };

     const uploadDocument = async (file, userId) => {
          const formData = new FormData();
          formData.append(
               "document",
               file,
               `${user.first_name}_${user.last_name}_ID_${file.name}`
          );

          try {
               const response = await fetch(
                    "http://localhost:3000/upload/documents",
                    {
                         method: "POST",
                         body: formData,
                    }
               );
               return await response.json();
          } catch (error) {
               console.error("Failed to upload document:", error);
               return { status: 500, message: "An error occurred" };
          }
     };

     return (
          <UserContext.Provider
               value={{
                    user,
                    loggedIn,
                    handleLogin,
                    handleSignUp,
                    logoutUser,
                    updateUser,
                    changePassword,
                    uploadDocument,
               }}
          >
               {children}
          </UserContext.Provider>
     );
};
