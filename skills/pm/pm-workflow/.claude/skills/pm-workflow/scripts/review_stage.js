#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const SKILL_ROOT = path.resolve(__dirname, "..");
const TEMPLATE_DIR = path.join(SKILL_ROOT, "templates");
const ROLE_SKILLS_DIR = path.join(SKILL_ROOT, "role-skills");
const REPO_SKILLS_DIR = path.dirname(SKILL_ROOT);
const REVIEW_TEMPLATE = "quality-review/templates/review-stage.md";

const STAGE_ARTIFACTS = {
  init: ["docs/project-config.md"],
  analyze: ["docs/prd.md", "docs/handoff-prd.md"],
  architect: ["docs/tech-architecture.md", "docs/handoff-architecture.md"],
  design: [
    "docs/ui-design.md",
    "docs/handoff-ui.md",
    "docs/prototype-review.md",
    "prototype/directions/index.html",
    "prototype/index.html",
  ],
  plan: ["docs/dev-tasks.md"],
  deliver: [
    "docs/project-config.md",
    "docs/prd.md",
    "docs/tech-architecture.md",
    "docs/ui-design.md",
    "docs/dev-tasks.md",
    "AGENTS.md",
    "prototype/index.html",
  ],
};

const NEXT_STAGE = {
  init: "analyze",
  analyze: "architect",
  architect: "design",
  design: "plan",
  plan: "deliver",
  deliver: "status",
};

const DOWNSTREAM_ROLE = {
  init: "需求分析师",
  analyze: "技术架构师",
  architect: "界面设计师",
  design: "开发规划师",
  plan: "Codex 执行者",
  deliver: "最终接包人",
};

const PLACEHOLDER_PATTERNS = ["待补充", "TODO", "[TODO]", "{{"];
const EMOJI_PATTERN = /[\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1FAFF}\u{2700}-\u{27BF}\u{2600}-\u{26FF}]/u;
const FONT_SIZE_PATTERN = /font-size\s*:\s*([0-9]+(?:\.[0-9]+)?)px/gi;
const REQUIRED_CLARIFICATION_CRITERIA = {
  target_user: "产品给谁用",
  high_frequency_need: "用户真正的高频需求",
  scenario_problem: "解决什么场景问题",
  desired_outcome: "用户想达成什么结果",
  core_usage_flow: "用户从开始到结束的真实使用流程",
  first_platform: "首版平台与使用设备",
  mvp_boundary: "MVP 必做和暂不做边界，包括功能整合和页面/模块减负原则",
  no_blocking_questions: "无阻塞开放问题，包括关键术语和概念没有歧义",
};

function defaultClarification() {
  return {
    status: "not_started",
    summary: "",
    missing_context: [
      "目标用户",
      "高频真实需求",
      "核心场景",
      "用户想达成的结果",
      "真实使用流程",
      "首版平台与使用设备",
      "MVP 必做和暂不做边界",
      "页面/模块减负边界",
      "阻塞开放问题",
      "关键术语和概念歧义",
    ],
    materials_needed: [],
    terminology: [],
    concepts_aligned: false,
    completion_criteria: {
      target_user: false,
      high_frequency_need: false,
      scenario_problem: false,
      desired_outcome: false,
      core_usage_flow: false,
      first_platform: false,
      mvp_boundary: false,
      no_blocking_questions: false,
    },
    user_confirmed_at: null,
  };
}

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

function readText(target) {
  if (!exists(target) || isDirectory(target)) return "";
  return fs.readFileSync(target, "utf8");
}

function writeText(target, content) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, "utf8");
}

function relativeTo(root, target) {
  return path.relative(root, target).split(path.sep).join("/");
}

function templatePath(name) {
  const candidates = [
    path.join(TEMPLATE_DIR, name),
    path.join(ROLE_SKILLS_DIR, name),
    path.join(REPO_SKILLS_DIR, name),
  ];
  const found = candidates.find(exists);
  if (!found) {
    throw new Error(`Template not found: ${name}`);
  }
  return found;
}

