module.exports = {
  apps: [
    {
      name: "series-info",
      script: "node_modules/.bin/ts-node",
      args: "./index.ts",
      cwd: "./src",
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"],
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
