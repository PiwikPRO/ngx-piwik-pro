import { readFileSync, writeFileSync } from "node:fs";

const version = process.argv[2];
const examplePackagePath = "projects/piwik-pro-angular-demo/package.json";
const exampleTsconfigPath = "projects/piwik-pro-angular-demo/tsconfig.json";

const profiles = {
  18: {
    dependencies: {
      "@angular/animations": "^18.2.14",
      "@angular/cdk": "^18.2.14",
      "@angular/common": "^18.2.14",
      "@angular/compiler": "^18.2.14",
      "@angular/core": "^18.2.14",
      "@angular/forms": "^18.2.14",
      "@angular/material": "^18.2.14",
      "@angular/platform-browser": "^18.2.14",
      "@angular/platform-browser-dynamic": "^18.2.14",
      "@angular/router": "^18.2.14",
      "zone.js": "^0.14.10",
    },
    devDependencies: {
      "@angular-devkit/build-angular": "^18.2.21",
      "@angular/cli": "^18.2.21",
      "@angular/compiler-cli": "^18.2.14",
      "typescript": "^5.5.4",
    },
    moduleResolution: "node",
  },
  21: {
    dependencies: {
      "@angular/animations": "^21.2.17",
      "@angular/cdk": "^21.2.14",
      "@angular/common": "^21.2.17",
      "@angular/compiler": "^21.2.17",
      "@angular/core": "^21.2.17",
      "@angular/forms": "^21.2.17",
      "@angular/material": "^21.2.14",
      "@angular/platform-browser": "^21.2.17",
      "@angular/platform-browser-dynamic": "^21.2.17",
      "@angular/router": "^21.2.17",
      "zone.js": "^0.15.0",
    },
    devDependencies: {
      "@angular-devkit/build-angular": "^21.2.18",
      "@angular/cli": "^21.2.18",
      "@angular/compiler-cli": "^21.2.17",
      "typescript": "^5.9.3",
    },
    moduleResolution: "bundler",
  },
};

if (!profiles[version]) {
  console.error(`Unsupported Angular version "${version}". Use 18 or 21.`);
  process.exit(1);
}

const profile = profiles[version];
const packageJson = JSON.parse(readFileSync(examplePackagePath, "utf-8"));

packageJson.dependencies = {
  "@piwikpro/ngx-piwik-pro": "file:../../dist/ngx-piwik-pro",
  ...packageJson.dependencies,
  ...profile.dependencies,
};

packageJson.devDependencies = {
  ...packageJson.devDependencies,
  ...profile.devDependencies,
};

writeFileSync(examplePackagePath, `${JSON.stringify(packageJson, null, 2)}\n`);

const tsconfig = readFileSync(exampleTsconfigPath, "utf-8");
writeFileSync(
  exampleTsconfigPath,
  tsconfig.replace(
    /"moduleResolution": "(?:node|bundler)"/,
    `"moduleResolution": "${profile.moduleResolution}"`
  )
);

console.log(`Configured example project for Angular ${version}.`);
