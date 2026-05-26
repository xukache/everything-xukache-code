#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");

const PACKAGE_ROOT = path.resolve(__dirname, "..");
const CODEX_MIRROR = path.join(PACKAGE_ROOT, ".codex");
const CLAUDE_MIRROR = path.join(PACKAGE_ROOT, ".claude");
const CODEX_TEMPLATES = path.join(CODEX_MIRROR, "templates");
const CODEX_ROLE_SKILLS = path.join(CODEX_MIRROR, "role-skills");
const CODEX_BUNDLED_SKILLS = path.join(CODEX_MIRROR, "bundled-skills");

const DOC_TEMPLATES = [
  ["project-config.md", "project-config.md"],
  ["demand-analysis/templates/requirement-alignment.md", "requirement-alignment.md"],
  ["demand-analysis/templates/prd.md", "prd.md"],
  ["demand-analysis/templates/handoff-prd.md", "handoff-prd.md"],
  ["tech-architecture/templates/architecture-options.md", "architecture-options.md"],
  ["tech-architecture/templates/tech-architecture.md", "tech-architecture.md"],
  ["tech-architecture/templates/handoff-architecture.md", "handoff-architecture.md"],
  ["ui-prototype-design/templates/design-brief.md", "ui-design-brief.md"],
  ["ui-prototype-design/templates/information-architecture.md", "ui-information-architecture.md"],
  ["ui-prototype-design/templates/design-tokens.md", "ui-design-tokens.md"],
  ["ui-prototype-design/templates/ui-build-tasks.md", "ui-build-tasks.md"],
  ["ui-prototype-design/templates/ui-design.md", "ui-design.md"],
  ["ui-prototype-design/templates/handoff-ui.md", "handoff-ui.md"],
  ["ui-prototype-design/templates/prototype-review.md", "prototype-review.md"],
  ["dev-task-planning/templates/dev-tasks.md", "dev-tasks.md"],
];

function printHelp() {
  console.log(`PM Workflow Studio

Usage:
  pmflow
  pmflow init
  pmflow update
  pmflow init [--ai auto|codex|claude] [--root <dir>] [--name <product name>]
  pmflow update [--ai auto|codex|claude] [--root <dir>] [--name <product name>]
  pm-workflow init [--ai auto|codex|claude] [--root <dir>] [--name <product name>]
  pm-workflow update [--ai auto|codex|claude] [--root <dir>] [--name <product name>]

Options:
  --ai, --cli   AI CLI layout to generate. Defaults to auto.
              auto: choose by target directory, empty dirs default to Codex.
              codex: generate .codex + .agents structure.
              claude: generate .claude structure for Claude Code.
  --root        Target workspace directory. Defaults to current directory.
  --name        Product name for generated templates. Defaults to "My Product".
  --mode        Setup mode: new or update. pmflow update is the same as --mode update.
  --new         Force new-project setup mode.
  --update      Force existing-project update mode.
  -i, --interactive
               Start the interactive setup wizard.
  -h, --help    Show help.

Examples:
  pmflow
  pmflow init
  pmflow update --root .
  pmflow init --ai codex --root ./pm-workflow-demo --name "习惯打卡"
  pmflow init --ai claude --root ./pm-workflow-claude-demo --name "习惯打卡"
  pmflow init --ai auto --name "习惯打卡"

Runtime:
  Requires Node.js only. Python is not required for pmflow init/update.
`);
}

function fail(message) {
  console.error(`pmflow: ${message}`);
  console.error("Run `pmflow --help` for usage.");
  process.exit(1);
}

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const color = {
  cyan: (value) => (useColor ? `\u001b[36m${value}\u001b[0m` : value),
  dim: (value) => (useColor ? `\u001b[2m${value}\u001b[0m` : value),
  green: (value) => (useColor ? `\u001b[32m${value}\u001b[0m` : value),
  bold: (value) => (useColor ? `\u001b[1m${value}\u001b[0m` : value),
};

const symbol = {
  pointer: useColor ? color.cyan("?") : "?",
  done: useColor ? color.green("✔") : "✔",
  arrow: useColor ? color.cyan("›") : "›",
};

function exists(target) {
  return fs.existsSync(target);
}

function isDirectory(target) {
  try {
    return fs.statSync(target).isDirectory();
  } catch (_error) {
    return false;
  }
}

function defaultModeForRoot(root) {
  if (!isDirectory(root)) return "new";
  const visibleEntries = fs.readdirSync(root).filter((name) => ![".DS_Store"].includes(name));
  return visibleEntries.length ? "update" : "new";
}

