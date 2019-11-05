module.exports = {
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/__tests__/**/*'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
