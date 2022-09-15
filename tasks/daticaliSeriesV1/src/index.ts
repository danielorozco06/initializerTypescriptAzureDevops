import { setResult, TaskResult } from 'azure-pipelines-task-lib/task';

export async function run(): Promise<void> {
  try {
    console.log('Hello world');
  } catch (error) {
    setResult(TaskResult.Failed, error);
  }
}
run();