function ensureDir(target) {
  fs.mkdirSync(target, { recursive: true });
}

function relativeTo(root, target) {
  return path.relative(root, target).split(path.sep).join("/");
}

function normalizeAi(value) {
  const normalized = String(value || "auto").toLowerCase();
  if (normalized === "claude-code") return "claude";
  if (["auto", "codex", "claude"].includes(normalized)) return normalized;
  if (normalized === "kiro") {
    fail("--ai kiro is not supported yet. Use --ai auto, --ai codex, or --ai claude.");
  }
  fail(`unsupported --ai value "${value}". Expected auto, codex, or claude.`);
}

function normalizeMode(value) {
  const normalized = String(value || "new").toLowerCase();
  if (["new", "create", "init"].includes(normalized)) return "new";
  if (["update", "existing", "upgrade"].includes(normalized)) return "update";
  fail(`unsupported --mode value "${value}". Expected new or update.`);
}

function parseInitArgs(argv, commandMode = "new") {
  const options = {
    ai: "auto",
    root: ".",
    name: "My Product",
    mode: commandMode,
    interactive: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "-h" || arg === "--help") {
      printHelp();
      process.exit(0);
    }
    if (arg === "-i" || arg === "--interactive") {
      options.interactive = true;
      continue;
    }
    if (arg === "--new") {
      options.mode = "new";
      continue;
    }
    if (arg === "--update") {
      options.mode = "update";
      continue;
    }
    if (arg === "--mode") {
      const value = argv[index + 1];
      if (!value) fail("--mode requires a value.");
      options.mode = normalizeMode(value);
      index += 1;
      continue;
    }
    if (arg.startsWith("--mode=")) {
      options.mode = normalizeMode(arg.slice("--mode=".length));
      continue;
    }
    if (arg === "--ai" || arg === "--cli") {
      const value = argv[index + 1];
      if (!value) fail(`${arg} requires a value.`);
      options.ai = normalizeAi(value);
      index += 1;
      continue;
    }
    if (arg.startsWith("--ai=")) {
      options.ai = normalizeAi(arg.slice("--ai=".length));
      continue;
    }
    if (arg.startsWith("--cli=")) {
      options.ai = normalizeAi(arg.slice("--cli=".length));
      continue;
    }
    if (arg === "--root") {
      const value = argv[index + 1];
      if (!value) fail("--root requires a value.");
      options.root = value;
      index += 1;
      continue;
    }
    if (arg.startsWith("--root=")) {
      options.root = arg.slice("--root=".length);
      continue;
    }
    if (arg === "--name") {
      const value = argv[index + 1];
      if (!value) fail("--name requires a value.");
      options.name = value;
      index += 1;
      continue;
    }
    if (arg.startsWith("--name=")) {
      options.name = arg.slice("--name=".length);
      continue;
    }
    fail(`unknown argument "${arg}".`);
  }

  return options;
}

function createPrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return {
    input: process.stdin,
    output: process.stdout,
    ask(question) {
      return new Promise((resolve) => {
        rl.question(question, (answer) => resolve(answer.trim()));
      });
    },
    close() {
      rl.close();
    },
  };
}

function printInteractiveHeader() {
  console.log("");
  console.log(color.bold("PM Workflow Studio"));
  console.log(color.dim("Create a new workspace or safely update an existing one."));
  console.log("");
}

function promptLine(label, defaultValue) {
  const suffix = defaultValue ? ` ${color.dim(`(${defaultValue})`)}` : "";
  return `${symbol.pointer} ${label}${suffix} ${symbol.arrow} `;
}

function printAnswer(label, value) {
  console.log(`${symbol.done} ${label}: ${color.green(value)}`);
}

async function askText(prompt, label, defaultValue) {
  const answer = await prompt.ask(promptLine(label, defaultValue));
  const value = answer || defaultValue;
  printAnswer(label, value);
  return value;
}

