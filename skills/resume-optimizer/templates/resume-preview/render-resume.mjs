const DEFAULT_SOURCE = "./resume-content.md";

const sourceInput = document.querySelector("#resume-source");
const resumeRoot = document.querySelector("#resume-root");
const statusNode = document.querySelector("#render-status");
const reloadButton = document.querySelector("#reload-source");
const exportButton = document.querySelector("#export-pdf");
const fallbackNode = document.querySelector("#fallback-resume-markdown");

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function inlineMarkdown(value = "") {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a class="inline-link" href="$2">$1</a>');
}

function parseKeyValue(line) {
  const clean = line.replace(/^-\s*/, "");
  const index = clean.indexOf("：");
  if (index === -1) return ["", clean.trim()];
  return [clean.slice(0, index).trim(), clean.slice(index + 1).trim()];
}

function parseHeading(line) {
  const match = /^(#{1,3})\s+(.+)$/.exec(line);
  if (!match) return null;
  return { level: match[1].length, text: match[2].trim() };
}

function createEmptyResume() {
  return {
    basic: {},
    intro: [],
    stack: [],
    projects: [],
    experience: [],
    proofs: [],
  };
}

function currentSectionFromHeading(text) {
  if (text === "基本信息") return "basic";
  if (text === "简介") return "intro";
  if (text === "技术栈") return "stack";
  if (text === "核心项目") return "projects";
  if (text === "工作经历") return "experience";
  if (text === "补充") return "proofs";
  return "";
}

function splitTitleParts(value) {
  return value.split("|").map((item) => item.trim()).filter(Boolean);
}

function parseResumeMarkdown(markdown) {
  const resume = createEmptyResume();
  const lines = markdown.split(/\r?\n/);
  let section = "";
  let currentStack = null;
  let currentProject = null;
  let currentExperience = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith(">") || line.startsWith("# 简历内容")) continue;

    const heading = parseHeading(line);
    if (heading?.level === 2) {
      section = currentSectionFromHeading(heading.text);
      currentStack = null;
      currentProject = null;
      currentExperience = null;
      continue;
    }

    if (heading?.level === 3) {
      if (section === "stack") {
        currentStack = { title: heading.text, body: [] };
        resume.stack.push(currentStack);
      } else if (section === "projects") {
        currentProject = { title: heading.text, tags: "", background: "", goal: "", process: [], result: "" };
        resume.projects.push(currentProject);
      } else if (section === "experience") {
        const [period = "", company = "", role = ""] = splitTitleParts(heading.text);
        currentExperience = { period, company, role, summary: [], bullets: [] };
        resume.experience.push(currentExperience);
      }
      continue;
    }

    if (section === "basic" && line.startsWith("- ")) {
      const [key, value] = parseKeyValue(line);
      if (key) resume.basic[key] = value;
      continue;
    }

    if (section === "intro") {
      resume.intro.push(line);
      continue;
    }

    if (section === "stack" && currentStack) {
      currentStack.body.push(line.replace(/^-\s*/, ""));
      continue;
    }

    if (section === "projects" && currentProject && line.startsWith("- ")) {
      const [key, value] = parseKeyValue(line);
      if (key === "技术栈") currentProject.tags = value;
      else if (key === "背景") currentProject.background = value;
      else if (key === "目标") currentProject.goal = value;
      else if (key === "过程" || key === "行动") currentProject.process.push(value);
      else if (key === "结果") currentProject.result = value;
      else currentProject.process.push(line.replace(/^-\s*/, ""));
      continue;
    }

    if (section === "experience" && currentExperience) {
      if (line.startsWith("- ")) currentExperience.bullets.push(line.replace(/^-\s*/, ""));
      else currentExperience.summary.push(line);
      continue;
    }

    if (section === "proofs" && line.startsWith("- ")) {
      const [, value] = parseKeyValue(line);
      resume.proofs.push(value);
    }
  }

  return resume;
}

function renderHero(basic) {
  const name = basic["姓名"] || "候选人姓名";
  const title = basic["标题"] || "目标岗位";
  const meta = [
    basic["意向城市"] && `意向城市：${basic["意向城市"]}`,
    basic["当前状态"] && `当前状态：${basic["当前状态"]}`,
    basic["工作年限"],
    basic["邮箱"],
    basic["电话"],
  ].filter(Boolean);
  const initials = basic["头像文字"] || name.slice(0, 2).toUpperCase();

  return `
    <header class="hero">
      <div class="hero-grid">
        <div class="hero-main">
          <p class="hero-name">${escapeHtml(name)}</p>
          <h1>${escapeHtml(title)}</h1>
          <ul class="hero-meta">
            ${meta.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </div>
        <aside class="hero-photo" aria-label="头像占位区域">
          <div class="photo-frame photo-placeholder">${escapeHtml(initials)}</div>
        </aside>
      </div>
    </header>
  `;
}

