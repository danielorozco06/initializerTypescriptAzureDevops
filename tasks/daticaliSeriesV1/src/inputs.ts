import { getVariable } from 'azure-pipelines-task-lib';
import { IdataVSTS } from './Interfaces';

export function getDataVSTS(): IdataVSTS {
  try {
    const inputs: IdataVSTS = {
      SOURCE_BRANCH_NAME: getVariable('BUILD_SOURCEBRANCHNAME'),
      SOURCEBRANCH: getVariable('BUILD_SOURCEBRANCH'),
      systemDefaultWorkingDirectory: getVariable('SYSTEM_DEFAULTWORKINGDIRECTORY'),
      BUILD_BUILDID: getVariable('BUILD_BUILDID'),
      REPOSITORY_ID: getVariable('BUILD_REPOSITORY_ID')
    };
    const spaces = 4;
    console.log(`dataVSTS: ${JSON.stringify(inputs, null, spaces)}`);
    return inputs;
  } catch (error) {
    console.log('Error on getDataVSTS()');
    throw Error(error);
  }
}
