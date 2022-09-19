export function validateHotfix(branch: string): void {
  console.log('\nValidating if hotfix....');
  if (branch === 'hotfix') {
    console.log('Task skipped because was trigger from hotfix branch');
    throw new Error('Skipped');
  }
}
