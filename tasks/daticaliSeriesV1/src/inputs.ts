import { getVariable } from 'azure-pipelines-task-lib';
import { IdataVSTS } from './Interfaces';

export function getDataVSTS(): IdataVSTS {
  try {
    const inputs: IdataVSTS = {
      SOURCE_BRANCH_NAME: getVariable('Build.SourceBranchName'),
      systemDefaultWorkingDirectory: getVariable('SYSTEM_DEFAULTWORKINGDIRECTORY'),
      DATARTC: JSON.parse(getVariable('GetdataRTC.DATARTC'))
    };
    const spaces = 4;
    console.log(`dataVSTS: ${JSON.stringify(inputs, null, spaces)}`);
    return inputs;
  } catch (error) {
    console.log('Error on getDataVSTS()');
    throw Error(error);
  }
}
