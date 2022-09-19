import { validateHotfix } from '../src/validations';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('validateHotfix()', () => {
  test('Branch master', async () => {
    const branch = 'master';
    expect(validateHotfix(branch)).toBe(undefined);
  });

  test('Branch hotfix', async () => {
    const branch = 'hotfix';
    expect(() => validateHotfix(branch)).toThrow('Skipped');
  });
});
