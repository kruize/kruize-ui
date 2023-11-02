export function filterLastNDayData(data, givenDay, numDays) {
  const oneDayInMillis = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  const givenDayMillis = Date.parse(givenDay);
  const filteredData = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const timestampMillis = Date.parse(key);
      const isGivenTime =
        new Date(key).getHours() === new Date(givenDay).getHours() &&
        new Date(key).getMinutes() === new Date(givenDay).getMinutes();

      if (
        givenDayMillis - timestampMillis <= oneDayInMillis * numDays &&
        givenDayMillis - timestampMillis >= 0 &&
        !isGivenTime
      ) {
        filteredData[key] = data[key];
      }
    }
  }

  return filteredData;
}
