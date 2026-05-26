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
  analyze: ["docs/requirement-alignment.md", "docs/prd.md", "docs/handoff-prd.md"],
  architect: ["docs/architecture-options.md", "docs/tech-architecture.md", "docs/handoff-architecture.md"],
  design: [
    "docs/ui-design-brief.md",
    "docs/ui-information-architecture.md",
    "docs/ui-design-tokens.md",
    "docs/ui-build-tasks.md",
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
const PLAN_VAGUE_PATTERNS = ["类似上一步", "写相关测试", "处理边界情况", "待替换为真实"];
const PLAN_COARSE_PATTERNS = ["实现完整模块", "完成全部接口", "搭建整个项目", "创建所有测试", "接入完整业务流程"];
const B_END_SIGNAL_PATTERN = /后台|管理系统|运营台|SaaS|工作台|CRM|ERP|数据看板|审批|配置|权限|表格|列表|筛选|批量操作/i;
const VBEN_ARCO_REJECTION_PATTERN = /不采用\s*(Vben|Arco)|拒绝\s*(Vben|Arco)|用户明确拒绝\s*(Vben|Arco)|技术架构硬冲突|架构硬冲突|不属于\s*B\s*端/i;
const SYNC_RISK_PATTERN = /需求|范围|功能编号|M\d+-F\d+|接口|API|数据|数据库|字段|权限|部署|环境|技术约束|框架|版本|包管理器|脚手架|页面|路径|交互|状态|验收|测试策略|测试命令|开发执行|模块边界/i;
const EMOJI_PATTERN = /[\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1FAFF}\u{2700}-\u{27BF}\u{2600}-\u{26FF}]/u;
const FONT_SIZE_PATTERN = /font-size\s*:\s*([0-9]+(?:\.[0-9]+)?)px/gi;
const REQUIRED_CLARIFICATION_CRITERIA = {
  target_user: "产品给谁用",
  high_frequency_need: "用户真正的高频需求",
  scenario_problem: "解决什么场景问题",
  desired_outcome: "用户想达成什么结果以及结果落点",
  core_usage_flow: "用户从开始到结束的真实使用流程，以及最值得先做的一段",
  first_platform: "首版平台与使用设备",
  mvp_boundary: "最小可用 demo 必做和暂不做边界，包括能力合并、页面/模块减负和人工兜底原则",
  no_blocking_questions: "无阻塞开放问题，包括关键术语和概念没有歧义",
};

const STAGE_SYNC_DOCS = {
  analyze: ["docs/requirement-alignment.md", "docs/prd.md", "docs/handoff-prd.md"],
  architect: ["docs/architecture-options.md", "docs/tech-architecture.md", "docs/handoff-architecture.md"],
  design: [
    "docs/ui-design-brief.md",
    "docs/ui-information-architecture.md",
    "docs/ui-design-tokens.md",
    "docs/ui-build-tasks.md",
    "docs/ui-design.md",
    "docs/handoff-ui.md",
    "docs/prototype-review.md",
  ],
  plan: ["docs/dev-tasks.md"],
  deliver: [
    "docs/project-config.md",
    "docs/prd.md",
    "docs/tech-architecture.md",
    "docs/ui-design.md",
    "docs/dev-tasks.md",
    "docs/handoff-prd.md",
    "docs/handoff-architecture.md",
    "docs/handoff-ui.md",
    "AGENTS.md",
  ],
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
      "最值得先做的一段流程",
      "Agent 需要具备的关键能力",
      "结果落点",
      "首版平台与使用设备",
      "最小可用 demo 必做和暂不做边界",
      "页面/模块减负边界",
      "人工兜底边界",
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
    return new Set(text.match(/M\d+-F\d+/g) || []);
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
  return pending.length > 0;
}

