import dayjs from "dayjs";

const dateFormatter = (date) => {
  return date ? dayjs(date).format("H:mm:ss \n D.M.YYYY r.") : "Brak";
};

export const dateToIsoString = (date) => {
  return dayjs(date).toISOString();
};

export const dateToReadableDate = (date) => {
  return dayjs(date).format("D-M-YYYY");
};

export default dateFormatter;
