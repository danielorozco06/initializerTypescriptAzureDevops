import { getDataVSTS } from '../src/inputs';
import { IdataVSTS } from '../src/Interfaces';
import * as tasks from 'azure-pipelines-task-lib/task';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('getDataVSTS()', () => {
  it('Throw an error on JSON.parse', async () => {
    jest.spyOn(tasks, 'getVariable').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(() => getDataVSTS()).toThrow();
  });

  it('Successful', async () => {
    jest.spyOn(tasks, 'getVariable').mockImplementationOnce(() => undefined); // SOURCE_BRANCH_NAME
    jest.spyOn(tasks, 'getVariable').mockImplementationOnce(() => undefined); // systemDefaultWorkingDirectory
    jest.spyOn(tasks, 'getVariable').mockImplementationOnce(() => '{"app":"XXX"}'); // DATARTC

    const outputs = {
      SOURCE_BRANCH_NAME: undefined,
      systemDefaultWorkingDirectory: undefined,
      DATARTC: {
        app: 'XXX'
      }
    } as IdataVSTS;

    expect(getDataVSTS()).toStrictEqual(outputs);
  });
});
