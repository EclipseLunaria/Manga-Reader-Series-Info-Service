import { execSync } from "child_process";
import fs from "fs";
import path, { join } from "path";

const dependencyDirectories = ["src/routes/shared"];

const installDependencies = (dir: string) => {
  console.log(`installing dependencies for ${dir}`);
  execSync("npm install", { stdio: "inherit", cwd: dir });
};

// install root dependencies
execSync("npm install", { stdio: "inherit" });

//install dependencies for services
for (const dir of dependencyDirectories) {
  const fullDependencyDirectory = join(__dirname, dir);
  if (fs.lstatSync(fullDependencyDirectory).isDirectory()) {
    console.log(`installing dependency for ${fullDependencyDirectory}`);
    installDependencies(fullDependencyDirectory);
    console.log("finished installing dependency");
  }
}
