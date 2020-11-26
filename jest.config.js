const {defaults} = require('jest-config');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  moduleNameMapper:{
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  }
};
