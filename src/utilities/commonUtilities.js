import colors from "configuration/colors";

export const translateAppUserRole = (role) => {
  switch (role) {
    case "USER":
      return "Użytkownik";

    case "MANAGEMENT":
      return "Management";

    case "SUPERUSER":
      return "Superuser";

    case "ADMIN":
      return "Administrator";

    default:
      return "Nie rozpoznano rodzaju konta";
  }
};

export const translateProdUserRole = (role) => {
  switch (role) {
    case "QUALITY_CONTROL":
      return "Kontrola jakości";
    case "PRODUCTION":
      return "Produkcja";
    case "MAINTENANCE":
      return "UR";
    default:
      return "Nie rozpoznano";
  }
};

export const translateProductType = (productType) => {
  switch (productType) {
    case "PTS":
      return "PTS";
    case "CANDLE":
      return "Świeczka";
    case "TEALIGHT":
      return "TeaLight";
    default:
      return "Nie rozpoznano";
  }
};

export const translateWorkShifts = (workshift) => {
  switch (workshift) {
    case "FIRST":
      return "I";
    case "SECOND":
      return "II";
    case "THIRD":
      return "III";
    default:
      return "Nie rozpoznano";
  }
};

export const translateBreakdownsStatus = (status) => {
  switch (status) {
    case "NEW":
      return "Oczekiwanie na UR";
    case "IN_PROGRESS":
      return "Usuwanie awarii";
    case "CLOSE":
      return "Zakończona";
    default:
      return "Nie rozpoznano";
  }
};

export const sortArrayByString = (
  array,
  field,
  multiplier,
  setArray,
  toggleMultiplier = () => {}
) => {
  const result = array.sort(
    (x1, x2) => multiplier * x1[field].localeCompare(x2[field])
  );
  setArray(result);
  toggleMultiplier();
};

export const sortArrayByNumber = (
  array,
  field,
  multiplier,
  setArray,
  toggleMultiplier = () => {}
) => {
  const result = array.sort((x1, x2) => multiplier * (x1[field] - x2[field]));
  setArray(result);
  toggleMultiplier();
};

export const sortArrayByBoolean = (
  array,
  field,
  multiplier,
  setArray,
  toggleMultiplier = () => {}
) => {
  const result = array.sort(
    (x1, x2) => multiplier * (x1[field] === x2[field] ? 1 : -1)
  );
  setArray(result);
  toggleMultiplier();
};

export const sortArrayByDate = (
  array,
  field,
  multiplier,
  setArray,
  toggleMultiplier = () => {}
) => {
  const sortedReports = array.sort((x1, x2) => {
    const firstDate = x1[field] ? x1[field] : new Date();
    const secondDate = x2[field] ? x2[field] : new Date();
    return multiplier * (Date.parse(firstDate) - Date.parse(secondDate));
  });
  toggleMultiplier();
  setArray(sortedReports);
};

export const getColorForLineState = (state) => {
  switch (state) {
    case "ACTIVE":
      return colors.success;
    case "DEACTIVATED":
      return colors.secondary;
    case "BREAKDOWN":
      return colors.danger;
    default:
      return colors.white;
  }
};

export const getLineStatus = (state) => {
  switch (state) {
    case "ACTIVE":
      return "Włączona";
    case "DEACTIVATED":
      return "Wyłączona";
    case "BREAKDOWN":
      return "Awaria";
    default:
      return "Nieokreślony";
  }
};

export const getColorByState = (state) => {
  return state ? colors.success : colors.danger;
};

export const getWorkingTime = (workingTime) => {
  switch (workingTime) {
    case "HOURS8":
      return "8 godzin";
    case "HOURS12":
      return "12 godzin";
    default:
      return "Brak danych";
  }
};

export const getDowntimeState = (state) => {
  switch (state) {
    case "OPEN":
      return "Aktywny";
    case "CLOSE":
      return "Zakończony";
    default:
      return "Nie rozpoznano";
  }
};

export const productionTypeArray = [
  {
    value: "PTS",
    display: "PTS",
  },
  {
    value: "TEALIGHT",
    display: "TeaLight",
  },
  {
    value: "CANDLE",
    display: "Świeczka",
  },
];
