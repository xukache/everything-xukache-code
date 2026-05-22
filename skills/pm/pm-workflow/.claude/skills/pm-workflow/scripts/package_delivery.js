#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const SKILL_ROOT = path.resolve(__dirname, "..");
const TEMPLATE_DIR = path.join(SKILL_ROOT, "templates");

const CORE_DOCS = [
  "project-config.md",
  "prd.md",
  "handoff-prd.md",
  "tech-architecture.md",
  "handoff-architecture.md",
  "ui-design.md",
  "handoff-ui.md",
  "prototype-review.md",
  "dev-tasks.md",
  "workflow-state.json",
];

const DEFAULT_DELIVERY_README = `# 开发交付包

这个目录汇总了产品需求、架构、界面、任务和原型相关产物，供开发阶段接手。

## 缺失项

{{MISSING_SECTION}}
`;

const DEFAULT_DELIVERY_AGENTS = `# {{PRODUCT_NAME}} 开发接手说明

请先阅读本目录中的需求、架构、界面设计、开发任务和原型文件，再开始实现。
`;

function exists(target) {
  return fs.existsSync(target);
}

function ensureDir(target) {
  fs.mkdirSync(target, { recursive: true });
}

function readText(target) {
  return exists(target) ? fs.readFileSync(target, "utf8") : "";
}

function writeText(target, content) {
  ensureDir(path.dirname(target));
  fs.writeFileSync(target, content, "utf8");
}

function ensureSafeOutput(root, outputDir) {
  const rootResolved = path.resolve(root);
  const outputResolved = path.resolve(outputDir);
  const relative = path.relative(rootResolved, outputResolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Refusing to package outside project root: ${outputResolved}`);
  }
}

function copyFileIfExists(src, dest, copied, missing) {
  if (exists(src)) {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
    copied.push(path.basename(dest));
  } else {
    missing.push(path.basename(src));
  }
}

function copyTree(src, dest) {
  if (!exists(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDir(dest);
    for (const name of fs.readdirSync(src)) {
      if (name === "__pycache__" || name === ".DS_Store" || name.endsWith(".pyc")) continue;
      copyTree(path.join(src, name), path.join(dest, name));
    }
  } else {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
  }
}

function templateText(name, fallback) {
  const candidate = path.join(TEMPLATE_DIR, name);
  return exists(candidate) ? readText(candidate) : fallback;
}

function generateReadme(missing) {
  const template = templateText("delivery-README.md", DEFAULT_DELIVERY_README);
  const missingSection = missing.length ? missing.map((item) => `- ${item}`).join("\n") : "无。";
  return template.replaceAll("{{MISSING_SECTION}}", missingSection);
}

function generateDeliveryAgents(root) {
  let productName = path.basename(root);
  const statePath = path.join(root, "docs", "workflow-state.json");
  if (exists(statePath)) {
    try {
      productName = JSON.parse(readText(statePath)).project_name || productName;
    } catch (_error) {
      // Keep the directory name if state is not valid JSON.
    }
  }
  return templateText("AGENTS.md", DEFAULT_DELIVERY_AGENTS).replaceAll("{{PRODUCT_NAME}}", productName);
}

function packageDelivery(rootInput) {
  const root = path.resolve(rootInput);
  const docsDir = path.join(root, "docs");
  const prototypeDir = path.join(root, "prototype");
  const outputDir = path.join(root, "outputs", "dev-package");

  if (!exists(docsDir)) {
    throw new Error("Missing docs/ directory. Run `pmflow init --root .` first.");
  }

  ensureSafeOutput(root, outputDir);
  if (exists(outputDir)) fs.rmSync(outputDir, { recursive: true, force: true });
  ensureDir(outputDir);

  const copied = [];
  const missing = [];
  for (const filename of CORE_DOCS) {
    copyFileIfExists(path.join(docsDir, filename), path.join(outputDir, filename), copied, missing);
  }

  for (const name of fs.readdirSync(docsDir).sort()) {
    if (!/^review-.*\.md$/.test(name)) continue;
    fs.copyFileSync(path.join(docsDir, name), path.join(outputDir, name));
    copied.push(name);
  }

  writeText(path.join(outputDir, "AGENTS.md"), generateDeliveryAgents(root));
  copied.push("AGENTS.md");

  if (exists(prototypeDir) && fs.readdirSync(prototypeDir).length) {
    copyTree(prototypeDir, path.join(outputDir, "prototype"));
    copied.push("prototype/");
  } else {
    missing.push("prototype/");
  }

  writeText(path.join(outputDir, "README.md"), generateReadme(missing));
  copied.push("README.md");

  console.log(`Delivery package generated: ${outputDir}`);
  console.log("Copied:");
  for (const item of copied) console.log(`  + ${item}`);
  if (missing.length) {
    console.log("Missing:");
    for (const item of missing) console.log(`  - ${item}`);
  }
  console.log("Quality completeness is owned by the quality reviewer; this script only packages and reports missing files.");
}

function parseArgs(argv) {
  const options = { root: "." };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--root") {
      options.root = argv[++index];
    } else if (arg.startsWith("--root=")) {
      options.root = arg.slice("--root=".length);
    } else if (arg === "-h" || arg === "--help") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

function printHelp() {
  console.log(`Package PM Workflow deliverables.

Usage:
  node package_delivery.js --root .`);
}

function main() {
  try {
    const args = parseArgs(process.argv.slice(2));
    packageDelivery(args.root);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

main();
