import { run } from '../src/index';

jest.mock('azure-pipelines-task-lib/task');

beforeEach(async () => {
  jest.resetAllMocks();
});

describe('index.ts', () => {
  describe('run()', () => {
    it('Successful', async () => {
      await expect(run()).resolves.toBeUndefined();
    });
  });
});
