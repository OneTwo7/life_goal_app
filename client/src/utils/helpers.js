const l0 = (num) => (
  num < 10 ? '0' + num : num
);

export const formatTime = (time) => {
  if (isNaN(time) || time < 0) {
    return '00:00';
  }
  const minutes = Math.floor(time/1000/60%60);
  const hours = Math.floor(time/1000/60/60);
  return l0(hours) + ':' + l0(minutes);
};

export const getWasted = (time, totals) => {
  const date = time.getDate();
  const hours = time.getHours();
  const dailyWorkingMinutes = 16 * 60;

  let workingDays = date - Math.floor(date / 7) - 1;

  if (date % 7 > time.getDay()) {
    workingDays--;
  }

  let wastedTime = workingDays * dailyWorkingMinutes;

  if (hours > 6) {
    if (hours !== 23) {
      wastedTime += ((hours - 7) * 60 + time.getMinutes());
    } else {
      wastedTime += dailyWorkingMinutes;
    }
  }

  for (let key in totals) {
    wastedTime -= Math.floor(totals[key]/1000/60);
  }

  return wastedTime < 0 ? 0 : wastedTime * 60000;
};

export const getTotals = (records, time, timers) => {
  const totals = {};

  if (records.length > 0) {
    const month = time.getMonth();
    const numOfTimers = timers.length;
    let timerId;
    let monthRecords = [];

    const filterRecords = (record => (
      record.timer === timerId && record.month === month
    ));

    for (let i = 0; i < numOfTimers; i++) {
      timerId = timers[i]._id;
      totals[timerId] = 0;
      monthRecords = records.filter(filterRecords);
      if (monthRecords.length) {
        totals[timerId] = monthRecords.map(record => record.duration)
        .reduce((total, current) => total + current);
      }
    }
  }

  return totals;
};