function requirementAlignmentViolations(root) {
  const alignmentPath = path.join(root, "docs", "requirement-alignment.md");
  const text = readText(alignmentPath);
  const violations = [];
  if (!text.trim()) {
    violations.push("docs/requirement-alignment.md 缺失或为空");
    return violations;
  }
  const requiredMarkers = [
    "## 模块逐项对齐",
    "## 页面逐项对齐",
    "## 业务流程逐项对齐",
    "## 模糊点处理记录",
    "## PRD 写作准入",
    "## 用户确认原文",
  ];
  for (const marker of requiredMarkers) {
    if (!text.includes(marker)) violations.push(`docs/requirement-alignment.md 缺少 ${marker}`);
  }
  if (!/整体确认状态[：:]\s*已确认/.test(text)) {
    violations.push("docs/requirement-alignment.md 整体确认状态必须为已确认");
  }
  const gateSection = text.split("## PRD 写作准入")[1] || "";
  for (const gate of ["模块已逐项确认", "页面已逐项确认", "业务流程已逐项确认", "范围取舍已确认", "用户允许写 PRD"]) {
    const gateLine = gateSection.split(/\r?\n/).find((line) => line.includes(gate)) || "";
    if (!tableRowHasConfirmedStatus(gateLine)) {
      violations.push(`docs/requirement-alignment.md PRD 写作准入未确认：${gate}`);
    }
  }
  const activeRows = text
    .split(/\r?\n/)
    .filter((line) => /^\|\s*(M\d+|P\d+|F\d+|A\d+)/.test(line));
  for (const row of activeRows) {
    if (!tableRowHasConfirmedStatus(row)) {
      violations.push("docs/requirement-alignment.md 存在未确认的模块、页面、业务流程或模糊点");
      break;
    }
  }
  return violations;
}

function architectureOptionViolations(root) {
  const optionsPath = path.join(root, "docs", "architecture-options.md");
  const text = readText(optionsPath);
  const violations = [];
  if (!text.trim()) {
    violations.push("docs/architecture-options.md 缺失或为空");
    return violations;
  }
  const requiredMarkers = [
    "## 选型门禁",
    "## 候选方案总览",
    "## 五维度对比",
    "## 推荐方案说明",
    "## 用户最终选择",
    "## 用户确认原文",
  ];
  for (const marker of requiredMarkers) {
    if (!text.includes(marker)) violations.push(`docs/architecture-options.md 缺少 ${marker}`);
  }
  if (!/选型确认状态[：:]\s*已确认/.test(text)) {
    violations.push("docs/architecture-options.md 选型确认状态必须为已确认");
  }
  const optionRows = text
    .split(/\r?\n/)
    .filter((line) => /^\|\s*[A-Z]\s*\|/.test(line));
  if (optionRows.length < 2) {
    violations.push("docs/architecture-options.md 至少需要 2 个候选架构方案");
  }
  const hasFinalChoice = /选择方案[：:]\s*\S+/.test(text) && !/选择方案[：:]\s*(待确认|待补充)\s*$/m.test(text);
  if (!hasFinalChoice) {
    violations.push("docs/architecture-options.md 必须记录用户最终选择方案");
  }
  return violations;
}