function loadState(root) {
  const statePath = path.join(root, "docs", "workflow-state.json");
  if (!exists(statePath)) {
    return {
      project_name: path.basename(root),
      current_stage: "init",
      recommended_next: "clarify init",
      clarification: defaultClarification(),
      pending_user_questions: [],
      user_confirmation_required: true,
      artifacts: {},
      reviews: {},
      notes: [],
    };
  }
  try {
    return JSON.parse(fs.readFileSync(statePath, "utf8"));
  } catch (_error) {
    return {
      project_name: path.basename(root),
      current_stage: "init",
      recommended_next: "clarify init",
      clarification: defaultClarification(),
      pending_user_questions: [],
      user_confirmation_required: true,
      artifacts: {},
      reviews: {},
      notes: ["workflow-state.json was invalid JSON when review ran."],
    };
  }
}

function saveState(root, state) {
  writeText(path.join(root, "docs", "workflow-state.json"), `${JSON.stringify(state, null, 2)}\n`);
}

function extractIds(text, prefix) {
  if (prefix === "feature") {
    return new Set(text.match(/\bM\d+-F\d+\b/g) || []);
  }
  if (prefix === "task") {
    return new Set(text.match(/\bT\d{3,}\b/g) || []);
  }
  return new Set();
}

function clarificationConfirmed(state) {
  const clarification = state.clarification || {};
  return (
    clarification.status === "user_confirmed" &&
    !Boolean(state.user_confirmation_required ?? true) &&
    missingClarificationCriteria(state).length === 0 &&
    Boolean(clarification.concepts_aligned)
  );
}

function missingClarificationCriteria(state) {
  const criteria = ((state.clarification || {}).completion_criteria) || {};
  return Object.entries(REQUIRED_CLARIFICATION_CRITERIA)
    .filter(([key]) => !Boolean(criteria[key]))
    .map(([, label]) => label);
}

function hasBlockingAnalyzeQuestions(state, prd) {
  const pending = state.pending_user_questions || [];
  if (pending.length) return true;
  if (/当前状态[：:]\s*draft/i.test(prd)) return true;
  if (prd.includes("用户问题是否已回答：否") || prd.includes("用户问题是否已回答: 否")) return true;
  const unansweredBlockingRow = /\|[^|\n]+未回答[^|\n]*\|[^|\n]*是[^|\n]*\|/.test(prd);
  return prd.includes("## 待用户回答问题") && unansweredBlockingRow;
}

function designUiRuleViolations(root) {
  const targets = [];
  const uiDoc = path.join(root, "docs", "ui-design.md");
  if (exists(uiDoc)) targets.push(uiDoc);
  const prototypeDir = path.join(root, "prototype");
  if (exists(prototypeDir)) {
    for (const file of walkFiles(prototypeDir)) {
      if ([".html", ".css", ".js", ".md"].includes(path.extname(file).toLowerCase())) {
        targets.push(file);
      }
    }
  }

  const emojiHits = [];
  const smallFontHits = [];
  for (const target of targets) {
    const text = readText(target);
    if (EMOJI_PATTERN.test(text)) emojiHits.push(relativeTo(root, target));
    for (const line of text.split(/\r?\n/)) {
      if (smallFontLineViolation(line)) {
        smallFontHits.push(relativeTo(root, target));
        break;
      }
    }
  }

  const violations = [];
  if (emojiHits.length) {
    violations.push(`UI 可见内容疑似包含 emoji: ${uniqueSorted(emojiHits).slice(0, 8).join(", ")}`);
  }
  if (smallFontHits.length) {
    violations.push(`UI 主体字号疑似小于 16px: ${uniqueSorted(smallFontHits).slice(0, 8).join(", ")}`);
  }
  return violations;
}

function walkFiles(root) {
  const files = [];
  if (!exists(root)) return files;
  for (const name of fs.readdirSync(root)) {
    const current = path.join(root, name);
    const stat = fs.statSync(current);
    if (stat.isDirectory()) files.push(...walkFiles(current));
    else files.push(current);
  }
  return files;
}

function uniqueSorted(items) {
  return [...new Set(items)].sort();
}

