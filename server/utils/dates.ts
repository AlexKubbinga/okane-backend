export const firstOfXMonthsAgo = (x: number) => {
  const today = new Date();
  let date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  var firstDay = new Date(Date.UTC(y, m - x, 1));
  // var lastDay = new Date(Date.UTC(y, m + 1, 1));
  return firstDay;
};