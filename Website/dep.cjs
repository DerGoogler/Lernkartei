const { PackageDependList } = require("package-depend-list");
const { resolve, join } = require("path");
const { writeFileSync } = require("fs");

const pkg = new PackageDependList({
  package: "./package.json",
  node_modules: resolve("./", "node_modules"),
});

writeFileSync(join(__dirname, "src/util/dep.json"), JSON.stringify(pkg.dependencies(false), null, 4));
