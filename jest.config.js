module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/**/*.vue', './src/**/**/*.ts'],
  coverageReporters: ['lcov'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
};