function smallFontLineViolation(line) {
  if (["辅助说明", "不得低于", "不小于", "UI 硬规则"].some((marker) => line.includes(marker))) {
    return false;
  }
  const lowered = line.toLowerCase();
  FONT_SIZE_PATTERN.lastIndex = 0;
  let match;
  while ((match = FONT_SIZE_PATTERN.exec(line))) {
    const size = Number.parseFloat(match[1]);
    if (size >= 16) continue;
    if (size < 14) return true;
    const selector = cssSelectorBeforeFont(lowered, match.index);
    if (selector && ["small", "helper", "caption", "hint", "meta", "secondary", "note", "assist"].some((marker) => selector.includes(marker))) {
      continue;
    }
    if (
      selector &&
      [
        "body",
        "main",
        "p",
        "li",
        "button",
        "input",
        "textarea",
        "select",
        "label",
        "nav",
        ".btn",
        ".button",
        ".list",
        ".form",
        ".content",
        ".body",
      ].some((marker) => selector.includes(marker))
    ) {
      return true;
    }
    if (!selector && lowered.includes("style=")) return true;
  }
  return false;
}

function cssSelectorBeforeFont(loweredLine, fontStart) {
  const before = loweredLine.slice(0, fontStart);
  if (!before.includes("{")) return "";
  return before.split("}").pop().split("{")[0].trim();
}

function scoreStage(root, stage) {
  const state = loadState(root);
  const expected = STAGE_ARTIFACTS[stage];
  const present = expected.filter((item) => exists(path.join(root, item)));
  const missing = expected.filter((item) => !present.includes(item));
  let requiredCount = expected.length;
  let presentCount = present.length;

  if (stage === "design") {
    requiredCount += 2;
    const screenshotsDir = path.join(root, "prototype", "review", "screenshots");
    const screenshotFiles = exists(screenshotsDir)
      ? walkFiles(screenshotsDir).filter((file) => [".png", ".jpg", ".jpeg", ".webp"].includes(path.extname(file).toLowerCase()))
      : [];
    if (screenshotFiles.length) presentCount += 1;
    else missing.push("prototype/review/screenshots/");
    if (
      exists(path.join(root, ".agents", "skills", "impeccable", "SKILL.md")) ||
      exists(path.join(root, ".claude", "skills", "impeccable", "SKILL.md"))
    ) {
      presentCount += 1;
    } else {
      missing.push(".agents/skills/impeccable/SKILL.md or .claude/skills/impeccable/SKILL.md");
    }
  }

  const contents = expected.map((item) => readText(path.join(root, item))).join("\n\n");
  const hasPlaceholder = PLACEHOLDER_PATTERNS.some((pattern) => contents.includes(pattern));
  const totalChars = contents.trim().length;
  const clarification = state.clarification || {};
  const initConceptsNotAligned = stage === "init" && !Boolean(clarification.concepts_aligned);
  const initNotConfirmed = stage === "init" && !clarificationConfirmed(state);
  const initMissingCriteria = stage === "init" ? missingClarificationCriteria(state) : [];
  const analyzeHasOpenQuestions = stage === "analyze" && hasBlockingAnalyzeQuestions(state, readText(path.join(root, "docs", "prd.md")));
  const designUiViolations = stage === "design" ? designUiRuleViolations(root) : [];

  if (initNotConfirmed) {
    if (clarification.status !== "user_confirmed") missing.push("docs/workflow-state.json: clarification.status=user_confirmed");
    if (state.user_confirmation_required ?? true) missing.push("docs/workflow-state.json: user_confirmation_required=false");
    if (initMissingCriteria.length) {
      missing.push(`docs/workflow-state.json: clarification.completion_criteria 缺失或未完成：${initMissingCriteria.join(", ")}`);
    }
  }
  if (initConceptsNotAligned) missing.push("docs/workflow-state.json: clarification.concepts_aligned=true");
  if (analyzeHasOpenQuestions) missing.push("docs/prd.md: 待用户回答问题未清空或文档仍为 draft");
  missing.push(...designUiViolations);

  let completeness = missing.length ? Math.max(1, Math.round((10 * presentCount) / Math.max(requiredCount, 1))) : 10;
  if (hasPlaceholder) completeness = Math.min(completeness, 6);
  if (initNotConfirmed || analyzeHasOpenQuestions || designUiViolations.length) completeness = Math.min(completeness, 5);

  let clarity = totalChars > 2500 && !hasPlaceholder ? 9 : totalChars > 800 ? 6 : 3;
  if (hasPlaceholder) clarity = Math.min(clarity, 5);
  if (analyzeHasOpenQuestions || designUiViolations.length) clarity = Math.min(clarity, 5);

  let [consistency, consistencyNote] = consistencyScore(root, stage);
  if (initNotConfirmed) {
    consistency = Math.min(consistency, 5);
    consistencyNote = "需求澄清尚未获得用户确认或关键术语概念未对齐，不能视为初始化完成。";
  }
  let executability = executabilityScore(contents, stage, hasPlaceholder);
  if (initNotConfirmed || analyzeHasOpenQuestions || designUiViolations.length) executability = Math.min(executability, 5);

  const scores = {
    completeness,
    clarity,
    consistency,
    executability,
  };
  scores.average = Number(((completeness + clarity + consistency + executability) / 4).toFixed(1));
  scores.missing = missing;
  scores.has_placeholder = hasPlaceholder;
  scores.consistency_note = consistencyNote;
  scores.init_not_confirmed = initNotConfirmed;
  scores.init_concepts_not_aligned = initConceptsNotAligned;
  scores.analyze_has_open_questions = analyzeHasOpenQuestions;
  scores.design_ui_violations = designUiViolations;
  return scores;
}