function tableRowHasConfirmedStatus(row) {
  return row
    .split("|")
    .map((cell) => cell.trim().replace(/`/g, ""))
    .some((cell) => cell === "已确认");
}

function designUiRuleViolations(root) {
  const targets = [];
  const uiDoc = path.join(root, "docs", "ui-design.md");
  if (exists(uiDoc)) targets.push(uiDoc);
  const designDocPaths = [
    "docs/ui-design-brief.md",
    "docs/ui-information-architecture.md",
    "docs/ui-design-tokens.md",
    "docs/ui-build-tasks.md",
    "docs/ui-design.md",
    "docs/prototype-review.md",
  ];
  const designDocs = designDocPaths.map((name) => readText(path.join(root, name))).join("\n");
  const upstreamDocs = [
    "docs/prd.md",
    "docs/tech-architecture.md",
    "docs/ui-design-brief.md",
    "docs/ui-information-architecture.md",
    "docs/ui-design-tokens.md",
    "docs/ui-design.md",
  ].map((name) => readText(path.join(root, name))).join("\n");
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
  if (!/assets\/design-themes/i.test(designDocs) || !/DESIGN\.md/.test(designDocs)) {
    violations.push("UI 阶段必须记录已读取的主题库路径和具体 DESIGN.md，例如 assets/design-themes/<theme>/DESIGN.md");
  }
  if (!/(主题扫描命令|find\s+.*DESIGN\.md|已读取主题\s*`?DESIGN\.md`?)/i.test(designDocs)) {
    violations.push("UI 阶段必须记录主题库扫描命令或已读取主题 DESIGN.md 的证据");
  }
  const isBEnd = B_END_SIGNAL_PATTERN.test(upstreamDocs);
  const hasVbenArcoRejection = VBEN_ARCO_REJECTION_PATTERN.test(designDocs);
  if (isBEnd && !hasVbenArcoRejection) {
    if (!/assets\/design-themes\/vben\/DESIGN\.md|vben\/DESIGN\.md/i.test(designDocs)) {
      violations.push("B 端 UI 必须读取 assets/design-themes/vben/DESIGN.md 作为 Vben 主色来源，除非记录用户拒绝或技术硬冲突");
    }
    if (!/Vben\s*主色|主色.*Vben|仅用于主色|只.*主色/i.test(designDocs)) {
      violations.push("B 端 UI 必须声明 Vben 主题只用于主色/品牌色 token，不作为组件规范");
    }
    if (!/Arco Design Pro/i.test(designDocs) || !/Arco Design Vue/i.test(designDocs)) {
      violations.push("B 端 UI 必须明确 Arco Design Pro Vue / Arco Design Vue 作为组件框架，除非记录用户拒绝或技术硬冲突");
    }
    if (!/一比一引用|一比一复用|完全按照\s*Arco Design Pro|复用\s*Arco Design Pro/i.test(designDocs)) {
      violations.push("B 端 UI 必须声明组件、布局和交互一比一引用或复用 Arco Design Pro，不得从 Vben 主题仿造组件");
    }
    if (!/#4F63D7/.test(designDocs) || !/--primary-6|primary-6|themeColor/i.test(designDocs)) {
      violations.push("B 端 UI 必须记录 Vben 主色 #4F63D7 如何覆盖 Arco primary token 或 Pro themeColor");
    }
    if (!/组件级\s*Token|组件级 token|组件级-token|组件级.*应用表/i.test(designDocs)) {
      violations.push("B 端 UI 必须在 docs/ui-design-tokens.md / docs/ui-design.md 中产出组件级 token 应用表，不能只写使用 Arco");
    }
    const requiredComponentTokens = ["Button", "Input", "Table", "Form", "Modal", "Drawer", "Card", "Progress"];
    const missingComponentTokens = requiredComponentTokens.filter((name) => !new RegExp(name, "i").test(designDocs));
    if (missingComponentTokens.length) {
      violations.push(`B 端组件级 token 应用表缺少组件：${missingComponentTokens.join(", ")}`);
    }
    if (!/Progress/i.test(designDocs) || !/#4F63D7|--primary-6/.test(designDocs) || !/var\(--color-fill-3\)/.test(designDocs)) {
      violations.push("B 端 Progress 必须声明完成进度固定使用项目主色 #4F63D7/--primary-6，轨道使用 var(--color-fill-3)");
    }
    if (/Progress[\s\S]{0,120}(按百分比|根据进度).{0,20}(绿|橙|红|变色)/i.test(designDocs)) {
      violations.push("B 端 Progress 不得按进度百分比变化为绿/橙/红，只能使用项目主色表示完成进度");
    }
  }
  return violations;
}

function documentSyncViolations(root, stage) {
  const docs = STAGE_SYNC_DOCS[stage] || [];
  if (!docs.length) return [];

  const availableDocs = docs.filter((name) => readText(path.join(root, name)).trim());
  if (!availableDocs.length) return [];

  const textByDoc = new Map(availableDocs.map((name) => [name, readText(path.join(root, name))]));
  const combined = [...textByDoc.values()].join("\n\n");
  const violations = [];

  if (!/##\s*文档同步检查|#\s*文档同步检查/.test(combined)) {
    violations.push(`${stage} 阶段缺少“文档同步检查”固定区，无法确认上下游文档已同步。`);
    return violations;
  }

  const requiredColumns = ["变更项", "影响类型", "是否影响上游事实", "已检查文档", "已同步文档", "不需要同步原因", "责任阶段", "检查结论"];
  const missingColumns = requiredColumns.filter((column) => !combined.includes(column));
  if (missingColumns.length) {
    violations.push(`文档同步检查表缺少列：${missingColumns.join(", ")}`);
  }

  const syncRows = combined
    .split(/\r?\n/)
    .filter((line) => /^\|/.test(line) && !/^\|\s*-+/.test(line) && !requiredColumns.every((column) => line.includes(column)));
  const meaningfulRows = syncRows.filter((line) => {
    const normalized = line.replace(/\s+/g, "");
    return (
      /已同步|不需要同步|无影响|已检查|已确认|不涉及|一致/.test(normalized) &&
      !/待补充|TODO|\{\{/.test(normalized)
    );
  });
  if (!meaningfulRows.length) {
    violations.push("文档同步检查表未填写有效结论，不能全为空、待补充或不适用。");
  }

  if (SYNC_RISK_PATTERN.test(combined) && !meaningfulRows.some((line) => /已同步|不需要同步|无影响|不涉及/.test(line))) {
    violations.push("阶段文档包含需求/接口/页面/测试等高风险变更信号，但未记录已同步文档或不需要同步原因。");
  }

  if (stage === "plan") {
    const tasks = readText(path.join(root, "docs", "dev-tasks.md"));
    const requiredSources = ["docs/prd.md", "docs/tech-architecture.md", "docs/ui-design.md"];
    const missingSources = requiredSources.filter((source) => !tasks.includes(source));
    if (missingSources.length) {
      violations.push(`docs/dev-tasks.md 必须在文档同步检查或追溯区引用来源文档：${missingSources.join(", ")}`);
    }
    const baselineRisk = /环境|框架|版本|包管理器|脚手架|测试策略|测试命令|技术基线|模块边界|接口/.test(tasks);
    const architectureSyncRecorded = meaningfulRows.some(
      (line) => line.includes("docs/tech-architecture.md") && /已同步|不需要同步|无影响|不涉及|上游已明确/.test(line)
    );
    if (baselineRisk && !architectureSyncRecorded) {
      violations.push("plan 阶段涉及环境/框架/脚手架/测试策略/接口等技术基线变化，必须在有效同步行中记录 docs/tech-architecture.md 已同步或不需要同步原因。");
    }
  }

  if (stage === "design") {
    const designRisk = /页面|模块|交互|路径|字段|状态|响应式|验收/.test(combined);
    const prdSyncRecorded = meaningfulRows.some((line) => line.includes("docs/prd.md") && /已同步|不需要同步|无影响|不涉及/.test(line));
    const uiHandoffRecorded = meaningfulRows.some((line) => line.includes("docs/handoff-ui.md") && /已同步|不需要同步|无影响|不涉及/.test(line));
    if (designRisk && (!prdSyncRecorded || !uiHandoffRecorded)) {
      violations.push("design 阶段涉及页面/交互/字段/状态/验收等变更信号，必须在有效同步行中记录 docs/prd.md 和 docs/handoff-ui.md 的同步结论。");
    }
  }

  if (stage === "deliver") {
    const deliverText = combined;
    const requiredDeliverDocs = ["docs/prd.md", "docs/tech-architecture.md", "docs/ui-design.md", "docs/dev-tasks.md", "AGENTS.md"];
    const missingDeliverDocs = requiredDeliverDocs.filter((doc) => !deliverText.includes(doc));
    if (missingDeliverDocs.length) {
      violations.push(`deliver 阶段文档同步检查必须覆盖：${missingDeliverDocs.join(", ")}`);
    }
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
  const alignmentViolations = stage === "analyze" ? requirementAlignmentViolations(root) : [];
  const architectureViolations = stage === "architect" ? architectureOptionViolations(root) : [];
  const designUiViolations = stage === "design" ? designUiRuleViolations(root) : [];
  const planViolations = stage === "plan" ? planQualityViolations(root) : [];
  const syncViolations = documentSyncViolations(root, stage);

  if (initNotConfirmed) {
    if (clarification.status !== "user_confirmed") missing.push("docs/workflow-state.json: clarification.status=user_confirmed");
    if (state.user_confirmation_required ?? true) missing.push("docs/workflow-state.json: user_confirmation_required=false");
    if (initMissingCriteria.length) {
      missing.push(`docs/workflow-state.json: clarification.completion_criteria 缺失或未完成：${initMissingCriteria.join(", ")}`);
    }
  }
  if (initConceptsNotAligned) missing.push("docs/workflow-state.json: clarification.concepts_aligned=true");
  if (analyzeHasOpenQuestions) missing.push("docs/workflow-state.json: pending_user_questions 未清空");
  missing.push(...alignmentViolations);
  missing.push(...architectureViolations);
  missing.push(...designUiViolations);
  missing.push(...planViolations);
  missing.push(...syncViolations);

  let completeness = missing.length ? Math.max(1, Math.round((10 * presentCount) / Math.max(requiredCount, 1))) : 10;
  if (hasPlaceholder) completeness = Math.min(completeness, 6);
  if (initNotConfirmed || analyzeHasOpenQuestions || alignmentViolations.length || architectureViolations.length || designUiViolations.length || planViolations.length || syncViolations.length) completeness = Math.min(completeness, 5);

  let clarity = totalChars > 2500 && !hasPlaceholder ? 9 : totalChars > 800 ? 6 : 3;
  if (stage === "plan" && !planViolations.length && !hasPlaceholder) clarity = Math.max(clarity, 8);
  if (hasPlaceholder) clarity = Math.min(clarity, 5);
  if (analyzeHasOpenQuestions || alignmentViolations.length || architectureViolations.length || designUiViolations.length || planViolations.length || syncViolations.length) clarity = Math.min(clarity, 5);

  let [consistency, consistencyNote] = consistencyScore(root, stage);
  if (initNotConfirmed) {
    consistency = Math.min(consistency, 5);
    consistencyNote = "需求澄清尚未获得用户确认或关键术语概念未对齐，不能视为初始化完成。";
  }
  let executability = executabilityScore(contents, stage, hasPlaceholder);
  if (initNotConfirmed || analyzeHasOpenQuestions || alignmentViolations.length || architectureViolations.length || designUiViolations.length || planViolations.length || syncViolations.length) executability = Math.min(executability, 5);

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
  scores.requirement_alignment_violations = alignmentViolations;
  scores.architecture_option_violations = architectureViolations;
  scores.design_ui_violations = designUiViolations;
  scores.plan_violations = planViolations;
  scores.sync_violations = syncViolations;
  return scores;
}

function planQualityViolations(root) {
  const tasks = readText(path.join(root, "docs", "dev-tasks.md"));
  const prd = readText(path.join(root, "docs", "prd.md"));
  const violations = [];
  if (!tasks.trim()) return ["docs/dev-tasks.md 为空，无法审核开发任务规划。"];

  const requiredMarkers = [
    "实施计划",
    "执行规则",
    "任务拆分规则",
    "_需求:",
    "验收/测试",
    "技术基线",
    "语言",
    "框架",
    "版本",
    "包管理器",
    "脚手架",
    "安装命令",
    "启动命令",
    "测试命令",
  ];
  const missingMarkers = requiredMarkers.filter((marker) => !tasks.includes(marker));
  if (missingMarkers.length) {
    violations.push(`docs/dev-tasks.md 缺少 Kiro 风格实施计划结构：${missingMarkers.join(", ")}`);
  }

  const vagueHits = PLAN_VAGUE_PATTERNS.filter((pattern) => tasks.includes(pattern));
  if (vagueHits.length) {
    violations.push(`docs/dev-tasks.md 存在空泛或未替换语句：${vagueHits.join(", ")}`);
  }
  const coarseHits = PLAN_COARSE_PATTERNS.filter((pattern) => tasks.includes(pattern));
  if (coarseHits.length) {
    violations.push(`docs/dev-tasks.md 存在粒度过粗的任务表述：${coarseHits.join(", ")}`);
  }

  const taskSections = extractPlanTaskSections(tasks);
  if (!taskSections.length) {
    violations.push("docs/dev-tasks.md 未找到 `- [ ] 1. 任务名` 形式的编号任务。");
  }
  if (taskSections.length && !/(技术基线|语言|框架|版本|包管理器|脚手架)/.test(taskSections[0].body)) {
    violations.push("第一个编号任务必须锁定技术基线、版本、包管理器和脚手架方案。");
  }

  for (const section of taskSections) {
    const missing = [];
    const actionCount = (section.body.match(/^\s{2,}-\s+/gm) || []).length;
    if (actionCount < 3 || actionCount > 7) missing.push(`动作数量应为 3-6 条，当前 ${actionCount} 条`);
    if (!/_需求:\s*[^_]+_/.test(section.body)) missing.push("_需求: ..._ 追溯");
    if (!/(验收\/测试|验收|测试|验证|运行).+/.test(section.body)) missing.push("测试/验收动作");
    if (PLAN_COARSE_PATTERNS.some((pattern) => section.title.includes(pattern))) missing.push("任务标题粒度过粗");
    if (missing.length) violations.push(`任务 ${section.id} 缺少或不合格：${missing.join(", ")}`);
  }

  if (/requirements\.txt/.test(tasks) && /\buv\b/.test(tasks) && !/不生成\s+requirements\.txt|不得.{0,12}requirements\.txt|禁止.{0,12}requirements\.txt/.test(tasks)) {
    violations.push("docs/dev-tasks.md 同时出现 uv 和 requirements.txt，需确认依赖管理方式，不能混用默认方案。");
  }
  if (/Next\.?js|nextjs|next\.js/i.test(tasks) && /手工创建\s*`?package\.json`?|手写\s*`?package\.json`?/i.test(tasks)) {
    violations.push("Next.js 新项目不得绕过官方脚手架手工创建 package.json 和目录结构。");
  }

  const p0FeatureIds = extractP0FeatureIds(prd);
  const taskFeatureIds = extractIds(tasks, "feature");
  for (const featureId of p0FeatureIds) {
    if (!taskFeatureIds.has(featureId)) {
      violations.push(`P0 功能 ${featureId} 未映射到 docs/dev-tasks.md 的编号任务。`);
      continue;
    }
    if (!featureHasNumberedTaskAndValidation(tasks, featureId)) {
      violations.push(`P0 功能 ${featureId} 缺少编号任务或测试/验收动作追溯。`);
    }
  }

  return violations;
}

function extractPlanTaskSections(text) {
  const headingPattern = /^- \[[ xX]\]\s+(\d+)\.\s+(.+)$/gm;
  const matches = [...text.matchAll(headingPattern)];
  return matches.map((match, index) => {
    const next = matches[index + 1];
    return {
      id: match[1],
      title: match[2],
      body: text.slice(match.index, next ? next.index : text.length),
    };
  });
}

function extractP0FeatureIds(prd) {
  const ids = [];
  for (const line of prd.split(/\r?\n/)) {
    if (!/\bP0\b/.test(line)) continue;
    const matches = line.match(/\bM\d+-F\d+\b/g) || [];
    ids.push(...matches);
  }
  return uniqueSorted(ids);
}

function featureHasNumberedTaskAndValidation(tasks, featureId) {
  return extractPlanTaskSections(tasks).some((section) => section.body.includes(featureId) && /(验收\/测试|验收|测试|验证|运行)/.test(section.body));
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
    analyze: ["P0", "不在范围", "业务规则", "异常", "接口", "权限"],
    architect: ["接口", "数据库", "部署"],
    design: ["原型", "状态", "prototype", "directions", "impeccable", "screenshots"],
    plan: ["实施计划", "- [ ]", "_需求:", "验收/测试", "技术基线", "包管理器", "脚手架"],
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
  if (scores.analyze_has_open_questions) issues.push("- workflow-state 仍存在 pending_user_questions，不能触发 analyze 通过。");
  if ((scores.requirement_alignment_violations || []).length) issues.push(`- PRD 前需求对齐门禁未通过：${scores.requirement_alignment_violations.join("；")}`);
  if ((scores.architecture_option_violations || []).length) issues.push(`- 技术架构选型门禁未通过：${scores.architecture_option_violations.join("；")}`);
  if (scores.design_ui_violations.length) issues.push(`- UI 阶段门禁未通过：${scores.design_ui_violations.join("；")}`);
  if ((scores.plan_violations || []).length) issues.push(`- 开发任务规划不符合 Kiro 风格实施计划要求：${scores.plan_violations.join("；")}`);
  if ((scores.sync_violations || []).length) issues.push(`- 文档同步硬门禁未通过：${scores.sync_violations.join("；")}`);
  if (scores.consistency < 6) issues.push("- 跨阶段追溯不足，需求功能编号没有完整映射到当前阶段产物。");
  if (scores.executability < 6) issues.push("- 下游执行信号不足，缺少验收、验证、接口、状态或任务粒度信息。");
  if (roundNo >= 3 && scores.average < 8) issues.push("- 已达到第三轮未通过，建议停止推进并先修复关键问题。");
  return issues.length ? issues.join("\n") : "- 未发现阻塞性问题。";
}

function buildRework(stage, result, scores, roundNo) {
  if (result === "通过") return "本阶段已通过，无需返工。可根据用户偏好做非阻塞微调。";
  const suggestions = {
    init: "补齐 8 个澄清判断锚点、六个核心问题、高频真实需求、最值得先做的一段流程、Agent 能力、结果落点、最小 demo 边界和工作量粗估。",
    analyze: "先完成 docs/requirement-alignment.md：模块、页面、业务流程逐项和用户确认，模糊点全部有最终确认，用户明确同意写 PRD；再让用户回答 pending_user_questions，补齐新 PRD 的功能范围、核心业务流程、4.x 功能详细设计、数据模型、权限、非功能、Mx-Fx 功能编号和异常边界，并填写文档同步检查。",
    architect: "先补齐 docs/architecture-options.md：提供至少 2 个候选架构方案、五维度对比、推荐理由、用户最终选择和确认原文；再补齐需求到数据库、字段、接口、部署配置和技术风险的映射，并填写文档同步检查。",
    design: "补齐 docs/ui-design-brief.md、docs/ui-information-architecture.md、docs/ui-design-tokens.md、docs/ui-build-tasks.md、主题库扫描记录、每个方向读取的 DESIGN.md 路径、B 端 Vben 主色记录、项目主色色阶覆盖、组件级 token 应用表、Progress 固定主色规则、Arco Design Pro 组件一比一引用记录、2-3 个设计方向、每个方向的首页 demo、prototype/directions/index.html 预览索引、docs/prototype-review.md、Playwright 截图证据、Impeccable 审查记录、页面清单、需求到界面映射、完整原型路径和文档同步检查。",
    plan: "补齐 Kiro 风格实施计划结构、技术基线锁定、编号 checklist、3-6 条具体动作、测试/验收动作、_需求 追溯，并继续拆小粒度过粗的任务；同时填写文档同步检查并引用 PRD/架构/UI 来源文档。",
    deliver: "补齐缺失文档、审核报告、AGENTS.md、prototype 和全链路文档同步检查后重新打包。",
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
