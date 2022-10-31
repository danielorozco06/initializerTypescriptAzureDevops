import { setResult, TaskResult } from 'azure-pipelines-task-lib';
import { getDataVSTS } from './inputs';
import { IdataVSTS } from './Interfaces';
import { getCommitChanges, getDefinition, getPushCommitsId, getPushesId } from './utils';
import { validateHotfix } from './validations';

export async function run(): Promise<void> {
  try {
    // Get data from Azure DevOps
    const dataVSTS: IdataVSTS = getDataVSTS();
    const build = await getDefinition(dataVSTS.BUILD_BUILDID);
    const pushesId = await getPushesId(dataVSTS.REPOSITORY_ID, dataVSTS.SOURCEBRANCH);
    const pushesCommitsId = await Promise.all(
      pushesId.map(pushId => getPushCommitsId(dataVSTS.REPOSITORY_ID, pushId))
    );
    const pushesCommitsIdFlat = pushesCommitsId.reduce((a, b) => a.concat(b), []);
    const commitChanges = await Promise.all(
      pushesCommitsIdFlat.map(commitId => getCommitChanges(commitId, dataVSTS.REPOSITORY_ID))
    );

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