function consistencyScore(root, stage) {
  const prd = readText(path.join(root, "docs", "prd.md"));
  const tech = readText(path.join(root, "docs", "tech-architecture.md"));
  const ui = readText(path.join(root, "docs", "ui-design.md"));
  const tasks = readText(path.join(root, "docs", "dev-tasks.md"));
  const prdIds = extractIds(prd, "feature");
  if (stage === "init") return [8, "初始化阶段主要检查项目配置自身一致性。"];
  if (!prdIds.size && stage !== "analyze") return [4, "上游需求功能编号缺失，无法做跨阶段对账。"];

  const targetText = {
    analyze: prd,
    architect: tech,
    design: ui,
    plan: tasks,
    deliver: [tech, ui, tasks].join("\n"),
  }[stage] || "";
  const targetIds = extractIds(targetText, "feature");
  if (stage === "analyze") {
    return targetIds.size ? [8, "需求文档已出现功能编号。"] : [4, "需求文档未出现 Mx-Fx 功能编号。"];
  }
  const missingIds = [...prdIds].filter((id) => !targetIds.has(id)).sort();
  if (missingIds.length) return [5, `以下需求功能编号未在本阶段产物中出现：${missingIds.join(", ")}`];
  return [9, "需求功能编号在本阶段产物中均有出现。"];
}

function executabilityScore(contents, stage, hasPlaceholder) {
  const requiredTerms = {
    init: ["下一步", "工作量", "核心场景"],
    analyze: ["验收", "P0", "不做"],
    architect: ["接口", "数据库", "部署"],
    design: ["原型", "状态", "prototype", "directions", "impeccable", "screenshots"],
    plan: ["T001", "验证方式", "前置依赖"],
    deliver: ["AGENTS", "dev-tasks", "prototype"],
  }[stage];
  const hits = requiredTerms.filter((term) => contents.includes(term)).length;
  let score = 4 + hits * 2;
  if (hasPlaceholder) score = Math.min(score, 6);
  return Math.max(1, Math.min(score, 10));
}

function resultFromScores(scores, override) {
  if (override === "pass" || override === "fail") return override === "pass" ? "通过" : "不通过";
  if (
    scores.average >= 8 &&
    ["completeness", "clarity", "consistency", "executability"].every((key) => scores[key] >= 6)
  ) {
    return "通过";
  }
  return "不通过";
}

