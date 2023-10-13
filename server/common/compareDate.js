export const compareDate = (dateStart, dateEnd) => {
    const date1 = new Date(dateStart);
    const date2 = new Date(dateEnd);
    if (date1.getFullYear() > date2.getFullYear()) return 1;
    if (date1.getFullYear() < date2.getFullYear()) return -1;
    if (date1.getMonth() > date2.getMonth()) return 1;
    if (date1.getMonth() < date2.getMonth()) return -1;
    if (date1.getDate() > date2.getDate()) return 1;
    if (date1.getDate() < date2.getDate()) return -1;
    return 0;
  };