async function askAi(prompt, defaultValue) {
  const choices = [
    ["1", "auto", "Auto, choose by target directory"],
    ["2", "codex", "Codex, generate .codex + .agents"],
    ["3", "claude", "Claude Code, generate .claude"],
  ];

  if (!prompt.input.isTTY || !prompt.output.isTTY) {
    return defaultValue;
  }

  return new Promise((resolve) => {
    let selected = Math.max(
      0,
      choices.findIndex(([, value]) => value === defaultValue)
    );
    let renderedLines = 0;
    const input = prompt.input;
    const output = prompt.output;
    const wasRaw = input.isRaw;

    const render = () => {
      if (renderedLines > 0) {
        readline.moveCursor(output, 0, -renderedLines);
        readline.clearScreenDown(output);
      }

      const lines = [`${symbol.pointer} Select AI workspace ${color.dim(`(${defaultValue})`)}`];
      for (const [, value, description] of choices) {
        const active = choices[selected][1] === value;
        const marker = value === defaultValue ? color.dim(" (default)") : "";
        const cursor = active ? symbol.arrow : " ";
        const label = active ? color.green(value.padEnd(6)) : value.padEnd(6);
        lines.push(`  ${cursor} ${label} ${color.dim(description)}${marker}`);
      }
      lines.push(color.dim("    Use ↑/↓ to move. Space to select."));

      output.write(`${lines.join("\n")}\n`);
      renderedLines = lines.length;
    };

    const cleanup = (clear) => {
      input.off("keypress", onKeypress);
      if (input.isTTY) input.setRawMode(wasRaw);
      if (clear && renderedLines > 0) {
        readline.moveCursor(output, 0, -renderedLines);
        readline.clearScreenDown(output);
      }
    };

    const finish = () => {
      const value = choices[selected][1];
      cleanup(true);
      printAnswer("AI workspace", value);
      resolve(value);
    };

    const onKeypress = (str, key = {}) => {
      if (key.ctrl && key.name === "c") {
        cleanup(false);
        output.write("\n");
        process.exit(130);
      }
      if (key.name === "up" || key.name === "k") {
        selected = (selected - 1 + choices.length) % choices.length;
        render();
        return;
      }
      if (key.name === "down" || key.name === "j") {
        selected = (selected + 1) % choices.length;
        render();
        return;
      }
      if (key.name === "space" || key.name === "return" || str === " ") {
        finish();
      }
    };

    readline.emitKeypressEvents(input);
    input.on("keypress", onKeypress);
    input.setRawMode(true);
    input.resume();
    render();
  });
}

async function askMode(prompt, defaultValue) {
  const choices = [
    ["1", "update", "Existing project, refresh PM Workflow files with backups"],
    ["2", "new", "New project, scaffold docs/prototype/framework files"],
  ];

  if (!prompt.input.isTTY || !prompt.output.isTTY) {
    return defaultValue;
  }

  return new Promise((resolve) => {
    let selected = Math.max(
      0,
      choices.findIndex(([, value]) => value === defaultValue)
    );
    let renderedLines = 0;
    const input = prompt.input;
    const output = prompt.output;
    const wasRaw = input.isRaw;

    const render = () => {
      if (renderedLines > 0) {
        readline.moveCursor(output, 0, -renderedLines);
        readline.clearScreenDown(output);
      }

      const lines = [`${symbol.pointer} Setup mode ${color.dim(`(${defaultValue})`)}`];
      for (const [, value, description] of choices) {
        const active = choices[selected][1] === value;
        const marker = value === defaultValue ? color.dim(" (default)") : "";
        const cursor = active ? symbol.arrow : " ";
        const label = active ? color.green(value.padEnd(6)) : value.padEnd(6);
        lines.push(`  ${cursor} ${label} ${color.dim(description)}${marker}`);
      }
      lines.push(color.dim("    Use ↑/↓ to move. Space to select."));

      output.write(`${lines.join("\n")}\n`);
      renderedLines = lines.length;
    };

    const cleanup = (clear) => {
      input.off("keypress", onKeypress);
      if (input.isTTY) input.setRawMode(wasRaw);
      if (clear && renderedLines > 0) {
        readline.moveCursor(output, 0, -renderedLines);
        readline.clearScreenDown(output);
      }
    };

    const finish = () => {
      const value = choices[selected][1];
      cleanup(true);
      printAnswer("Setup mode", value);
      resolve(value);
    };

    const onKeypress = (str, key = {}) => {
      if (key.ctrl && key.name === "c") {
        cleanup(false);
        output.write("\n");
        process.exit(130);
      }
      if (key.name === "up" || key.name === "k") {
        selected = (selected - 1 + choices.length) % choices.length;
        render();
        return;
      }
      if (key.name === "down" || key.name === "j") {
        selected = (selected + 1) % choices.length;
        render();
        return;
      }
      if (key.name === "space" || key.name === "return" || str === " ") {
        finish();
      }
    };

    readline.emitKeypressEvents(input);
    input.on("keypress", onKeypress);
    input.setRawMode(true);
    input.resume();
    render();
  });
}

