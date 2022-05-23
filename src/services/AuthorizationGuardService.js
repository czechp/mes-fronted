import { getRole, isLogin } from "./AuthorizationService";

export const loginGuard = (to, from, next) => {
  if (to.meta.authorization) {
    if (isLogin()) {
      next();
    }
    next.redirect("/login");
  } else {
    next();
  }
};

export const adminGuard = (to, from, next) => {
  if (to.meta.admin) {
    if (getRole() === "ADMIN") next();
    next.redirect("/forbiden");
  } else next();
};

export const superuserGuard = (to, from, next) => {
  if (to.meta.superuser) {
    const authenticated = (getRole() === "ADMIN") || (getRole() === "SUPERUSER");
    if (authenticated) next();
    next.redirect("/forbiden");
  } else next();
};
