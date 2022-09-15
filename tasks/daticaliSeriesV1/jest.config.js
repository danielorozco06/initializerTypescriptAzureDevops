// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const path = require('path');
module.exports = {
  rootDir: path.join(__dirname),
  verbose: true,
  moduleFileExtensions: ['js', 'ts', 'json'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  transform: { '^.+\\.ts?$': 'ts-jest' },
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  coverageReporters: ['html', 'json', 'lcov', 'text', 'clover'],
  clearMocks: true,
  reporters: ['default', 'jest-sonar']
};