async function askConfirm(prompt, label, defaultValue = true) {
  const suffix = defaultValue ? "Y/n" : "y/N";
  while (true) {
    const answer = (await prompt.ask(promptLine(label, suffix))).toLowerCase();
    if (!answer) {
      printAnswer(label, defaultValue ? "yes" : "no");
      return defaultValue;
    }
    if (["y", "yes", "是", "确认"].includes(answer)) {
      printAnswer(label, "yes");
      return true;
    }
    if (["n", "no", "否", "取消"].includes(answer)) {
      printAnswer(label, "no");
      return false;
    }
    console.log(color.dim("  Enter y or n."));
  }
}

async function runInteractiveInit(seedOptions = {}) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    fail("interactive mode requires a TTY. Use `pmflow init --ai auto --root . --name \"My Product\"` or `pmflow update --root .` in non-interactive environments.");
  }

  const prompt = createPrompt();
  try {
    printInteractiveHeader();

    const name = await askText(prompt, "What is your product named?", seedOptions.name || "My Product");
    const root = await askText(prompt, "Where should the project be created?", seedOptions.root || ".");
    const mode = await askMode(prompt, seedOptions.mode || defaultModeForRoot(path.resolve(root)));

    const ai = await askAi(prompt, seedOptions.ai || "auto");

    console.log("");
    console.log(color.bold("Summary"));
    console.log(`  Product:   ${color.green(name)}`);
    console.log(`  Directory: ${color.green(path.resolve(root))}`);
    console.log(`  Mode:      ${color.green(mode)}`);
    console.log(`  Workspace: ${color.green(ai)}`);
    console.log("");

    const confirmed = await askConfirm(prompt, mode === "update" ? "Update this workspace?" : "Create this workspace?", true);
    if (!confirmed) {
      console.log(color.dim("Canceled."));
      return;
    }

    console.log("");
    createStructure(root, name, normalizeAi(ai), normalizeMode(mode));
  } finally {
    prompt.close();
  }
}

function templatePath(name) {
  const centralPath = path.join(CODEX_TEMPLATES, name);
  if (exists(centralPath)) return centralPath;
  const rolePath = path.join(CODEX_ROLE_SKILLS, name);
  if (exists(rolePath)) return rolePath;
  fail(`template not found in .codex mirror: ${name}`);
}

function renderTemplate(name, productName) {
  return fs.readFileSync(templatePath(name), "utf8").replaceAll("{{PRODUCT_NAME}}", productName);
}

function writeIfMissing(target, content) {
  if (exists(target)) return false;
  ensureDir(path.dirname(target));
  fs.writeFileSync(target, content, "utf8");
  return true;
}

function timestampForBackup() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function backupExistingFile(root, target, backupRoot) {
  if (!exists(target) || !fs.statSync(target).isFile()) return "";
  const relative = relativeTo(root, target);
  const backupPath = path.join(backupRoot, relative);
  ensureDir(path.dirname(backupPath));
  fs.copyFileSync(target, backupPath);
  return relative;
}

function sameFileContent(a, b) {
  if (!exists(a) || !exists(b)) return false;
  const statA = fs.statSync(a);
  const statB = fs.statSync(b);
  if (!statA.isFile() || !statB.isFile()) return false;
  if (statA.size !== statB.size) return false;
  return fs.readFileSync(a).equals(fs.readFileSync(b));
}

function detectCli(root, requested) {
  if (requested !== "auto") return requested;
  if (exists(path.join(root, ".claude"))) return "claude";
  if (exists(path.join(root, ".codex")) || exists(path.join(root, ".agents"))) return "codex";
  return "codex";
}

function ignoredByDefault(itemPath) {
  const name = path.basename(itemPath);
  return name === "__pycache__" || name === ".DS_Store" || name.endsWith(".pyc");
}

function copyTreeIfMissing(src, dest, ignoreFn = ignoredByDefault) {
  if (exists(dest) || !exists(src) || ignoreFn(src)) return false;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDir(dest);
    for (const name of fs.readdirSync(src).sort()) {
      copyTreeIfMissing(path.join(src, name), path.join(dest, name), ignoreFn);
    }
  } else {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
  }
  return true;
}

