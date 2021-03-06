export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const convertToDateFormat = (date) => {
  const newDate = new Date(date);
  return `${newDate.getDate()} ${
    monthNames[newDate.getMonth()]
  } ${newDate.getFullYear()}`;
};

export const getWeekStartDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getDate() - newDate.getDay() + 1} ${
    monthNames[newDate.getMonth()]
  } ${newDate.getFullYear()}`;
};

export const getMonthStartDate = (date) => {
  const newDate = new Date(date);
  return `01 ${monthNames[newDate.getMonth()]} ${newDate.getFullYear()}`;
};

export const toCapitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getLastMonthDates = () => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
  return [firstDay, lastDay];
};
