import axios from "axios";
export const configureInterceptors = () => {
  axios.interceptors.request.use((config) => {
    if (localStorage.getItem("username")) {
      const authToken =
        "Basic " +
        btoa(
          localStorage.getItem("username") +
            ":" +
            localStorage.getItem("password")
        );
      config.headers.Authorization = authToken;
    }
    return config;
  });
};

export const httpErrorHandler = (error) => {
  if (error.response) {
    let message = "";
    switch (error.response.status) {
      case 400:
        message =
          error.response.data.message === ""
            ? "Niepoprawne zapytanie do serwera"
            : error.response.data.message;
        break;
      case 401:
        message = "Nie poprawnde dane logowania";
        break;
      case 403:
        message = "Masz za niskie uprawnienia";
        break;
      case 404:
        message = error.response.data.message;
        break;
      case 500:
        message = "Błąd systemu. Skontaktuj się z pczech@bispol.pl";
        break;
      default:
        message = "";
    }
    return { content: message, isError: true };
  } else return { content: "Błąd połączenia z serwerem", isError: true };
};

export const getRequest = (
  URL,
  handleReq = {
    thenFun: (data) => {},
    catchFun: (error) => {},
    finallyFun: () => {},
  }
) => {
  axios
    .get(URL)
    .then((response) => {
      handleReq.thenFun(response.data);
    })
    .catch((error) => {
      handleReq.catchFun(error);
    })
    .finally(() => {
      handleReq.finallyFun();
    });
};

export const deleteRequest = (
  URL,
  handleReq = {
    thenFun: (data) => {},
    catchFun: (error) => {},
    finallyFun: () => {},
  }
) => {
  axios
    .delete(URL)
    .then((response) => {
      handleReq.thenFun(response.data);
    })
    .catch((error) => {
      handleReq.catchFun(error);
    })
    .finally(() => {
      handleReq.finallyFun();
    });
};
