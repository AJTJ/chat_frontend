#!/usr/bin/env node

// NOT USED CURRENTLY
// REMEMBER TO SWITCH SCRIPTS IF DECIDING TO USE
process.env.NODE_ENV = "development";

const fs = require("fs-extra");
const paths = require("react-scripts/config/paths");
const webpack = require("webpack");
const config = require("react-scripts/config/webpack.config")("development");

const outputPath = paths.appPath + "/dist";
config.output.path = outputPath;

console.log({ "config.entry": config.entry });

config.entry =
  Array.isArray(config.entry.isArray) &&
  config.entry.filter((f) => !f.match(/webpackHotDevClient/));

config.plugins = config.plugins.filter(
  (p) => !(p instanceof webpack.HotModuleReplacementPlugin)
);

(async () => {
  await fs.emptyDir(outputPath);
  webpack(config).watch({}, (err) => {
    if (err) {
      console.error(err);
    } else {
      fs.copySync(paths.appPublic, outputPath, {
        dereference: true,
        filter: (file) => file !== paths.appHtml,
      });
    }
  });
})();
