import { run } from '../src/index';
import * as inputs from '../src/inputs';
import { IdataRTC, IdataVSTS } from '../src/Interfaces';
import * as validations from '../src/validations';

jest.mock('azure-pipelines-task-lib/task');

beforeEach(async () => {
  jest.resetAllMocks();
});

describe('index.ts', () => {
  describe('run()', () => {
    it('Error on getDataVSTS()', async () => {
      jest.spyOn(inputs, 'getDataVSTS').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(run()).resolves.toBeUndefined();
    });
    it('It is Hotfix, skip task', async () => {
      const dataRTC = {} as IdataRTC;
      const dataVSTS = {
        DATARTC: dataRTC
      } as IdataVSTS;

      jest.spyOn(inputs, 'getDataVSTS').mockImplementationOnce(() => dataVSTS);
      jest.spyOn(validations, 'validateHotfix').mockImplementationOnce(() => {
        throw new Error('Skipped');
      });

      await expect(run()).resolves.toBe(undefined);
    });
  });
});
