import instance from "../../auth";
const API_URL = "/auth/";

const login = async (email: string, password: string) => {
  return await instance.post(API_URL + "login", {
    email,
    password,
  });
};

const logout = () => {
  localStorage.removeItem("layout");
  sessionStorage.removeItem("user");
};

export const authService = {
  login,
  logout,
};
