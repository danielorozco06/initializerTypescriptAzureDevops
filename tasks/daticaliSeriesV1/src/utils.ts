import { getProject, getWebApi } from 'azure-devops-task-utils';
import { WebApi } from 'azure-devops-node-api';
import { BuildApi } from 'azure-devops-node-api/BuildApi';
import { Build } from 'azure-devops-node-api/interfaces/BuildInterfaces';
import { GitApi } from 'azure-devops-node-api/GitApi';
import {
  GitCommitChanges,
  GitPush,
  GitPushSearchCriteria
} from 'azure-devops-node-api/interfaces/GitInterfaces';

/**
 * It gets the definition of a build
 * @param {string} buildId - The ID of the build definition to get.
 * @returns Build
 */
export async function getDefinition(buildId: string): Promise<Build> {
  try {
    const project: string = getProject();
    const web: WebApi = getWebApi();
    const api: BuildApi = await web.getBuildApi();
    return await api.getBuild(project, Number(buildId));
  } catch (error) {
    console.error('Error on getDefinition');
    throw error;
  }
}

export async function getPushesId(repositoryId: string, sourceBranch: string): Promise<number[]> {
  try {
    const web: WebApi = getWebApi();
    const api: GitApi = await web.getGitApi();

    const searchCriteria: GitPushSearchCriteria = {
      refName: sourceBranch
    };

    const pushes: GitPush[] = await api.getPushes(
      repositoryId,
      undefined,
      undefined,
      undefined,
      searchCriteria
    );

    const pushedId = pushes.map(push => push.pushId);
    pushedId.pop();

    return pushedId;
  } catch (error) {
    console.error('Error on getPushesOnRepository()');
    throw error;
  }
}

export async function getPushCommitsId(repositoryId: string, pushId: number): Promise<string[]> {
  try {
    const web: WebApi = getWebApi();
    const api: GitApi = await web.getGitApi();
    const commits = await api.getPushCommits(repositoryId, pushId);
    return commits.map(commit => commit.commitId);
  } catch (error) {
    console.error('Error on getPushInfo()');
    throw error;
  }
}

export async function getCommitChanges(
  commitId: string,
  repositoryId: string
): Promise<GitCommitChanges> {
  try {
    const web: WebApi = getWebApi();
    const api: GitApi = await web.getGitApi();
    return await api.getChanges(commitId, repositoryId);
  } catch (error) {
    console.error('Error on getPushInfo()');
    throw error;
  }
}
