/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        babelConfig: false,
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  transformIgnorePatterns: [`/node_modules/*`],
  testPathIgnorePatterns:[ 'dist', 'starship' ],
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
