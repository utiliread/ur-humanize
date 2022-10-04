const tsconfig = require("./tsconfig.json");

module.exports = function (config) {
  config.set({
    frameworks: ["mocha", "chai", "karma-typescript"],
    files: ["src/**/*.ts"],
    preprocessors: {
      "src/**/*.ts": ["karma-typescript"],
    },
    reporters: ["progress", "karma-typescript"],
    browsers: ["ChromeHeadless", "ChromeDebugging", "Chrome"],
    customLaunchers: {
      ChromeDebugging: {
        base: "Chrome",
        flags: ["--remote-debugging-port=9222"],
      },
    },
    karmaTypescriptConfig: {
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/,
        sourceMap: tsconfig.compilerOptions.sourceMap,
        acornOptions: {
          ecmaVersion: "latest",
        },
        transforms: [require("karma-typescript-es6-transform")()],
      },
      coverageOptions: {
        instrumentation: false,
      },
      tsconfig: "./tsconfig.cjs.json",
    },
  });
};
