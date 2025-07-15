module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)' // Force-transform axios (which is ESM)
  ],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
