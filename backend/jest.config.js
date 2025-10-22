export default {
  testEnvironment: 'node',
  transform: {
    '^.+\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@paralleldrive/cuid2|supertest|formidable|superagent)/)',
  ],
  testMatch: ['**/tests/**/*.test.js'],
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text'],
};