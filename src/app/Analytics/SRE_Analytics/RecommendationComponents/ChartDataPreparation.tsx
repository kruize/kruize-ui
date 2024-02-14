export function filterDataByTerm(data, givenDay, term) {
  let numDays;

  if (term === 'short_term') {
    numDays = 1;
  } else if (term === 'medium_term') {
    numDays = 7;
  } else if (term === 'long_term') {
    numDays = 15;
  } else {
    throw new Error("Invalid term. Use 'short_term', 'medium_term', or 'long_term'.");
  }

  return filterLastNDayData(data, givenDay, numDays);
}

export function formatTimestamps(timestampsData) {
  const formattedData = {};

  for (const timestamp in timestampsData) {
    const parts = timestamp.split('T');
    const date = parts[0];
    const time = parts[1].slice(0, 5);
    formattedData[`${date} ${time}`] = timestampsData[timestamp];
  }

  return formattedData;
}

export function formatNumber(input) {
  if (typeof input === 'number') {
    return parseFloat(input.toFixed(3)); // Format the number to 3 decimal places and convert to number
  } else if (!isNaN(input)) {
    return parseFloat(Number(input).toFixed(3)); // Format the number to 3 decimal places and convert to number
  }
  return input;
}
export function addPlusSign(str) {
  const number = parseFloat(str); // Try to convert the string to a number

  if (!isNaN(number) && isFinite(number)) {
    if (number >= 0) {
      return `+${number}`;
    }
  }

  return str; // Return the original string if it's not a non-negative number
}

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
