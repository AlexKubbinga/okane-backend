// import { sub } from 'date-fns';

const firstOfLastMonth = () => {
  const today = new Date();
  console.log(today);
  const firstDay = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0)
  );
  console.log(firstDay);
};

firstOfLastMonth();
