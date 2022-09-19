import { setResult, TaskResult } from 'azure-pipelines-task-lib';
import { getDataVSTS } from './inputs';
import { IdataRTC, IdataVSTS } from './Interfaces';
import { validateHotfix } from './validations';

export async function run(): Promise<void> {
  try {
    // Get data from Azure DevOps
    const dataVSTS: IdataVSTS = getDataVSTS();
    const dataRTC: IdataRTC = dataVSTS.DATARTC;

    // Check and skip task
    validateHotfix(dataVSTS.SOURCE_BRANCH_NAME);
  } catch (error) {
    if (error.message === 'Skipped') {
      setResult(TaskResult.Skipped, error);
    } else {
      setResult(TaskResult.Failed, error);
    }
  }
}
run();