function copyTreeForUpdate(src, dest, options) {
  const result = { created: [], updated: [], backedUp: [] };
  const ignoreFn = options.ignoreFn || ignoredByDefault;
  if (!exists(src) || ignoreFn(src)) return result;

  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDir(dest);
    for (const name of fs.readdirSync(src).sort()) {
      const child = copyTreeForUpdate(path.join(src, name), path.join(dest, name), options);
      result.created.push(...child.created);
      result.updated.push(...child.updated);
      result.backedUp.push(...child.backedUp);
    }
    return result;
  }

  ensureDir(path.dirname(dest));
  const reportRoot = options.reportRoot || path.dirname(dest);
  const reportPath = relativeTo(reportRoot, dest);
  if (!exists(dest)) {
    fs.copyFileSync(src, dest);
    result.created.push(reportPath);
    return result;
  }
  if (sameFileContent(src, dest)) return result;
  const backedUp = backupExistingFile(options.root, dest, options.backupRoot);
  if (backedUp) result.backedUp.push(backedUp);
  fs.copyFileSync(src, dest);
  result.updated.push(reportPath);
  return result;
}

function mergeCopyResults(...items) {
  const result = { created: [], updated: [], backedUp: [] };
  for (const item of items) {
    result.created.push(...(item.created || []));
    result.updated.push(...(item.updated || []));
    result.backedUp.push(...(item.backedUp || []));
  }
  result.created = [...new Set(result.created)].sort();
  result.updated = [...new Set(result.updated)].sort();
  result.backedUp = [...new Set(result.backedUp)].sort();
  return result;
}

function copyMirrorChildren(srcRoot, destRoot, options = {}) {
  const copied = [];
  if (!isDirectory(srcRoot)) return copied;
  ensureDir(destRoot);
  for (const name of fs.readdirSync(srcRoot).sort()) {
    if (options.skipNames && options.skipNames.has(name)) continue;
    const src = path.join(srcRoot, name);
    const dest = path.join(destRoot, name);
    if (copyTreeIfMissing(src, dest, options.ignoreFn || ignoredByDefault)) {
      copied.push(relativeTo(options.reportRoot || destRoot, dest));
    }
  }
  return copied;
}

function updateMirrorChildren(srcRoot, destRoot, options = {}) {
  let result = { created: [], updated: [], backedUp: [] };
  if (!isDirectory(srcRoot)) return result;
  ensureDir(destRoot);
  for (const name of fs.readdirSync(srcRoot).sort()) {
    if (options.skipNames && options.skipNames.has(name)) continue;
    const child = copyTreeForUpdate(path.join(srcRoot, name), path.join(destRoot, name), options);
    result = mergeCopyResults(result, child);
  }
  return result;
}

function copyCodexAgents(root) {
  const target = path.join(root, ".codex", "agents");
  const copied = [];
  ensureDir(target);
  const source = path.join(CODEX_MIRROR, "agents");
  if (!isDirectory(source)) return copied;
  for (const name of fs.readdirSync(source).sort()) {
    if (!name.endsWith(".toml")) continue;
    const src = path.join(source, name);
    const dest = path.join(target, name);
    if (!exists(dest)) {
      fs.copyFileSync(src, dest);
      copied.push(relativeTo(root, dest));
    }
  }
  return copied;
}

function updateCodexAgents(root, backupRoot) {
  const target = path.join(root, ".codex", "agents");
  const source = path.join(CODEX_MIRROR, "agents");
  const result = { created: [], updated: [], backedUp: [] };
  ensureDir(target);
  if (!isDirectory(source)) return result;
  for (const name of fs.readdirSync(source).sort()) {
    if (!name.endsWith(".toml")) continue;
    const child = copyTreeForUpdate(path.join(source, name), path.join(target, name), {
      root,
      backupRoot,
      reportRoot: root,
    });
    result.created.push(...child.created);
    result.updated.push(...child.updated);
    result.backedUp.push(...child.backedUp);
  }
  return mergeCopyResults(result);
}

function copyCodexSkill(root) {
  const target = path.join(root, ".agents", "skills", "pm-workflow");
  const ignore = (itemPath) => {
    if (ignoredByDefault(itemPath)) return true;
    const parent = path.basename(path.dirname(itemPath));
    return parent === "agents" && path.basename(itemPath).endsWith(".toml");
  };
  if (copyTreeIfMissing(CODEX_MIRROR, target, ignore)) {
    return [relativeTo(root, target)];
  }
  return [];
}

function updateCodexSkill(root, backupRoot) {
  const target = path.join(root, ".agents", "skills", "pm-workflow");
  const ignore = (itemPath) => {
    if (ignoredByDefault(itemPath)) return true;
    const parent = path.basename(path.dirname(itemPath));
    return parent === "agents" && path.basename(itemPath).endsWith(".toml");
  };
  return copyTreeForUpdate(CODEX_MIRROR, target, {
    root,
    backupRoot,
    reportRoot: root,
    ignoreFn: ignore,
  });
}

