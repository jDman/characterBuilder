import { isNonNull } from './isNonNull';

describe('isNonNull', () => {
  it('should checks with value is not null and returns true if has a value', () => {
    const valueToCheck = 'some value';
    const nonNullCheck = isNonNull(valueToCheck);

    expect(nonNullCheck).toBe(true);
  });

  it('should checks with value is not null and returns false if is null', () => {
    const valueToCheck = null;
    const nonNullCheck = isNonNull(valueToCheck);

    expect(nonNullCheck).toBe(false);
  });
});