function buildReport(root, stage, roundNo, result, scores) {
  let template = readText(templatePath(REVIEW_TEMPLATE));
  const missing = scores.missing;
  const placeholderNote = scores.has_placeholder ? "存在待补充占位。" : "未发现明显占位。";
  const simulationResult =
    result === "通过"
      ? "结论：下游角色可以基于当前产物继续工作；如用户有偏好调整，可作为非阻塞微调处理。"
      : "结论：若存在缺失或占位，下游执行会产生猜测，需要返工。";
  const simulation = [
    `以下游角色“${DOWNSTREAM_ROLE[stage]}”视角检查：`,
    "",
    `- 可以使用的内容：已找到 ${STAGE_ARTIFACTS[stage].length - missing.length} 个阶段产物。`,
    `- 主要阻碍：${missing.length ? `缺失 ${missing.join(", ")}` : placeholderNote}`,
    `- ${simulationResult}`,
  ].join("\n");

  const replacements = {
    "{{STAGE}}": stage,
    "{{ROUND}}": String(roundNo),
    "{{RESULT}}": result,
    "{{COMPLETENESS}}": String(scores.completeness),
    "{{COMPLETENESS_NOTE}}": missing.length ? `缺失：${missing.join(", ")}` : `阶段产物齐全。${scores.has_placeholder ? " 但存在占位。" : ""}`,
    "{{CLARITY}}": String(scores.clarity),
    "{{CLARITY_NOTE}}": "内容长度和占位情况的启发式评分。",
    "{{CONSISTENCY}}": String(scores.consistency),
    "{{CONSISTENCY_NOTE}}": scores.consistency_note,
    "{{EXECUTABILITY}}": String(scores.executability),
    "{{EXECUTABILITY_NOTE}}": "按该阶段是否包含验收、验证、接口、任务或原型等执行要素评分。",
    "{{AVERAGE}}": String(scores.average),
    "{{AVERAGE_NOTE}}": "平均分 >= 8 且单项 >= 6 时视为脚本草稿通过。",
    "{{SIMULATION}}": simulation,
    "{{RECONCILIATION}}": reconciliationTable(root, stage),
    "{{ISSUES}}": buildIssues(scores, roundNo),
    "{{REWORK}}": buildRework(stage, result, scores, roundNo),
    "{{NEXT_STEP}}": buildNextStep(stage, result, roundNo),
  };
  for (const [key, value] of Object.entries(replacements)) {
    template = template.split(key).join(value);
  }
  return template;
}

function reconciliationTable(root, stage) {
  const prdIds = extractIds(readText(path.join(root, "docs", "prd.md")), "feature");
  if (!prdIds.size) return "| 对账项 | 状态 |\n|---|---|\n| 需求功能编号 | 未找到 Mx-Fx 编号 |";

  const targetPaths = {
    architect: ["docs/tech-architecture.md"],
    design: ["docs/ui-design.md"],
    plan: ["docs/dev-tasks.md"],
    deliver: ["docs/tech-architecture.md", "docs/ui-design.md", "docs/dev-tasks.md"],
  }[stage] || ["docs/prd.md"];
  const targetText = targetPaths.map((item) => readText(path.join(root, item))).join("\n");
  const targetIds = extractIds(targetText, "feature");
  const lines = ["| 需求功能编号 | 本阶段覆盖 |", "|---|---|"];
  for (const featureId of [...prdIds].sort()) {
    lines.push(`| ${featureId} | ${targetIds.has(featureId) ? "是" : "否"} |`);
  }
  return lines.join("\n");
}

function buildIssues(scores, roundNo) {
  const issues = [];
  if (scores.missing.length) issues.push(`- 缺失阶段产物：${scores.missing.join(", ")}`);
  if (scores.has_placeholder) issues.push("- 文档仍包含“待补充”或 TODO，占位内容需要替换为真实决策。");
  if (scores.init_not_confirmed) issues.push("- 需求澄清尚未获得用户确认，`init` 不能判定完成。");
  if (scores.init_concepts_not_aligned) issues.push("- 关键术语和概念尚未对齐，容易导致 AI 与用户说的是不同东西。");
  if (scores.analyze_has_open_questions) issues.push("- PRD 仍是草稿或存在待用户回答问题，不能触发 analyze 通过。");
  if (scores.design_ui_violations.length) issues.push("- UI 原型存在 emoji 或主体字号小于 16px 的问题，需要改为图标资源并提高默认字号。");
  if (scores.consistency < 6) issues.push("- 跨阶段追溯不足，需求功能编号没有完整映射到当前阶段产物。");
  if (scores.executability < 6) issues.push("- 下游执行信号不足，缺少验收、验证、接口、状态或任务粒度信息。");
  if (roundNo >= 3 && scores.average < 8) issues.push("- 已达到第三轮未通过，建议停止推进并先修复关键问题。");
  return issues.length ? issues.join("\n") : "- 未发现阻塞性问题。";
}