function copyRoleSkills(root) {
  const copied = [];
  const targetRoot = path.join(root, ".agents", "skills");
  ensureDir(targetRoot);
  if (!isDirectory(CODEX_ROLE_SKILLS)) return copied;
  for (const name of fs.readdirSync(CODEX_ROLE_SKILLS).sort()) {
    const src = path.join(CODEX_ROLE_SKILLS, name);
    if (!isDirectory(src)) continue;
    const dest = path.join(targetRoot, name);
    if (copyTreeIfMissing(src, dest)) {
      copied.push(relativeTo(root, dest));
    }
  }
  return copied;
}

function updateRoleSkills(root, backupRoot) {
  let result = { created: [], updated: [], backedUp: [] };
  const targetRoot = path.join(root, ".agents", "skills");
  ensureDir(targetRoot);
  if (!isDirectory(CODEX_ROLE_SKILLS)) return result;
  for (const name of fs.readdirSync(CODEX_ROLE_SKILLS).sort()) {
    const src = path.join(CODEX_ROLE_SKILLS, name);
    if (!isDirectory(src)) continue;
    const child = copyTreeForUpdate(src, path.join(targetRoot, name), {
      root,
      backupRoot,
      reportRoot: root,
    });
    result = mergeCopyResults(result, child);
  }
  return result;
}

function copyImpeccableSkill(root) {
  const src = path.join(CODEX_BUNDLED_SKILLS, "impeccable");
  const dest = path.join(root, ".agents", "skills", "impeccable");
  if (exists(dest)) return [];
  if (!exists(path.join(src, "SKILL.md"))) return [];
  copyTreeIfMissing(src, dest);
  return [relativeTo(root, dest)];
}

function updateImpeccableSkill(root, backupRoot) {
  const src = path.join(CODEX_BUNDLED_SKILLS, "impeccable");
  const dest = path.join(root, ".agents", "skills", "impeccable");
  if (!exists(path.join(src, "SKILL.md"))) return { created: [], updated: [], backedUp: [] };
  return copyTreeForUpdate(src, dest, {
    root,
    backupRoot,
    reportRoot: root,
  });
}

function removeCodexAgentManifest(skillDir) {
  const openaiManifest = path.join(skillDir, "agents", "openai.yaml");
  if (exists(openaiManifest)) fs.unlinkSync(openaiManifest);
  const agentsDir = path.join(skillDir, "agents");
  if (isDirectory(agentsDir) && fs.readdirSync(agentsDir).length === 0) {
    fs.rmdirSync(agentsDir);
  }
}

function writePluginManifest(root) {
  const manifest = `{
  "name": "pm-workflow",
  "version": "0.1.0",
  "description": "Codex-native AI product development studio framework.",
  "author": {
    "name": "[TODO: author name]",
    "email": "[TODO: author email]",
    "url": "[TODO: author url]"
  },
  "homepage": "[TODO: homepage]",
  "repository": "[TODO: repository]",
  "license": "[TODO: license]",
  "keywords": ["codex", "product-management", "workflow", "prototype", "planning"],
  "skills": "./.agents/skills/",
  "interface": {
    "displayName": "PM Workflow",
    "shortDescription": "AI 产品开发工作室：从模糊想法到可执行开发蓝图。",
    "longDescription": "A Codex-native product development studio with role agents, repo-scoped skills, staged documents, quality reviews, HTML prototypes, and delivery packaging.",
    "developerName": "[TODO: developer name]",
    "category": "Productivity",
    "capabilities": ["Interactive", "Write"],
    "defaultPrompt": [
      "我想做一个产品，帮我从需求开始梳理",
      "澄清需求",
      "开始分析需求",
      "审核一下当前阶段"
    ],
    "brandColor": "#2563EB"
  }
}
`;
  return writeIfMissing(path.join(root, ".codex-plugin", "plugin.json"), manifest);
}

