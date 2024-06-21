/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: ['ts-jest','@babel/preset-env'],
  testEnvironment: 'jsdom',
  coverageProvider: 'babel',
  testEnvironmentOptions: {
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": 'babel-jest',
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
};