function buildRework(stage, result, scores, roundNo) {
  if (result === "通过") return "本阶段已通过，无需返工。可根据用户偏好做非阻塞微调。";
  const suggestions = {
    init: "补齐 8 项澄清完成标准、六个核心问题、高频真实需求、真实使用流程、参考产品、功能整合边界和工作量粗估。",
    analyze: "先让用户回答 PRD 草稿中的待确认问题，再补齐 P0/P1/P2、Mx-Fx 功能编号、业务规则、不做清单和验收标准，并把文档状态改为 final。",
    architect: "补齐需求到数据库、字段、接口、部署配置和技术风险的映射。",
    design: "补齐 2-3 个设计方向、每个方向的首页 demo、prototype/directions/index.html 预览索引、docs/prototype-review.md、Playwright 截图证据、Impeccable 审查记录、页面清单、需求到界面映射和完整原型路径。",
    plan: "补齐 Txxx 任务、前置依赖、涉及文件、执行指令、验证方式和边缘情况。",
    deliver: "补齐缺失文档、审核报告、AGENTS.md 和 prototype 后重新打包。",
  };
  const extra = roundNo >= 3 && scores.average < 8 ? "\n\n第三轮仍未通过：请向用户报告继续推进的具体风险。" : "";
  return suggestions[stage] + extra;
}

function buildNextStep(stage, result, roundNo) {
  const nextStage = NEXT_STAGE[stage];
  if (result === "通过") return `建议进入 \`${nextStage}\`，或根据用户反馈继续微调本阶段。`;
  if (roundNo >= 3) return "建议先返工，不要继续扩大后续阶段的不确定性；如用户坚持推进，需要明确记录风险。";
  return `建议按返工建议修复后重新运行 \`$pm-workflow review ${stage}\`；也可由用户决定带风险进入 \`${nextStage}\`。`;
}

function updateReviewState(root, stage, roundNo, result, reportPath) {
  const state = loadState(root);
  state.artifacts = state.artifacts || {};
  state.reviews = state.reviews || {};
  state.clarification = state.clarification || defaultClarification();
  state.pending_user_questions = state.pending_user_questions || [];
  state.user_confirmation_required = state.user_confirmation_required ?? true;
  state.current_stage = stage;
  state.recommended_next = result === "通过" ? NEXT_STAGE[stage] : `review ${stage}`;
  state.artifacts[stage] = STAGE_ARTIFACTS[stage];
  state.reviews[stage] = {
    round: roundNo,
    last_result: result,
    report: relativeTo(root, reportPath),
    updated_at: new Date().toISOString(),
  };
  saveState(root, state);
}

function review(rootInput, stage, override) {
  const root = path.resolve(rootInput);
  if (!Object.prototype.hasOwnProperty.call(STAGE_ARTIFACTS, stage)) {
    throw new Error(`Unknown stage: ${stage}. Available: ${Object.keys(STAGE_ARTIFACTS).join(", ")}`);
  }
  const state = loadState(root);
  const previous = (((state.reviews || {})[stage] || {}).round) || 0;
  const roundNo = Math.min(previous + 1, 3);
  const scores = scoreStage(root, stage);
  const result = resultFromScores(scores, override);
  const report = buildReport(root, stage, roundNo, result, scores);
  const reportPath = path.join(root, "docs", `review-${stage}.md`);
  writeText(reportPath, report);
  updateReviewState(root, stage, roundNo, result, reportPath);
  return reportPath;
}

function parseArgs(argv) {
  const options = { root: ".", stage: "", result: "auto" };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--root") {
      options.root = argv[++index];
    } else if (arg.startsWith("--root=")) {
      options.root = arg.slice("--root=".length);
    } else if (arg === "--stage") {
      options.stage = argv[++index];
    } else if (arg.startsWith("--stage=")) {
      options.stage = arg.slice("--stage=".length);
    } else if (arg === "--result") {
      options.result = argv[++index];
    } else if (arg.startsWith("--result=")) {
      options.result = arg.slice("--result=".length);
    } else if (arg === "-h" || arg === "--help") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!options.stage) throw new Error("--stage is required.");
  if (!Object.keys(STAGE_ARTIFACTS).includes(options.stage)) throw new Error(`--stage must be one of: ${Object.keys(STAGE_ARTIFACTS).join(", ")}`);
  if (!["auto", "pass", "fail"].includes(options.result)) throw new Error("--result must be auto, pass, or fail.");
  return options;
}

function printHelp() {
  console.log(`Generate a PM Workflow stage review draft.

Usage:
  node review_stage.js --root . --stage <init|analyze|architect|design|plan|deliver> [--result auto|pass|fail]`);
}

function main() {
  try {
    const args = parseArgs(process.argv.slice(2));
    const reportPath = review(args.root, args.stage, args.result);
    console.log(`Review report generated: ${reportPath}`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

main();
