import {
  filterLastNNDayData,
  addPlusSign,
  formatNumber,
  formatTimestamps,
  filterDataByTerm
} from '../ChartDataPreparation';
import * as filterDataModule from '../FilterData';

describe('filterLastNNDayData', () => {
  it('should filter data within the last 1 day and exclude the given time', () => {
    const data = {
      '2023-10-26T010:00:00.000Z': 'Data 1',
      '2023-10-27T08:45:00.000Z': 'Data 2',
      '2023-10-27T10:00:00.000Z': 'Data 3',
      '2023-10-28T11:30:00.000Z': 'Data 4'
    };
    const givenDay = '2023-10-27T10:00:00.000Z';
    const numDays = 1;

    const result = filterLastNNDayData(data, givenDay, numDays);
    console.log(result);
    // Expect data for the last 1 day, excluding the given time
    expect(result).toEqual({
      '2023-10-27T08:45:00.000Z': 'Data 2'
    });
  });

  it('should filter data within the last 7 days and exclude the given time', () => {
    const data = {
      '2023-10-21T15:00:00.000Z': 'Data 1',
      '2023-10-22T08:30:00.000Z': 'Data 2',
      '2023-10-22T10:00:00.000Z': 'Data 3',
      '2023-10-24T12:45:00.000Z': 'Data 4',
      '2023-10-28T14:00:00.000Z': 'Data 5'
    };
    const givenDay = '2023-10-24T12:45:00.000Z';
    const numDays = 7;

    const result = filterLastNNDayData(data, givenDay, numDays);

    // Expect data for the last 7 days, excluding the given time
    expect(result).toEqual({
      '2023-10-21T15:00:00.000Z': 'Data 1',
      '2023-10-22T08:30:00.000Z': 'Data 2',
      '2023-10-22T10:00:00.000Z': 'Data 3'
    });
  });
  it('should filter data within the last 15 days and exclude the given time', () => {
    const data = {
      '2023-10-10T10:00:00.000Z': 'Data 1',
      '2023-10-15T15:00:00.000Z': 'Data 2',
      '2023-10-20T08:30:00.000Z': 'Data 3',
      '2023-10-25T12:45:00.000Z': 'Data 4',
      '2023-10-26T09:30:00.000Z': 'Data 5'
    };
    const givenDay = '2023-10-20T08:30:00.000Z'; // A date within the data
    const numDays = 15;

    const result = filterLastNNDayData(data, givenDay, numDays);

    // Expect data for the last 15 days, excluding the given time
    expect(result).toEqual({
      '2023-10-10T10:00:00.000Z': 'Data 1',
      '2023-10-15T15:00:00.000Z': 'Data 2'
    });
  });
  const data = {
    '2023-10-29T08:00:00.000Z': 'Data1',
    '2023-10-29T12:00:00.000Z': 'Data2',
    '2023-10-30T08:00:00.000Z': 'Data3',
    '2023-10-31T08:00:00.000Z': ' Data4',
    '2023-11-01T08:00:00.000Z': 'Data5'
  };

  it('should return an empty object if numDays is 0', () => {
    const givenDay = '2023-10-31T08:00:00.000Z';
    const numDays = 0;
    const filtered = filterLastNNDayData(data, givenDay, numDays);

    expect(Object.keys(filtered)).toHaveLength(0);
  });

  it('should return an empty object if givenDay is not in the data', () => {
    const givenDay = '2023-11-02T08:00:00.000Z';
    const numDays = 2;
    const filtered = filterLastNNDayData(data, givenDay, numDays);

    expect(Object.keys(filtered)).toHaveLength(0);
  });

  it('should handle the case when the data object is empty', () => {
    const givenDay = '2023-10-31T08:00:00.000Z';
    const numDays = 2;
    const filtered = filterLastNNDayData({}, givenDay, numDays);

    expect(Object.keys(filtered)).toHaveLength(0);
  });
});

