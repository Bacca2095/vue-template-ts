module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  rootDir: '.',
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/**/*.{ts,vue}', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
};
