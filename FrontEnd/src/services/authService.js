const API_URL = "http://localhost:3000/api/session";

export const login = (email, password) => {
     return fetch(`${API_URL}/login`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
     }).then((response) => response.json());
};

export const register = (userData) => {
     return fetch(`${API_URL}/register`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
     }).then((response) => response.json());
};

export const changePassword = (email) => {
     return fetch(`${API_URL}/changePassword`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
     }).then((response) => response.json());
};