describe('addPlusSign', () => {
  it('should add a plus sign to a positive number', () => {
    expect(addPlusSign('5')).toBe('+5');
  });

  it('should add a plus sign to zero', () => {
    expect(addPlusSign('0')).toBe('+0');
  });

  it('should return the original string for a negative number', () => {
    expect(addPlusSign('-5')).toBe('-5');
  });

  it('should return the original string for a non-numeric string', () => {
    expect(addPlusSign('abc')).toBe('abc');
  });

  it('should return the original string for an empty string', () => {
    expect(addPlusSign('')).toBe('');
  });
});

describe('formatNumber', () => {
  it('should format a number to 3 decimal places', () => {
    expect(formatNumber(5.6789)).toBe(5.679);
  });

  it('should format zero to 3 decimal places', () => {
    expect(formatNumber(0)).toBe(0);
  });

  it('should return the original number if it already has 3 decimal places', () => {
    expect(formatNumber(10.123)).toBe(10.123);
  });

  it('should format a string number to 3 decimal places', () => {
    expect(formatNumber('7.456')).toBe(7.456);
  });

  it('should return the original string if it is not a valid number', () => {
    expect(formatNumber('abc')).toBe('abc');
  });

  it('should return the original value for other types', () => {
    // expect(formatNumber(null)).toBe(0);
    expect(formatNumber(undefined)).toBe(undefined);
  });
});

describe('formatTimestamps', () => {
  it('should format timestamps as expected', () => {
    const timestampsData = {
      '2023-10-26T11:30:00.000Z': 'Data 1',
      '2023-10-27T08:45:00.000Z': 'Data 2',
      '2023-10-27T10:00:00.000Z': 'Data 3',
      '2023-10-28T11:30:00.000Z': 'Data 4'
    };

    const formattedData = formatTimestamps(timestampsData);

    expect(formattedData).toEqual({
      '2023-10-26 11:30': 'Data 1',
      '2023-10-27 08:45': 'Data 2',
      '2023-10-27 10:00': 'Data 3',
      '2023-10-28 11:30': 'Data 4'
    });
  });

  it('should handle an empty input object', () => {
    const timestampsData = {};
    const formattedData = formatTimestamps(timestampsData);

    expect(formattedData).toEqual({});
  });
});

jest.mock('../FilterData.tsx', () => ({
  filterLastNDayData: jest.fn()
}));

describe('filterDataByTerm', () => {
  const data = {
    '2023-10-10T10:00:00.000Z': 'Data 1',
    '2023-10-15T15:00:00.000Z': 'Data 2',
    '2023-10-20T08:30:00.000Z': 'Data 3'
  };

  const givenDay = '2023-10-20T10:00:00.000Z';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call filterLastNDayData with the correct arguments for short-term', () => {
    const term = 'short_term';
    filterDataByTerm(data, givenDay, term);
    expect(filterDataModule.filterLastNDayData).toHaveBeenCalledWith(data, givenDay, 1);
  });

  it('should call filterLastNDayData with the correct arguments for medium-term', () => {
    const term = 'medium_term';
    filterDataByTerm(data, givenDay, term);
    expect(filterDataModule.filterLastNDayData).toHaveBeenCalledWith(data, givenDay, 7);
  });

  it('should call filterLastNDayData with the correct arguments for long-term', () => {
    const term = 'long_term';
    filterDataByTerm(data, givenDay, term);
    expect(filterDataModule.filterLastNDayData).toHaveBeenCalledWith(data, givenDay, 15);
  });

  it('should throw an error for an invalid term', () => {
    const term = 'invalid_term';
    expect(() => filterDataByTerm(data, givenDay, term)).toThrowError(
      "Invalid term. Use 'short_term', 'medium_term', or 'long_term'."
    );
    expect(filterDataModule.filterLastNDayData).not.toHaveBeenCalled();
  });
});
