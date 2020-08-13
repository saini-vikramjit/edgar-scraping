module.export = {
  roots: ['<rootDir>/src'],
  transform: {
    '\\.(js|jsx)?$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/**/>(*.)test.{js, jsx}'],
  moduleFileExtensions: ['js', 'jsx'],
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '@testing-library/react/cleanup-after-each',
  ],
};