function renderIntro(intro) {
  const introItems = intro
    .map((item) => {
      const [label, value] = parseKeyValue(item);
      return label ? { label, value } : null;
    })
    .filter(Boolean);

  if (introItems.length) {
    return `
      <section class="section intro">
        <div class="section-label">简介</div>
        <div class="section-content intro-list">
          ${introItems.map((item) => `
            <p class="lede">${inlineMarkdown(item.value)}</p>
          `).join("")}
        </div>
      </section>
    `;
  }

  return `
    <section class="section intro">
      <div class="section-label">简介</div>
      <div class="section-content">
        ${intro.map((item) => `<p class="lede">${inlineMarkdown(item)}</p>`).join("")}
      </div>
    </section>
  `;
}

function renderStack(stack) {
  return `
    <section class="section stack-section">
      <div class="section-label">技术栈</div>
      <div class="section-content split-three stack-groups">
        ${stack.map((item) => `
          <article>
            <h2>${escapeHtml(item.title)}</h2>
            <p>${inlineMarkdown(item.body.join(" "))}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderProjectProcess(process) {
  if (!process.length) return "";
  if (process.length === 1) return `<p><strong>过程：</strong>${inlineMarkdown(process[0])}</p>`;
  return `
    <div class="project-process">
      <p><strong>过程：</strong></p>
      <ul>
        ${process.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderProjects(projects) {
  return `
    <section class="section projects">
      <div class="section-label">核心项目</div>
      <div class="section-content flow-list">
        ${projects.map((project) => `
          <article class="entry project-entry">
            <div class="entry-body">
              <h2>${escapeHtml(project.title)}</h2>
              ${project.tags ? `<p class="project-tags">技术栈：${escapeHtml(project.tags)}</p>` : ""}
              ${project.background ? `<p class="project-summary"><strong>背景：</strong>${inlineMarkdown(project.background)}</p>` : ""}
              ${project.goal ? `<p><strong>目标：</strong>${inlineMarkdown(project.goal)}</p>` : ""}
              ${renderProjectProcess(project.process)}
              ${project.result ? `<p><strong>结果：</strong>${inlineMarkdown(project.result)}</p>` : ""}
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderExperience(experience) {
  return `
    <section class="section experience">
      <div class="section-label">工作经历</div>
      <div class="section-content flow-list">
        ${experience.map((item) => `
          <article class="entry experience-entry">
            <div class="entry-body">
              <h2>${escapeHtml([item.company, item.period, item.role].filter(Boolean).join(" | "))}</h2>
              ${item.summary.map((line) => `<p>${inlineMarkdown(line)}</p>`).join("")}
              ${item.bullets.length ? `<ul>${item.bullets.map((line) => `<li>${inlineMarkdown(line)}</li>`).join("")}</ul>` : ""}
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderProofs(proofs) {
  const values = proofs.flatMap((item) => item.split("/").map((part) => part.trim()).filter(Boolean));
  return `
    <section class="section detail-grid">
      <div class="section-label">补充</div>
      <div class="section-content detail-columns">
        <p class="proof-line">
          <strong>作品与证明材料：</strong>
          ${values.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </p>
      </div>
    </section>
  `;
}

function renderResume(markdown) {
  const resume = parseResumeMarkdown(markdown);
  document.title = `${resume.basic["姓名"] || "Mock Candidate"} | Resume Preview`;
  resumeRoot.innerHTML = [
    renderHero(resume.basic),
    "<main>",
    renderIntro(resume.intro),
    renderStack(resume.stack),
    renderProjects(resume.projects),
    renderExperience(resume.experience),
    renderProofs(resume.proofs),
    "</main>",
  ].join("");
}

async function loadMarkdown() {
  const sourceUrl = new URLSearchParams(window.location.search).get("source") || DEFAULT_SOURCE;
  try {
    const response = await fetch(sourceUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    statusNode.textContent = `已加载 ${sourceUrl}`;
    return await response.text();
  } catch (error) {
    statusNode.textContent = `无法通过 fetch 加载 Markdown，已使用内置 Mock 内容。建议用本地服务打开：python3 -m http.server。`;
    return fallbackNode.textContent.trim();
  }
}

function bindLivePreview(markdown) {
  sourceInput.value = markdown;
  renderResume(markdown);
  sourceInput.addEventListener("input", () => renderResume(sourceInput.value));
}

reloadButton.addEventListener("click", async () => {
  bindLivePreview(await loadMarkdown());
});

exportButton.addEventListener("click", () => {
  window.print();
});

bindLivePreview(await loadMarkdown());
