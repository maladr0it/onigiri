export const getWeekdays = (now: number) => {
  const current = new Date(now);
  current.setUTCHours(0, 0, 0, 0);
  current.setUTCDate(current.getUTCDate() - current.getUTCDay() + 1);

  let week: number[] = [];
  for (let i = 0; i < 5; i++) {
    week.push(new Date(current).valueOf());
    current.setUTCDate(current.getUTCDate() + 1);
  }
  return week;
};
