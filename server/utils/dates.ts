export const firstOfXMonthsAgo = (num_months_ago: number) => {
  // Note: remember months start at 0 in JS dates.
  const today = new Date(2022, 9, 1);
  let date = new Date(2022, 9, 1),
    y = date.getFullYear(),
    m = date.getMonth();
  var firstDay = new Date(Date.UTC(y, m - num_months_ago, 1));
  // var lastDay = new Date(Date.UTC(y, m + 1, 1));
  return firstDay;
};

export const scaleValue = (unscaled_val: string, scale: string) => {
  return Math.round(Number(unscaled_val) * 10 ** -Number(scale) * 100) / 100;
};

export const monthEndDate = (date: string) => {
  const original = new Date(date);
  let y = original.getFullYear();
  let m = original.getMonth();
  const lastDay = new Date(Date.UTC(y, m + 1, 0));
  return lastDay;
};
