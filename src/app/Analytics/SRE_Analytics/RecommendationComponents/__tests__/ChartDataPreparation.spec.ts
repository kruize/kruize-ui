import { addPlusSign, formatNumber, formatTimestamps, filterDataByTerm } from '../ChartDataPreparation';

describe('filterDataByTerm', () => {
  const data = {
    '2023-10-01T08:00:00.000Z': 'Data 1',
    '2023-10-02T10:30:00.000Z': 'Data 2',
    '2023-10-03T12:45:00.000Z': 'Data 3',
    '2023-10-04T14:15:00.000Z': 'Data 4',
    '2023-10-05T09:30:00.000Z': 'Data 5',
    '2023-10-06T11:00:00.000Z': 'Data 6',
    '2023-10-07T13:20:00.000Z': 'Data 7',
    '2023-10-08T15:45:00.000Z': 'Data 8',
    '2023-10-09T08:30:00.000Z': 'Data 9',
    '2023-10-10T10:00:00.000Z': 'Data 10',
    '2023-10-11T12:15:00.000Z': 'Data 11',
    '2023-10-12T14:30:00.000Z': 'Data 12',
    '2023-10-13T09:45:00.000Z': 'Data 13',
    '2023-10-14T11:30:00.000Z': 'Data 14',
    '2023-10-15T13:00:00.000Z': 'Data 15'
  };

  const givenDay = '2023-10-15T11:00:00.000Z';

  it('should filter data for short-term correctly', () => {
    const term = 'short_term';
    const result = filterDataByTerm(data, givenDay, term);

    expect(result).toEqual({
      '2023-10-14T11:30:00.000Z': 'Data 14'
    });
  });

  it('should filter data for medium-term correctly', () => {
    const term = 'medium_term';
    const result = filterDataByTerm(data, givenDay, term);

    expect(result).toEqual({
      '2023-10-08T15:45:00.000Z': 'Data 8',
      '2023-10-09T08:30:00.000Z': 'Data 9',
      '2023-10-10T10:00:00.000Z': 'Data 10',
      '2023-10-11T12:15:00.000Z': 'Data 11',
      '2023-10-12T14:30:00.000Z': 'Data 12',
      '2023-10-13T09:45:00.000Z': 'Data 13',
      '2023-10-14T11:30:00.000Z': 'Data 14'
    });
  });

  it('should filter data for long-term correctly', () => {
    const term = 'long_term';
    const result = filterDataByTerm(data, givenDay, term);

    expect(result).toEqual({
      '2023-10-01T08:00:00.000Z': 'Data 1',
      '2023-10-02T10:30:00.000Z': 'Data 2',
      '2023-10-03T12:45:00.000Z': 'Data 3',
      '2023-10-04T14:15:00.000Z': 'Data 4',
      '2023-10-05T09:30:00.000Z': 'Data 5',
      '2023-10-06T11:00:00.000Z': 'Data 6',
      '2023-10-07T13:20:00.000Z': 'Data 7',
      '2023-10-08T15:45:00.000Z': 'Data 8',
      '2023-10-09T08:30:00.000Z': 'Data 9',
      '2023-10-10T10:00:00.000Z': 'Data 10',
      '2023-10-11T12:15:00.000Z': 'Data 11',
      '2023-10-12T14:30:00.000Z': 'Data 12',
      '2023-10-13T09:45:00.000Z': 'Data 13',
      '2023-10-14T11:30:00.000Z': 'Data 14'
    });
  });

  it('should throw an error for an invalid term', () => {
    const term = 'invalid_term';

    expect(() => filterDataByTerm(data, givenDay, term)).toThrowError(
      "Invalid term. Use 'short_term', 'medium_term', or 'long_term'."
    );
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
