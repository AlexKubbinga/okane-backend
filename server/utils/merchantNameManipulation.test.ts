import { standardizeName } from './merchantNameManipulation';

describe('Classifying Merchants, Subscriptions and Categories Tests', () => {
  test('Merchant name should be transformed into standard name', () => {
    expect(standardizeName('Bt Broadband')).toBe('BT');
    expect(standardizeName('BT')).toBe('BT');
    expect(standardizeName('Tfl Rail')).toBe('TFL');
    expect(standardizeName('Pret')).toBe('Pret');
  });
});
