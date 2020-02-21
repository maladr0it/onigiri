const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getDayString = (day: number) => DAYS[new Date(day).getUTCDay()];

// get the day without hours and minutes etc
export const getDay = (date: number) => {
  const current = new Date(date);
  current.setUTCHours(0, 0, 0, 0);
  return current.valueOf();
};

export const getWeekdays = (date: number) => {
  const current = new Date(getDay(date));
  current.setUTCDate(current.getUTCDate() - current.getUTCDay() + 1);

  let week: number[] = [];
  for (let i = 0; i < 5; i++) {
    week.push(new Date(current).valueOf());
    current.setUTCDate(current.getUTCDate() + 1);
  }
  return week;
};
