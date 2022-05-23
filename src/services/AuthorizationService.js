import { Subject } from "rxjs";

export const loginSubject = new Subject();

export const getUsername = () => {
  return localStorage.getItem("username");
};

export const getRole = ()=>{
  return localStorage.getItem("role");
}

export const isLogin = () => {
  return localStorage.getItem("username") ? true : false;
};

export const login = (response, password) => {
  localStorage.setItem("username", response.username);
  localStorage.setItem("password", password);
  localStorage.setItem("role", response.appUserRole);
  localStorage.setItem("email", response.email);
  loginSubject.next();
};

export const logout = () => {
  clearLoginData();
};

const clearLoginData = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("password");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
};