function createCommonStructure(root, productName, includeAgentsMd) {
  const dirs = [
    path.join(root, "docs"),
    path.join(root, "prototype"),
    path.join(root, "prototype", "directions"),
    path.join(root, "prototype", "pages"),
    path.join(root, "prototype", "layout"),
    path.join(root, "prototype", "components"),
    path.join(root, "prototype", "assets"),
    path.join(root, "prototype", "review"),
    path.join(root, "prototype", "review", "screenshots"),
    path.join(root, "prototype", "review", "screenshots", "desktop"),
    path.join(root, "prototype", "review", "screenshots", "tablet"),
    path.join(root, "prototype", "review", "screenshots", "mobile"),
    path.join(root, "outputs", "dev-package"),
  ];
  dirs.forEach(ensureDir);

  const created = [];
  for (const [templateName, filename] of DOC_TEMPLATES) {
    const target = path.join(root, "docs", filename);
    if (writeIfMissing(target, renderTemplate(templateName, productName))) {
      created.push(relativeTo(root, target));
    }
  }

  const statePath = path.join(root, "docs", "workflow-state.json");
  if (writeIfMissing(statePath, renderTemplate("workflow-state.json", productName))) {
    created.push("docs/workflow-state.json");
  }

  if (includeAgentsMd) {
    const agentsPath = path.join(root, "AGENTS.md");
    if (writeIfMissing(agentsPath, renderTemplate("framework-AGENTS.md", productName))) {
      created.push("AGENTS.md");
    }
  }

  const readmePath = path.join(root, "README.md");
  if (writeIfMissing(readmePath, renderTemplate("framework-README.md", productName))) {
    created.push("README.md");
  }

  const prototypeReadmePath = path.join(root, "prototype", "README.md");
  if (writeIfMissing(prototypeReadmePath, renderTemplate("prototype-README.md", productName))) {
    created.push("prototype/README.md");
  }
  return created;
}

function createCodexStructure(root, productName) {
  [
    path.join(root, ".codex", "agents"),
    path.join(root, ".agents", "context"),
    path.join(root, ".agents", "skills"),
  ].forEach(ensureDir);

  const created = createCommonStructure(root, productName, true);
  const configToml = `[agents]
max_threads = 6
max_depth = 1
job_max_runtime_seconds = 1800
`;
  const configPath = path.join(root, ".codex", "config.toml");
  if (writeIfMissing(configPath, configToml)) created.push(".codex/config.toml");

  const copiedPlatform = copyMirrorChildren(CODEX_MIRROR, path.join(root, ".codex"), {
    skipNames: new Set(["agents"]),
    reportRoot: root,
  }).concat(copyCodexAgents(root));
  const copiedSkills = copyCodexSkill(root).concat(copyRoleSkills(root), copyImpeccableSkill(root));
  if (writePluginManifest(root)) created.push(".codex-plugin/plugin.json");
  return [created, copiedPlatform, copiedSkills];
}

function createClaudeStructure(root, productName) {
  const created = createCommonStructure(root, productName, false);
  const copiedClaude = copyMirrorChildren(CLAUDE_MIRROR, path.join(root, ".claude"), {
    reportRoot: root,
  });
  removeCodexAgentManifest(path.join(root, ".claude", "skills", "impeccable"));
  return [created, copiedClaude, []];
}

function updateCodexStructure(root, productName, backupRoot) {
  [
    path.join(root, ".codex", "agents"),
    path.join(root, ".agents", "context"),
    path.join(root, ".agents", "skills"),
  ].forEach(ensureDir);

  const created = createCommonStructure(root, productName, true);
  const configToml = `[agents]
max_threads = 6
max_depth = 1
job_max_runtime_seconds = 1800
`;
  const configPath = path.join(root, ".codex", "config.toml");
  if (writeIfMissing(configPath, configToml)) created.push(".codex/config.toml");

  const platform = mergeCopyResults(
    updateMirrorChildren(CODEX_MIRROR, path.join(root, ".codex"), {
      root,
      backupRoot,
      skipNames: new Set(["agents"]),
      reportRoot: root,
    }),
    updateCodexAgents(root, backupRoot)
  );
  const skills = mergeCopyResults(
    updateCodexSkill(root, backupRoot),
    updateRoleSkills(root, backupRoot),
    updateImpeccableSkill(root, backupRoot)
  );
  if (writePluginManifest(root)) created.push(".codex-plugin/plugin.json");
  return [created, platform, skills];
}

function updateClaudeStructure(root, productName, backupRoot) {
  const created = createCommonStructure(root, productName, false);
  const platform = updateMirrorChildren(CLAUDE_MIRROR, path.join(root, ".claude"), {
    root,
    backupRoot,
    reportRoot: root,
  });
  removeCodexAgentManifest(path.join(root, ".claude", "skills", "impeccable"));
  return [created, platform, { created: [], updated: [], backedUp: [] }];
}

function printUpdateSummary(label, result) {
  const created = result.created || [];
  const updated = result.updated || [];
  if (created.length) {
    console.log(`${label} files created:`);
    for (const item of created) console.log(`  + ${item}`);
  }
  if (updated.length) {
    console.log(`${label} files updated:`);
    for (const item of updated) console.log(`  ~ ${item}`);
  }
  if (!created.length && !updated.length) {
    console.log(`${label} files were already up to date.`);
  }
}

