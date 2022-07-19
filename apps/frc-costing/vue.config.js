const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.COST_APP_PUBLIC_PATH ?? "/",
});