function createStructure(rootInput, productName, cli, mode = "new") {
  const root = path.resolve(rootInput);
  ensureDir(root);
  const hadPlatformMarker =
    exists(path.join(root, ".claude")) || exists(path.join(root, ".codex")) || exists(path.join(root, ".agents"));
  const selectedCli = detectCli(root, cli);
  const setupMode = normalizeMode(mode);
  const backupRoot = path.join(root, ".pmflow", "backups", timestampForBackup());

  let created;
  let copiedPlatform;
  let copiedSkills;
  let platformName;
  let directorySummary;
  let nextStep;

  if (selectedCli === "claude") {
    [created, copiedPlatform, copiedSkills] =
      setupMode === "update" ? updateClaudeStructure(root, productName, backupRoot) : createClaudeStructure(root, productName);
    platformName = "Claude Code";
    directorySummary = "docs/, prototype/, prototype/review/screenshots/, outputs/dev-package/, .claude/";
    nextStep = "Next step: start Claude Code in this directory, then describe your product idea or run `/pm-workflow:init`.";
  } else {
    [created, copiedPlatform, copiedSkills] =
      setupMode === "update" ? updateCodexStructure(root, productName, backupRoot) : createCodexStructure(root, productName);
    platformName = "Codex";
    directorySummary = "docs/, prototype/, prototype/review/screenshots/, outputs/dev-package/, .codex/, .agents/context/, .agents/skills/";
    nextStep = "Next step: start Codex in this directory, then describe your product idea or say `澄清需求`.";
  }

  console.log(setupMode === "update" ? `Project structure updated: ${root}` : `Project structure created: ${root}`);
  console.log(`Selected CLI structure: ${platformName}`);
  if (cli === "auto" && selectedCli === "codex" && !hadPlatformMarker) {
    console.log("Auto mode defaulted to Codex for an empty directory. Use `--ai claude` to create a Claude Code workspace.");
  }
  console.log(`Created or confirmed directories: ${directorySummary}`);
  if (setupMode === "update") {
    console.log("Update mode protects user work: docs/, prototype/, README.md, and root AGENTS.md are only created when missing.");
    console.log(`Changed framework files are backed up under: ${relativeTo(root, backupRoot)}/`);
  }

  if (created.length) {
    console.log("Template files created:");
    for (const item of created) console.log(`  + ${item}`);
  } else {
    console.log("Template files already existed; no template files overwritten.");
  }

  if (setupMode === "update") {
    printUpdateSummary(`${platformName} platform`, copiedPlatform);
  } else if (copiedPlatform.length) {
    console.log(`${platformName} platform files copied:`);
    for (const item of copiedPlatform) console.log(`  + ${item}`);
  } else {
    console.log(`${platformName} platform files already existed or source package was unavailable.`);
  }

  if (setupMode === "update") {
    printUpdateSummary("Repo-scoped skill", copiedSkills);
  } else if (copiedSkills.length) {
    console.log("Repo-scoped skills copied:");
    for (const item of copiedSkills) console.log(`  + ${item}`);
  } else {
    console.log("Repo-scoped skills already existed or not used by this CLI structure.");
  }

  const backedUp = [...new Set([...(copiedPlatform.backedUp || []), ...(copiedSkills.backedUp || [])])].sort();
  if (setupMode === "update" && backedUp.length) {
    console.log("Backed up existing files before refresh:");
    for (const item of backedUp.slice(0, 80)) console.log(`  ↳ ${item}`);
    if (backedUp.length > 80) console.log(`  ... ${backedUp.length - 80} more`);
  }

  console.log(nextStep);
}

async function runInit(argv, commandMode = "new") {
  const options = parseInitArgs(argv, commandMode);
  if (options.interactive || (argv.length === 0 && process.stdin.isTTY && process.stdout.isTTY)) {
    await runInteractiveInit(options);
    return;
  }
  createStructure(options.root, options.name, options.ai, options.mode);
}

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  if (!command || command === "-h" || command === "--help") {
    if (!command) {
      if (process.stdin.isTTY && process.stdout.isTTY) {
        await runInteractiveInit();
      } else {
        printHelp();
      }
      return;
    }
    printHelp();
    return;
  }
  if (command === "init") {
    await runInit(rest, "new");
    return;
  }
  if (command === "update") {
    await runInit(rest, "update");
    return;
  }
  fail(`unknown command "${command}".`);
}

main().catch((error) => {
  if (error && error.message) {
    console.error(`pmflow: ${error.message}`);
  } else {
    console.error(error);
  }
  process.exit(1);
});
